from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models.payment import Payment
from backend.models.course import Course, Enrollment
from backend.models.notification import Notification
from backend.utils.decorators import current_user_required
from backend.services.payment_service import create_razorpay_order, verify_razorpay_payment
from backend.services.email_service import send_course_enrollment_email

payment_bp = Blueprint('payment', __name__)

@payment_bp.route('/create-order', methods=['POST'])
@current_user_required
def create_order(current_user_id):
    data = request.get_json()
    course_id = data.get('course_id')
    
    if not course_id:
        return jsonify({"message": "course_id required"}), 400

    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404

    # Create mock razorpay order
    order = create_razorpay_order(course.price)
    
    new_payment = Payment(
        user_id=current_user_id,
        amount=course.price,
        razorpay_order_id=order['id'],
        status='created'
    )
    db.session.add(new_payment)
    db.session.commit()

    return jsonify({
        "message": "Order created",
        "order_id": order['id'],
        "amount": order['amount'],
        "currency": order['currency']
    }), 201

@payment_bp.route('/verify', methods=['POST'])
@current_user_required
def verify_payment(current_user_id):
    data = request.get_json()
    course_id = data.get('course_id')
    payment_id = data.get('razorpay_payment_id')
    order_id = data.get('razorpay_order_id')
    signature = data.get('razorpay_signature')
    
    if not all([course_id, payment_id, order_id, signature]):
        return jsonify({"message": "Missing required fields"}), 400

    is_valid = verify_razorpay_payment(payment_id, order_id, signature)
    if not is_valid:
        return jsonify({"message": "Payment verification failed"}), 400

    payment = Payment.query.filter_by(razorpay_order_id=order_id).first()
    if payment:
        payment.status = 'paid'
        payment.razorpay_payment_id = payment_id

    # Create enrollment
    course = Course.query.get(course_id)
    existing_enrollment = Enrollment.query.filter_by(user_id=current_user_id, course_id=course_id).first()
    
    if not existing_enrollment:
        new_enrollment = Enrollment(user_id=current_user_id, course_id=course_id)
        db.session.add(new_enrollment)
        
        # Add Notification
        notification = Notification(
            user_id=current_user_id,
            title="Course unlocked",
            message=f"Payment successful. You have officially enrolled in {course.title}."
        )
        db.session.add(notification)
        
        db.session.commit()
        
        from backend.models.user import User
        user = User.query.get(current_user_id)
        if user:
            send_course_enrollment_email(user.email, course.title)

    return jsonify({"message": "Payment verified and course unlocked successfully"}), 200

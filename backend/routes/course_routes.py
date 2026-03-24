from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models.course import Course, Lecture, Enrollment
from backend.models.notification import Notification
from backend.utils.decorators import current_user_required
from backend.services.email_service import send_course_enrollment_email

course_bp = Blueprint('course', __name__)

@course_bp.route('/create', methods=['POST'])
@current_user_required
def create_course(current_user_id):
    data = request.get_json()
    if not data or not data.get('title') or not data.get('description'):
        return jsonify({"message": "Title and description required"}), 400

    new_course = Course(
        title=data['title'],
        description=data['description'],
        price=data.get('price', 0.0),
        instructor_id=current_user_id
    )
    db.session.add(new_course)
    db.session.commit()

    return jsonify({"message": "Course created successfully", "course_id": new_course.id}), 201

@course_bp.route('/list', methods=['GET'])
def list_courses():
    courses = Course.query.all()
    result = []
    for c in courses:
        result.append({
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "price": c.price,
            "instructor_id": c.instructor_id
        })
    return jsonify(result), 200

@course_bp.route('/enroll', methods=['POST'])
@current_user_required
def enroll(current_user_id):
    data = request.get_json()
    course_id = data.get('course_id')
    if not course_id:
        return jsonify({"message": "course_id required"}), 400

    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404

    # Check existing enrollment
    existing = Enrollment.query.filter_by(user_id=current_user_id, course_id=course_id).first()
    if existing:
        return jsonify({"message": "Already enrolled"}), 400

    new_enrollment = Enrollment(user_id=current_user_id, course_id=course_id)
    db.session.add(new_enrollment)

    # Add notification
    notification = Notification(
        user_id=current_user_id,
        title="Course unlocked",
        message=f"You have successfully enrolled in {course.title}."
    )
    db.session.add(notification)
    
    db.session.commit()

    # Send email
    from backend.models.user import User
    user = User.query.get(current_user_id)
    if user:
        send_course_enrollment_email(user.email, course.title)

    return jsonify({"message": "Enrolled successfully"}), 201

@course_bp.route('/content/<int:course_id>', methods=['GET'])
@current_user_required
def get_content(current_user_id, course_id):
    enrollment = Enrollment.query.filter_by(user_id=current_user_id, course_id=course_id).first()
    if not enrollment:
        return jsonify({"message": "You must enroll to view content"}), 403

    lectures = Lecture.query.filter_by(course_id=course_id).order_by(Lecture.order).all()
    result = [{"id": l.id, "title": l.title, "video_url": l.video_url, "order": l.order} for l in lectures]
    
    return jsonify({"lectures": result}), 200

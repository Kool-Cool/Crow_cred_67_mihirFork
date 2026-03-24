from flask import Blueprint, jsonify, request
from backend.app import db
from backend.models.notification import Notification
from backend.utils.decorators import current_user_required

notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/list', methods=['GET'])
@current_user_required
def list_notifications(current_user_id):
    notifications = Notification.query.filter_by(user_id=current_user_id).order_by(Notification.created_at.desc()).all()
    result = [{
        "id": n.id,
        "title": n.title,
        "message": n.message,
        "is_read": n.is_read,
        "created_at": n.created_at.isoformat()
    } for n in notifications]
    
    return jsonify(result), 200

@notification_bp.route('/mark-read/<int:notification_id>', methods=['POST'])
@current_user_required
def mark_read(current_user_id, notification_id):
    notification = Notification.query.filter_by(id=notification_id, user_id=current_user_id).first()
    if notification:
        notification.is_read = True
        db.session.commit()
        return jsonify({"message": "Notification marked as read"}), 200
    return jsonify({"message": "Notification not found"}), 404

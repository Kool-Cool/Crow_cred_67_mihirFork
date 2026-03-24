from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models.hackathon import Hackathon, HackathonRegistration, Submission
from backend.models.notification import Notification
from backend.utils.decorators import current_user_required
from backend.services.email_service import send_hackathon_registration_email
from datetime import datetime

hackathon_bp = Blueprint('hackathon', __name__)

@hackathon_bp.route('/create', methods=['POST'])
@current_user_required
def create_hackathon(current_user_id):
    data = request.get_json()
    if not data or not data.get('title') or not data.get('description') or not data.get('start_date') or not data.get('end_date'):
        return jsonify({"message": "Missing fields"}), 400

    # Simple date parsing (YYYY-MM-DD)
    try:
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
    except ValueError:
        return jsonify({"message": "Invalid date format, use YYYY-MM-DD"}), 400

    new_hack = Hackathon(
        title=data['title'],
        description=data['description'],
        start_date=start_date,
        end_date=end_date
    )
    db.session.add(new_hack)
    db.session.commit()
    return jsonify({"message": "Hackathon created", "id": new_hack.id}), 201

@hackathon_bp.route('/list', methods=['GET'])
def list_hackathons():
    hacks = Hackathon.query.all()
    result = [{
        "id": h.id, 
        "title": h.title, 
        "description": h.description, 
        "start_date": h.start_date.isoformat(), 
        "end_date": h.end_date.isoformat()
    } for h in hacks]
    return jsonify(result), 200

@hackathon_bp.route('/register', methods=['POST'])
@current_user_required
def register_hackathon(current_user_id):
    data = request.get_json()
    hackathon_id = data.get('hackathon_id')
    if not hackathon_id:
        return jsonify({"message": "hackathon_id required"}), 400
        
    hackathon = Hackathon.query.get(hackathon_id)
    if not hackathon:
        return jsonify({"message": "Hackathon not found"}), 404

    existing = HackathonRegistration.query.filter_by(user_id=current_user_id, hackathon_id=hackathon_id).first()
    if existing:
        return jsonify({"message": "Already registered"}), 400

    reg = HackathonRegistration(user_id=current_user_id, hackathon_id=hackathon_id, team_name=data.get('team_name'))
    db.session.add(reg)

    notification = Notification(
        user_id=current_user_id,
        title="Hackathon registration successful",
        message=f"You successfully registered for {hackathon.title}."
    )
    db.session.add(notification)
    
    db.session.commit()

    from backend.models.user import User
    user = User.query.get(current_user_id)
    if user:
        send_hackathon_registration_email(user.email)

    return jsonify({"message": "Registered successfully"}), 201

@hackathon_bp.route('/submit', methods=['POST'])
@current_user_required
def submit_project(current_user_id):
    data = request.get_json()
    hackathon_id = data.get('hackathon_id')
    project_link = data.get('project_link')
    
    if not hackathon_id or not project_link:
        return jsonify({"message": "Missing fields"}), 400

    sub = Submission(hackathon_id=hackathon_id, user_id=current_user_id, project_link=project_link)
    db.session.add(sub)
    db.session.commit()

    return jsonify({"message": "Project submitted successfully"}), 201

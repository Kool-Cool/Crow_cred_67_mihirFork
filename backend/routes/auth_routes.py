from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models.user import User
from backend.utils.jwt_helper import generate_tokens
from backend.services.email_service import send_welcome_email, send_login_email
import bcrypt

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"message": "Missing required fields"}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 409

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(name=data['name'], email=data['email'], password_hash=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()

    # Send Mock Welcome Email
    send_welcome_email(new_user.email, new_user.name)

    token = generate_tokens(new_user.id)
    return jsonify({
        "message": "User registered successfully", 
        "token": token,
        "user": new_user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=data['email']).first()
    
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user.password_hash.encode('utf-8')):
        # Send login notification email
        send_login_email(user.email, user.name)

        token = generate_tokens(user.id)
        return jsonify({
            "message": "Login successful", 
            "token": token,
            "user": user.to_dict()
        }), 200

    return jsonify({"message": "Invalid email or password"}), 401

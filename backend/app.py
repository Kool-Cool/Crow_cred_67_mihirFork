from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
import os

from backend.config import Config

db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    mail.init_app(app)

    # Register blueprints
    from backend.routes.auth_routes import auth_bp
    from backend.routes.course_routes import course_bp
    from backend.routes.hackathon_routes import hackathon_bp
    from backend.routes.post_routes import post_bp
    from backend.routes.payment_routes import payment_bp
    from backend.routes.notification_routes import notification_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(course_bp, url_prefix='/api/course')
    app.register_blueprint(hackathon_bp, url_prefix='/api/hackathon')
    app.register_blueprint(post_bp, url_prefix='/api/post')
    app.register_blueprint(payment_bp, url_prefix='/api/payment')
    app.register_blueprint(notification_bp, url_prefix='/api/notification')

    # Create tables
    with app.app_context():
        from backend import models  # Ensure models are imported before create_all
        db.create_all()

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {"status": "ok", "message": "CrowCred API is running!"}, 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)

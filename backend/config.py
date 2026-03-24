import os
from datetime import timedelta

class Config:
    # Secret key for JWT and session security
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev_secret_key_please_change_later')
    
    # SQLAlchemy Configuration
    # Uses SQLite by default, easily swap to PostgreSQL by updating database URI in env
    base_dir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f"sqlite:///{os.path.join(base_dir, 'app.db')}")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt_dev_secret_key_change_later')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    
    # Email Configuration (Real SMTP via Gmail)
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 465))
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', 'mpanigrahi581@gmail.com')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'iaqrzoalfmmlposh')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', 'mpanigrahi581@gmail.com')
    
    # Razorpay Configuration (Mock or Real)
    RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', 'rzp_test_dummykey')
    RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', 'rzp_test_dummysecret')

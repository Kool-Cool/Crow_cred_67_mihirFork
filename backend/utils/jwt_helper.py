from flask_jwt_extended import create_access_token
from datetime import timedelta

def generate_tokens(user_id):
    """
    Generate JWT token for a given user_id
    """
    # Create the token explicitly casting user_id to string as required by library
    access_token = create_access_token(identity=str(user_id), expires_delta=timedelta(hours=24))
    return access_token

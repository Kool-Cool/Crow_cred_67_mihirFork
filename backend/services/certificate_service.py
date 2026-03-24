import uuid

def generate_certificate(user_id, course_id):
    """
    Mock generating a certificate PDF and returning its URL
    """
    cert_id = uuid.uuid4().hex[:12]
    return f"https://crowdcred.com/certificates/{user_id}/{course_id}/{cert_id}.pdf"

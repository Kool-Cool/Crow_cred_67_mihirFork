import uuid

def create_razorpay_order(amount_inr, currency='INR'):
    """
    Mock Razorpay order creation
    """
    order_id = f"order_{uuid.uuid4().hex[:10]}"
    # Amount is returned in paise (so multiplied by 100)
    return {
        "id": order_id,
        "amount": amount_inr * 100,
        "currency": currency,
        "status": "created"
    }

def verify_razorpay_payment(payment_id, order_id, signature):
    """
    Mock Razorpay signature verification
    Always returns True for local development
    """
    return True

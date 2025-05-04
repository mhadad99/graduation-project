import requests

PAYMOB_API_KEY = "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBME1EZzBNeXdpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS4tdEJDYkJNMGJrc2NZMXVGWUUtZHR1bTNLNVZYODFaU1FFdG9YT1lfY2tWQ2lUakplR3NuTUw2TXViTDNuUVdJQUxnLWtxbUhpQkEwR1FXd3lwTWdjQQ=="
PAYMOB_INTEGRATION_ID = 5074658
PAYMOB_IFRAME_ID = 917610
PAYMOB_HMAC_SECRET = "BB29DD92D259FE3A135D6D683F503DAA"

def get_auth_token():
    response = requests.post("https://accept.paymob.com/api/auth/tokens", json={
        "api_key": PAYMOB_API_KEY
    })
    return response.json()["token"]

def create_order(token, amount_cents, user_email):
    order_data = {
        "auth_token": token,
        "delivery_needed": False,
        "amount_cents": amount_cents,
        "currency": "EGP",
        "items": []
    }
    response = requests.post("https://accept.paymob.com/api/ecommerce/orders", json=order_data)
    return response.json()

def get_payment_key(token, order_id, amount_cents, user):
    """
    Generate a payment key using Paymob API and user data.

    Args:
        token (str): Authentication token from Paymob.
        order_id (int): The ID of the order.
        amount_cents (int): The amount in cents.
        user (CustomUser): An instance of the CustomUser model.

    Returns:
        str: The payment key token.
    """
    payment_data = {
        "auth_token": token,
        "amount_cents": amount_cents,
        "expiration": 3600,
        "order_id": order_id,
        "billing_data": {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.second_name or "N/A",  # Default to "N/A" if second_name is None
            "phone_number": user.phone or "N/A",    # Default to "N/A" if phone is None
            "city": "Cairo",                        # You can make this dynamic if needed
            "country": "EG",                        # You can make this dynamic if needed
            "street": "some street",                # You can make this dynamic if needed
            "building": "123",                      # You can make this dynamic if needed
            "floor": "1",                           # You can make this dynamic if needed
            "apartment": "1"                        # You can make this dynamic if needed
        },
        "currency": "EGP",
        "integration_id": PAYMOB_INTEGRATION_ID
    }
    response = requests.post("https://accept.paymob.com/api/acceptance/payment_keys", json=payment_data)
    return response.json()["token"]

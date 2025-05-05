
import requests
import os
import logging
import hmac
import hashlib

logger = logging.getLogger(__name__)

# Load sensitive data from environment variables
PAYMOB_API_KEY = os.getenv("PAYMOB_API_KEY")
PAYMOB_INTEGRATION_ID = int(os.getenv("PAYMOB_INTEGRATION_ID", "5074658"))
PAYMOB_IFRAME_ID = int(os.getenv("PAYMOB_IFRAME_ID", "917610"))
PAYMOB_HMAC_SECRET = os.getenv("PAYMOB_HMAC_SECRET")


def get_auth_token():
    url = "https://accept.paymob.com/api/auth/tokens"
    payload = {"api_key": PAYMOB_API_KEY}

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()["token"]
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to get auth token: {e}")
        raise
    except KeyError:
        logger.error("Token missing from PayMob response")
        raise


def create_order(token, amount_cents, user_email):
    url = "https://accept.paymob.com/api/ecommerce/orders"
    payload = {
        "auth_token": token,
        "delivery_needed": False,
        "amount_cents": amount_cents,
        "currency": "EGP",
        "items": [],
        "merchant_order_id": user_email  # optional, for tracking
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Order creation failed: {e}")
        raise


def get_payment_key(token, order_id, amount_cents, user):
    billing_data = {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.second_name or "N/A",
        "phone_number": user.phone or "N/A",
        "city": user.city or "Cairo",
        "country": user.country or "EG",
        "street": user.street or "Default Street",
        "building": user.building or "123",
        "floor": user.floor or "1",
        "apartment": user.apartment or "1"
    }

    payload = {
        "auth_token": token,
        "amount_cents": amount_cents,
        "expiration": 3600,
        "order_id": order_id,
        "currency": "EGP",
        "integration_id": PAYMOB_INTEGRATION_ID,
        "billing_data": billing_data
    }

    url = "https://accept.paymob.com/api/acceptance/payment_keys"

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()["token"]
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to get payment key: {e}")
        raise
    except KeyError:
        logger.error("Payment token missing from response")
        raise


def verify_hmac_signature(data: dict, received_hmac: str) -> bool:
    """
    Verifies HMAC-SHA512 signature from PayMob webhook.
    """
    calculated_hmac = hmac.new(
        PAYMOB_HMAC_SECRET.encode("utf-8"),
        msg=str(data).encode("utf-8"),
        digestmod=hashlib.sha512
    ).hexdigest()

    return hmac.compare_digest(calculated_hmac, received_hmac)
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .paymob import get_auth_token, create_order, get_payment_key
from django.conf import settings

class PaymobPaymentInitView(APIView):
    def post(self, request):
        user_email = request.data.get("email")
        amount_cents = int(float(request.data.get("amount")) * 100)  # amount in EGP * 100

        token = get_auth_token()
        order = create_order(token, amount_cents, user_email)
        payment_token = get_payment_key(token, order["id"], amount_cents, user_email)

        iframe_url = f"https://accept.paymob.com/api/acceptance/iframes/917610?payment_token={payment_token}"

        return Response({"payment_url": iframe_url})

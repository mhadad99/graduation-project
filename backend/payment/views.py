# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .paymob import get_auth_token, create_order, get_payment_key
from user.models import CustomUser

class InitiatePaymentView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        amount_cents = request.data.get("amount_cents")
        if not amount_cents or not amount_cents.isdigit():
            return Response({"error": "Valid amount_cents is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            token = get_auth_token()
            order_data = create_order(token, amount_cents, user.email)
            order_id = order_data["id"]
            payment_token = get_payment_key(token, order_id, amount_cents, user)

            iframe_url = f"https://accept.paymob.com/api/acceptance/iframes/{PAYMOB_IFRAME_ID}?payment_token={payment_token}"

            return Response({
                "iframe_url": iframe_url,
                "order_id": order_id,
                "payment_token": payment_token
            })

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
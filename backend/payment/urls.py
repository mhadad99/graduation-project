from django.urls import path
from .views import PaymobPaymentInitView

urlpatterns = [
    path("pay/", PaymobPaymentInitView.as_view(), name="paymob-init")
]

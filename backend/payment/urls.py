# payment/urls.py

from django.urls import path
from .views import InitiatePaymentView

urlpatterns = [
    path('initiate-payment/', InitiatePaymentView.as_view(), name='initiate_payment'),
]
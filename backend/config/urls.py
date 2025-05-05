# config/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/payment/', include('payment.urls')),  # This includes URLs from payment/urls.py
]
from django.urls import path
from .views import (
    CreateServiceView,
    ServiceListView,
    ServiceDetailView,
    ServiceUpdateView,
    ServiceDeleteView,
)

urlpatterns = [
    path("", ServiceListView.as_view(), name="service-list"),
    path("create/", CreateServiceView.as_view(), name="service-create"),
    path("<int:id>/", ServiceDetailView.as_view(), name="service-detail"),
    path("update/<int:id>/", ServiceUpdateView.as_view(), name="service-update"),
    path("delete/<int:id>/", ServiceDeleteView.as_view(), name="service-delete"),
]

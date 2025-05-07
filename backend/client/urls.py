from django.urls import path
from .views import (
    ClientCreateView,
    ClientDetailView,
    ClientUpdateView,
    ClientDeleteView,
    ClientListView,
)

urlpatterns = [
    path("create/", ClientCreateView.as_view(), name="client-create"),
    path("detail/", ClientDetailView.as_view(), name="client-detail"),
    path("update/", ClientUpdateView.as_view(), name="client-update"),
    path("delete/", ClientDeleteView.as_view(), name="client-delete"),
    path("all/", ClientListView.as_view(), name="client-list"),
]
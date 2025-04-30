from django.urls import path
from .views import (
    ClientRatingCreateView,
    ClientRatingDetailView,
    ClientRatingUpdateView,
    ClientRatingDeleteView,
    ClientRatingListView,
)

urlpatterns = [
    path(
        "api/client-ratings/create/<int:project_id>/<int:freelancer_id>/",
        ClientRatingCreateView.as_view(),
        name="client-rating-create",
    ),
    path(
        "api/client-ratings/detail/<int:rating_id>/",
        ClientRatingDetailView.as_view(),
        name="client-rating-detail",
    ),
    path(
        "api/client-ratings/update/<int:rating_id>/",
        ClientRatingUpdateView.as_view(),
        name="client-rating-update",
    ),
    path(
        "api/client-ratings/delete/<int:rating_id>/",
        ClientRatingDeleteView.as_view(),
        name="client-rating-delete",
    ),
    path(
        "api/client-ratings/list/<int:project_id>/",
        ClientRatingListView.as_view(),
        name="client-rating-list",
    ),
]
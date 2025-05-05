from django.urls import path
from .views import (
    CreateServiceProposalView,
    ClientServiceProposalsView,
    ApproveServiceProposalView,
    DeleteServiceProposalView,
    ServiceProposalsByServiceView,
    UpdateOwnServiceProposalView,
)

urlpatterns = [
    path("apply/", CreateServiceProposalView.as_view(), name="create-service-proposal"),
    path(
        "my-proposals/",
        ClientServiceProposalsView.as_view(),
        name="my-service-proposals",
    ),
    path(
        "all-proposals-by-serviceId/<int:service_id>/",
        ServiceProposalsByServiceView.as_view(),
        name="service-proposals-by-service",
    ),
    path(
        "approve/<int:pk>/",
        ApproveServiceProposalView.as_view(),
        name="approve-service-proposal",
    ),
    path(
        "update/<int:pk>/",
        UpdateOwnServiceProposalView.as_view(),
        name="update-proposal",
    ),
    path(
        "delete/<int:pk>/",
        DeleteServiceProposalView.as_view(),
        name="delete-service-proposal",
    ),
]

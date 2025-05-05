from django.urls import path
from .views import (
    ApplyToProjectView,
    DeleteProposalView,
    MyProposalsView,
    ApproveProposalView,
    ProposalsByProjectView,
    UpdateProposalView,
)

urlpatterns = [
    path("apply/", ApplyToProjectView.as_view()),
    path(
        "proposals/<int:project_id>/",
        ProposalsByProjectView.as_view(),
        name="proposals-by-project",
    ),
    path("my-proposals/", MyProposalsView.as_view()),
    path("approve/<int:pk>/", ApproveProposalView.as_view()),
    path(
        "update/<int:pk>/",
        UpdateProposalView.as_view(),
        name="update-proposal",
    ),
    path("delete/<int:pk>/", DeleteProposalView.as_view()),
]

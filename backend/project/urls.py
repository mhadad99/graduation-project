# urls.py
from django.urls import path
from .views import (
    ProjectCreateView,
    ProjectListView,
    ProjectRetrieveView,
    ProjectUpdateView,
    ProjectDeleteView,
    ProjectsByCurrentClientView,
    ProjectsByUserIdView,
    # ProjectsByClientView,
    # ProjectsByFreelancerView,
)

urlpatterns = [
    path("", ProjectListView.as_view(), name="project-list"),
    path("create/", ProjectCreateView.as_view(), name="project-create"),
    path("<int:pk>/", ProjectRetrieveView.as_view(), name="project-retrieve"),
    path("update/<int:pk>/", ProjectUpdateView.as_view(), name="project-update"),
    path(
        "delete/<int:pk>/",
        ProjectDeleteView.as_view(),
        name="project-delete",
    ),
    # routes to get user projects
    path("my-projects/", ProjectsByCurrentClientView.as_view(), name="my-projects"),
    path(
        "users/<int:user_id>/",
        ProjectsByUserIdView.as_view(),
        name="projects-by-user",
    ),
]


# path(
#     "freelancer/<int:freelancer_id>/",
#     ProjectsByFreelancerView.as_view(),
#     name="projects-by-freelancer",
# ),
# path(
#     "client/<int:client_id>/",
#     ProjectsByClientView.as_view(),
#     name="projects-by-client",
# ),

from django.urls import path
from .views import (
    SkillListView,
    SkillDetailView,
    SkillCreateView,
    SkillUpdateView,
    SkillDeleteView,
)

urlpatterns = [
    path("all/", SkillListView.as_view(), name="skill-list"), 
    path("detail/<int:id>/", SkillDetailView.as_view(), name="skill-detail"),
    path("create/", SkillCreateView.as_view(), name="skill-create"),
    path("update/<int:id>/", SkillUpdateView.as_view(), name="skill-update"),
    path("delete/<int:id>/", SkillDeleteView.as_view(), name="skill-delete"),
]
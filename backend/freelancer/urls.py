from django.urls import path
from .views import (
    FreelancerCreateView,
    FreelancerDetailView,
    FreelancerListView,
    FreelancerUpdateView,
    FreelancerDeleteView,
)

urlpatterns = [
    path("all/", FreelancerListView.as_view(), name="freelancer-list"),
    path('create/', FreelancerCreateView.as_view(), name='freelancer-create'),
    path('detail/', FreelancerDetailView.as_view(), name='freelancer-detail'),
    path('update/', FreelancerUpdateView.as_view(), name='freelancer-update'),
    path('delete/', FreelancerDeleteView.as_view(), name='freelancer-delete'),
    
]



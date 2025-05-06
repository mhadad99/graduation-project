from django.urls import path
from admin_dashboard.views import (
    AdminUserListView,
    AdminUserDetailView,
    AdminFreelancerListView,
    AdminFreelancerDetailView,
    AdminClientListView,
    AdminClientDetailView,
    AdminProjectListView,
    AdminProjectDetailView,
    AdminSkillListView,
    AdminSkillDetailView,
    AdminRatingListView,
    AdminRatingDetailView,
    AdminServiceListView,
    AdminServiceDetailView,
    AdminProjectProposalListView, 
    AdminProjectProposalDetailView,
    AdminServiceProposalListView, 
    AdminServiceProposalDetailView
)

urlpatterns = [
    # 👤 Users
    path('users/', AdminUserListView.as_view(), name='admin-user-list'),
    path('users/<int:id>/', AdminUserDetailView.as_view(), name='admin-user-detail'),

    # 🧑‍💻 Freelancers
    path('freelancers/', AdminFreelancerListView.as_view(), name='admin-freelancer-list'),
    path('freelancers/<int:id>/', AdminFreelancerDetailView.as_view(), name='admin-freelancer-detail'),

    # 💼 Clients
    path('clients/', AdminClientListView.as_view(), name='admin-client-list'),
    path('clients/<int:id>/', AdminClientDetailView.as_view(), name='admin-client-detail'),

    # 📋 Projects
    path('projects/', AdminProjectListView.as_view(), name='admin-project-list'),
    path('projects/<int:id>/', AdminProjectDetailView.as_view(), name='admin-project-detail'),

    # 🔧 Skills
    path('skills/', AdminSkillListView.as_view(), name='admin-skill-list'),
    path('skills/<int:id>/', AdminSkillDetailView.as_view(), name='admin-skill-detail'),

    # ⭐ Ratings
    path('ratings/', AdminRatingListView.as_view(), name='admin-rating-list'),
    path('ratings/<int:id>/', AdminRatingDetailView.as_view(), name='admin-rating-detail'),

    # 🛠️ Services
    path('services/', AdminServiceListView.as_view(), name='admin-service-list'),
    path('services/<int:id>/', AdminServiceDetailView.as_view(), name='admin-service-detail'),

    # 📄 Project Proposals
    path('project-proposals/', AdminProjectProposalListView.as_view(), name='admin-project-proposals'),
    path('project-proposals/<int:id>/', AdminProjectProposalDetailView.as_view(), name='admin-project-proposal-detail'),

    # 📝 Service Proposals
    path('service-proposals/', AdminServiceProposalListView.as_view(), name='admin-service-proposals'),
    path('service-proposals/<int:id>/', AdminServiceProposalDetailView.as_view(), name='admin-service-proposal-detail'),
]
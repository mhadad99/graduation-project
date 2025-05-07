from rest_framework import serializers
from user.models import CustomUser
from freelancer.models import Freelancer
from client.models import Client
from project.models import Project
from skill.models import Skill
from client_rating.models import ClientRating
from service.models import Service  
from project_proposal.models import ProjectProposal
from service_proposal.models import ServiceProposal

# Reusable User Serializer
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_name', 'user_type', 'is_active', 'is_deleted']
        read_only_fields = ['id', 'email', 'user_name']


# Reusable Freelancer Serializer
class AdminFreelancerSerializer(serializers.ModelSerializer):
    uid = AdminUserSerializer(read_only=True)

    class Meta:
        model = Freelancer
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


# Reusable Client Serializer
class AdminClientSerializer(serializers.ModelSerializer):
    uid = AdminUserSerializer(read_only=True)

    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


# Reusable Project Serializer
class AdminProjectSerializer(serializers.ModelSerializer):
    # clientId = AdminUserSerializer(source='clientId', read_only=True)
    clientId = AdminUserSerializer(read_only=True)
    freelancerId = AdminUserSerializer(read_only=True)
    # freelancerId = AdminUserSerializer(source='freelancerId', read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


# Reusable Skill Serializer
class AdminSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


# Reusable Rating Serializer
class AdminRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientRating
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


# Service Serializers
class AdminServiceSerializer(serializers.ModelSerializer):
    # freelancerId = AdminUserSerializer(source='freelancerId', read_only=True)
    freelancerId = AdminUserSerializer(read_only=True)

    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


# === Project Proposal Serializer ===
class AdminProjectProposalSerializer(serializers.ModelSerializer):
    client = AdminUserSerializer(read_only=True)
    freelancer = AdminUserSerializer(read_only=True)
    project = AdminProjectSerializer(read_only=True)

    class Meta:
        model = ProjectProposal
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


# === Service Proposal Serializer ===
class AdminServiceProposalSerializer(serializers.ModelSerializer):
    client = AdminUserSerializer(read_only=True)
    service = AdminServiceSerializer(read_only=True)

    class Meta:
        model = ServiceProposal
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

from rest_framework import serializers
from .models import ProjectProposal


class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectProposal
        fields = "__all__"
        read_only_fields = ("freelancer", "is_approved", "is_deleted", "created_at")

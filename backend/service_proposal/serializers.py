from rest_framework import serializers
from .models import ServiceProposal


class ServiceProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProposal
        fields = "__all__"
        read_only_fields = ["is_approved", "client", "created_at", "is_deleted"]


# serializers.py
class UpdateServiceProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProposal
        fields = ["message", "price_offer"]  # only allow these to be updated

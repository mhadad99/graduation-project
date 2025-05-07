from rest_framework import serializers
from .models import ClientRating
from project.serializers import ProjectSerializer  # Import Project serializer
from client.serializers import ClientOutSerializer  # Import Client serializer
from freelancer.serializers import FreelancerOutSerializer  # Import Freelancer serializer

class ClientRatingSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    client = ClientOutSerializer(read_only=True)
    freelancer = FreelancerOutSerializer(read_only=True)

    class Meta:
        model = ClientRating
        fields = [
            "id",
            "project",
            "client",
            "freelancer",
            "rating",
            "is_deleted",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value
# serializers.py
from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    client_id = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "start_date",
            "end_date",
            "freelancerId",
            "clientId",
            "duration",
            "progress",
            "client_id",
            "user_id",
            "experience_level",
            "type",
            "budget",
        ]

    def get_client_id(self, obj):
        return obj.clientId.id if obj.clientId else None

    def get_user_id(self, obj):
        return obj.clientId.id if obj.clientId else None


class ProjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "name",
            "description",
            "start_date",
            "end_date",
            "duration",
            "progress",
            "experience_level",
            "type",
            "budget",
        ]

    def create(self, validated_data):
        validated_data["clientId"] = self.context["request"].user
        return super().create(validated_data)


class ProjectUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "name",
            "description",
            "start_date",
            "end_date",
            "freelancerId",
            "duration",
            "progress",
            "experience_level",
            "type",
            "budget",
        ]

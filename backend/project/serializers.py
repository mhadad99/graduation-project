# serializers.py
from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "clientId",
            "freelancerId",
            "name",
            "description",
            "start_date",
            "end_date",
            "freelancerId",
            "clientId",
            "duration",
            "progress",
        ]


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

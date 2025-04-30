from rest_framework import serializers

from client.serializers import ClientCreateSerializer
from freelancer.serializers import FreelancerCreateSerializer
from client.models import Client
from freelancer.models import Freelancer
from .models import CustomUser
from django.contrib.auth.hashers import make_password


class UserCreateSerializer(serializers.ModelSerializer):
    user_type = serializers.ChoiceField(
        choices=CustomUser.USER_TYPES[1:]
    )  # exclude 'none'

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "second_name",
            "email",
            "password",
            "user_name",
            "photo",
            "phone",
            "birth_date",
            "user_type",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return CustomUser.objects.create(**validated_data)


class UserOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "second_name",
            "email",
            "user_name",
            "photo",
            "phone",
            "birth_date",
            "user_type",
        ]


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

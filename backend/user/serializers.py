from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "second_name",
            "email",
            "password",
            "user_name",
            "phone",
            "birth_date",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)


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
        ]


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

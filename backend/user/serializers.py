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
    freelancer_data = FreelancerCreateSerializer(required=False)
    client_data = ClientCreateSerializer(required=False)

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
            "user_type",
            "freelancer_data",
            "client_data",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "freelancer_data": {"write_only": True},
            "client_data": {"write_only": True},
        }

    def create(self, validated_data):
        user_type = validated_data.pop("user_type")
        freelancer_data = validated_data.pop("freelancer_data", None)
        client_data = validated_data.pop("client_data", None)

        validated_data["password"] = make_password(validated_data["password"])
        user = CustomUser.objects.create(**validated_data, user_type=user_type)

        if user_type == "freelancer":
            if not freelancer_data:
                raise serializers.ValidationError(
                    {"freelancer_data": "Required for freelancer."}
                )
            Freelancer.objects.create(uid=user, **freelancer_data)

        elif user_type == "client":
            if not client_data:
                raise serializers.ValidationError(
                    {"client_data": "Required for client."}
                )
            Client.objects.create(uid=user, **client_data)

        return user


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

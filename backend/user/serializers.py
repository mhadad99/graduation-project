from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError
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
            "first_name",
            "second_name",
            "email",
            "password",
            "user_name",
            "photo",
            "phone",
            "birth_date",
            "bio",
            "address",
            "user_type",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return CustomUser.objects.create(**validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "first_name",
            "second_name",
            "email",
            "user_name",
            "photo",
            "phone",
            "birth_date",
            "bio",
            "address",
            "user_type",
        ]


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class UserPasswordUpdateSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    new_password_confirm = serializers.CharField(write_only=True)

    def validate(self, data):
        user = self.context["request"].user

        if not user.check_password(data["old_password"]):
            raise ValidationError({"old_password": "Old password is incorrect."})

        if data["new_password"] != data["new_password_confirm"]:
            raise ValidationError({"new_password_confirm": "Passwords do not match."})

        try:
            validate_password(data["new_password"], user)
        except DjangoValidationError as e:
            raise ValidationError({"new_password": list(e.messages)})

        return data

    def save(self, **kwargs):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user


class UserPhotoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["photo"]


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
            "bio",
            "address",
        ]

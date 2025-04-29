from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault("user_name", email.split("@")[0])
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    # User roles
    USER_TYPES = (
        ('none', 'None'),  # Default: No role assigned
        ('freelancer', 'Freelancer'),
        ('client', 'Client'),
    )

    first_name = models.CharField(max_length=255)
    second_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    selfie_verification = models.TextField(null=True, blank=True)
    user_name = models.CharField(max_length=255, unique=True)
    photo = models.TextField(null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    is_deleted = models.BooleanField(default=False)
    is_registered = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    # New field to track user role
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPES,
        default='none',
        help_text="Tracks whether the user is a freelancer, client, or neither."
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "user_name"]

    def __str__(self):
        return self.email
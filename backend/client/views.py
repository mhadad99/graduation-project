from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    ListAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from .models import Client
from user.models import CustomUser  # Correct import for CustomUser  # Import CustomUser to check user_type
from .serializers import ClientCreateSerializer, ClientOutSerializer

class ClientCreateView(CreateAPIView):
    serializer_class = ClientCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        # Check if the user is already registered as a freelancer
        if user.user_type == 'freelancer':
            raise PermissionDenied("You are already registered as a freelancer and cannot register as a client.")

        # Check if the user is already registered as a client
        if user.user_type == 'client':
            raise PermissionDenied("You are already registered as a client.")

        # Proceed with client registration
        serializer.save(uid=user)
        user.user_type = 'client'
        user.save()

class ClientDetailView(RetrieveAPIView):
    serializer_class = ClientOutSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            # Retrieve the client associated with the authenticated user
            return Client.objects.get(uid=self.request.user.id, is_deleted=False)
        except Client.DoesNotExist:
            raise NotFound("You do not have a client profile.")

class ClientUpdateView(UpdateAPIView):
    serializer_class = ClientCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            # Retrieve the client associated with the authenticated user
            return Client.objects.get(uid=self.request.user.id, is_deleted=False)
        except Client.DoesNotExist:
            raise NotFound("You do not have a client profile to update.")

class ClientDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            # Retrieve the client associated with the authenticated user
            return Client.objects.get(uid=self.request.user.id, is_deleted=False)
        except Client.DoesNotExist:
            raise NotFound("You do not have a client profile to delete.")

    def perform_destroy(self, instance):
        # Soft delete by marking the client as deleted
        instance.is_deleted = True
        instance.save()

class ClientListView(ListAPIView):
    serializer_class = ClientOutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only show non-deleted clients
        return Client.objects.filter(is_deleted=False)
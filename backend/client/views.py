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
from .models import Client
from .serializers import ClientCreateSerializer, ClientOutSerializer

class ClientCreateView(CreateAPIView):
    serializer_class = ClientCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically set the uid to the currently logged-in user
        serializer.save(uid=self.request.user)


class ClientDetailView(RetrieveAPIView):
    serializer_class = ClientOutSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        client_id = self.kwargs.get("id")
        try:
            return Client.objects.get(id=client_id, is_deleted=False)
        except Client.DoesNotExist:
            raise Http404("Client not found")


class ClientUpdateView(UpdateAPIView):
    serializer_class = ClientCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        client_id = self.kwargs.get("id")
        try:
            return Client.objects.get(id=client_id, is_deleted=False)
        except Client.DoesNotExist:
            raise Http404("Client not found")


class ClientDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        client_id = self.kwargs.get("id")
        try:
            return Client.objects.get(id=client_id, is_deleted=False)
        except Client.DoesNotExist:
            raise Http404("Client not found")

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class ClientListView(ListAPIView):
    serializer_class = ClientOutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Client.objects.filter(is_deleted=False)
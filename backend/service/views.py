from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from service.serializer import (
    ServiceCreateUpdateSerializer,
    ServiceRetriveDeleteSerializer,
)
from .models import Service
from django.conf import settings
from rest_framework.permissions import IsAuthenticated


# Create Service
class CreateServiceView(generics.CreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(freelancerId=self.request.user)  # same effect, cleaner


# List all Services
class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceRetriveDeleteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override get_queryset to filter out soft-deleted services.
        """
        return Service.objects.filter(is_deleted=False)  # Exclude soft-deleted records


# get service by id
class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceRetriveDeleteSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def get_object(self):
        """
        Override get_object to check if the service is soft-deleted.
        """
        service = super().get_object()  # Get the object using the default method

        if service.is_deleted:
            raise NotFound("This service has been deleted.")  # Return a 404 if deleted

        return service


# update service
class ServiceUpdateView(generics.UpdateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceCreateUpdateSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def perform_update(self, serializer):
        serializer.save(
            freelancerId=self.request.user
        )  # Optional if you want to auto re-assign


# delete service
class ServiceDeleteView(generics.UpdateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceRetriveDeleteSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        """
        Instead of deleting the object, we set is_deleted to True for soft deletion.
        """
        # Get the object to be updated
        service = self.get_object()

        # Set the 'is_deleted' flag to True
        service.is_deleted = True
        service.save()

        # Return a successful response
        return Response(
            {"message": "Service marked as deleted"}, status=status.HTTP_204_NO_CONTENT
        )

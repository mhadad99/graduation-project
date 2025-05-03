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

from freelancer.models import Freelancer
from project.models import Project
from .models import ClientRating
from .serializers import ClientRatingSerializer
from .permissions import IsClientUser  # Import the custom permission

class ClientRatingCreateView(CreateAPIView):
    serializer_class = ClientRatingSerializer
    permission_classes = [IsAuthenticated, IsClientUser]

    def perform_create(self, serializer):
        # Automatically set the client as the currently logged-in user
        client = self.request.user.client
        project_id = self.kwargs.get("project_id")  # Get project ID from URL
        freelancer_id = self.kwargs.get("freelancer_id")  # Get freelancer ID from URL
        try:
            project = Project.objects.get(id=project_id)
            freelancer = Freelancer.objects.get(id=freelancer_id, is_deleted=False)
        except Project.DoesNotExist:
            return Response(
                {"detail": "Project not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Freelancer.DoesNotExist:
            return Response(
                {"detail": "Freelancer not found."}, status=status.HTTP_404_NOT_FOUND
            )
        serializer.save(client=client, project=project, freelancer=freelancer)


class ClientRatingDetailView(RetrieveAPIView):
    serializer_class = ClientRatingSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        rating_id = self.kwargs.get("rating_id")
        try:
            return ClientRating.objects.get(id=rating_id, is_deleted=False)
        except ClientRating.DoesNotExist:
            raise NotFound("Rating not found.")


class ClientRatingUpdateView(UpdateAPIView):
    serializer_class = ClientRatingSerializer
    permission_classes = [IsAuthenticated, IsClientUser]

    def get_object(self):
        rating_id = self.kwargs.get("rating_id")
        try:
            return ClientRating.objects.get(id=rating_id, is_deleted=False)
        except ClientRating.DoesNotExist:
            raise NotFound("Rating not found.")

    def perform_update(self, serializer):
        # Ensure only the client who created the rating can update it
        rating = self.get_object()
        if rating.client.uid != self.request.user:
            raise PermissionDenied("You do not have permission to update this rating.")
        serializer.save()


class ClientRatingDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsClientUser]

    def get_object(self):
        rating_id = self.kwargs.get("rating_id")
        try:
            return ClientRating.objects.get(id=rating_id, is_deleted=False)
        except ClientRating.DoesNotExist:
            raise NotFound("Rating not found.")

    def perform_destroy(self, instance):
        # Soft delete the rating
        instance.is_deleted = True
        instance.save()


class ClientRatingListView(ListAPIView):
    serializer_class = ClientRatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs.get("project_id")
        return ClientRating.objects.filter(project_id=project_id, is_deleted=False)
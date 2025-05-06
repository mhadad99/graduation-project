from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import ServiceProposal
from .serializers import ServiceProposalSerializer, UpdateServiceProposalSerializer
from service.models import Service
from client.models import Client
from freelancer.models import Freelancer
from rest_framework.exceptions import PermissionDenied


class AllServiceProposalsView(generics.ListAPIView):
    queryset = ServiceProposal.objects.filter(is_deleted=False)
    serializer_class = ServiceProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

# Ensure only clients can create proposals
class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return Client.objects.filter(uid=request.user, is_deleted=False).exists()


class IsServiceOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.service.freelancer.uid == request.user


class CreateServiceProposalView(generics.CreateAPIView):
    serializer_class = ServiceProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsClient]

    def perform_create(self, serializer):
        client = Client.objects.get(uid=self.request.user)
        serializer.save(client=client)


class ClientServiceProposalsView(generics.ListAPIView):
    serializer_class = ServiceProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsClient]

    def get_queryset(self):
        client = get_object_or_404(Client, uid=self.request.user)
        return ServiceProposal.objects.filter(client=client, is_deleted=False)


class ApproveServiceProposalView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            proposal = ServiceProposal.objects.get(id=pk, is_deleted=False)
        except ServiceProposal.DoesNotExist:
            return Response({"detail": "Proposal not found."}, status=404)

        service = proposal.service

        # Only service owner (freelancer) can approve
        if service.freelancerId != request.user:
            return Response({"detail": "You are not the service owner."}, status=403)

        if proposal.is_approved:
            return Response({"detail": "Proposal already approved."}, status=400)

        proposal.is_approved = True
        proposal.save()
        return Response({"detail": "Proposal approved successfully."})


# List Proposals by Service ID (only for service owner)


# views.py
class ServiceProposalsByServiceView(generics.ListAPIView):
    serializer_class = ServiceProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        service_id = self.kwargs.get("service_id")
        service = get_object_or_404(Service, id=service_id, is_deleted=False)

        # Check that the request user is the freelancer who owns the service
        if service.freelancerId != self.request.user:

            raise PermissionDenied("You are not the owner of this service.")

        return ServiceProposal.objects.filter(service=service, is_deleted=False)


# views.py
class UpdateOwnServiceProposalView(generics.UpdateAPIView):
    serializer_class = UpdateServiceProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsClient]
    queryset = ServiceProposal.objects.filter(is_deleted=False)

    def get_object(self):
        proposal = get_object_or_404(
            ServiceProposal, id=self.kwargs["pk"], is_deleted=False
        )

        if proposal.client.uid != self.request.user:
            raise PermissionDenied("You can only update your own proposals.")
        return proposal


class DeleteServiceProposalView(generics.DestroyAPIView):
    queryset = ServiceProposal.objects.all()
    serializer_class = ServiceProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        if instance.client.uid != self.request.user:
            raise PermissionDenied("You can't delete this proposal.")
        instance.is_deleted = True
        instance.save()


class DeleteServiceProposalView(generics.DestroyAPIView):
    queryset = ServiceProposal.objects.all()
    serializer_class = ServiceProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        # Ensure the current user is the proposal creator
        if instance.client.uid != self.request.user:
            raise PermissionDenied("You can only delete your own proposals.")

        instance.is_deleted = True
        instance.save()

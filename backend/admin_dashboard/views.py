from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from .serializers import (
    AdminUserSerializer,
    AdminFreelancerSerializer,
    AdminClientSerializer,
    AdminProjectSerializer,
    AdminSkillSerializer,
    AdminRatingSerializer,
    AdminProjectProposalSerializer,
    AdminServiceProposalSerializer
)
from .permissions import IsSuperuser
from user.models import CustomUser
from freelancer.models import Freelancer
from client.models import Client
from project.models import Project
from skill.models import Skill
from client_rating.models import ClientRating
from service.models import Service
from admin_dashboard.serializers import AdminServiceSerializer
from project_proposal.models import ProjectProposal
from service_proposal.models import ServiceProposal
# from .serializers import AdminProjectProposalSerializer, AdminServiceProposalSerializer


# === Users ===
class AdminUserListView(ListAPIView):
    serializer_class = AdminUserSerializer
    permission_classes = [IsSuperuser]

    def get_queryset(self):
        return CustomUser.objects.all()


class AdminUserDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [IsSuperuser]
    lookup_field = 'id'

# === Freelancers ===
class AdminFreelancerListView(ListAPIView):
    queryset = Freelancer.objects.all()
    serializer_class = AdminFreelancerSerializer
    permission_classes = [IsSuperuser]


class AdminFreelancerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Freelancer.objects.all()
    serializer_class = AdminFreelancerSerializer
    permission_classes = [IsSuperuser]
    lookup_field = 'id'

# === Clients ===
class AdminClientListView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = AdminClientSerializer
    permission_classes = [IsSuperuser]


class AdminClientDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = AdminClientSerializer
    permission_classes = [IsSuperuser]
    lookup_field = 'id'

# === Projects ===
class AdminProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = AdminProjectSerializer
    permission_classes = [IsSuperuser]


class AdminProjectDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = AdminProjectSerializer
    permission_classes = [IsSuperuser]
    lookup_field = 'id'


# === Skills ===
class AdminSkillListView(ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = AdminSkillSerializer
    permission_classes = [IsSuperuser]


class AdminSkillDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = AdminSkillSerializer
    permission_classes = [IsSuperuser]


# === Ratings ===
class AdminRatingListView(ListAPIView):
    queryset = ClientRating.objects.all()
    serializer_class = AdminRatingSerializer
    permission_classes = [IsSuperuser]


class AdminRatingDetailView(RetrieveUpdateDestroyAPIView):
    queryset = ClientRating.objects.all()
    serializer_class = AdminRatingSerializer
    permission_classes = [IsSuperuser]
    lookup_field = "id"


# === Services ===
class AdminServiceListView(ListAPIView):
    queryset = Service.objects.all()
    serializer_class = AdminServiceSerializer
    permission_classes = [IsSuperuser]


class AdminServiceDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = AdminServiceSerializer
    permission_classes = [IsSuperuser]
    lookup_field = "id"

    def perform_destroy(self, instance):
        # Soft delete if is_deleted exists, else hard delete
        if hasattr(instance, 'is_deleted'):
            instance.is_deleted = True
            instance.save()
        else:
            instance.delete()



# === Project Proposals ===
class AdminProjectProposalListView(ListAPIView):
    queryset = ProjectProposal.objects.all()
    serializer_class = AdminProjectProposalSerializer
    permission_classes = [IsSuperuser]


class AdminProjectProposalDetailView(RetrieveUpdateDestroyAPIView):
    queryset = ProjectProposal.objects.all()
    serializer_class = AdminProjectProposalSerializer
    permission_classes = [IsSuperuser]
    lookup_field = 'id'


# === Service Proposals ===
class AdminServiceProposalListView(ListAPIView):
    queryset = ServiceProposal.objects.all()
    serializer_class = AdminServiceProposalSerializer
    permission_classes = [IsSuperuser]


class AdminServiceProposalDetailView(RetrieveUpdateDestroyAPIView):
    queryset = ServiceProposal.objects.all()
    serializer_class = AdminServiceProposalSerializer
    permission_classes = [IsSuperuser]
    lookup_field = 'id'

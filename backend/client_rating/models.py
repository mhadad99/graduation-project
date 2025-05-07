from django.db import models
from project.models import Project  # Import the Project model
from client.models import Client  # Import the Client model
from freelancer.models import Freelancer  # Import the Freelancer model

class ClientRating(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="ratings",
        help_text="The project associated with the rating."
    )
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="ratings_given",
        help_text="The client giving the rating."
    )
    freelancer = models.ForeignKey(
        Freelancer,
        on_delete=models.CASCADE,
        related_name="ratings_received",
        help_text="The freelancer being rated."
    )
    rating = models.PositiveIntegerField(
        choices=[(i, i) for i in range(1, 6)],
        help_text="Rating value (1 to 5)."
    )
    is_deleted = models.BooleanField(
        default=False,
        help_text="Marks whether the rating is deleted."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Rating {self.rating} by {self.client.uid.email} for {self.freelancer.uid.email} on project {self.project.name}"
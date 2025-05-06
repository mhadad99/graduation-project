from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone


class ProjectProposal(models.Model):
    freelancer = models.ForeignKey("freelancer.Freelancer", on_delete=models.CASCADE)
    project = models.ForeignKey("project.Project", on_delete=models.CASCADE)
    body = models.TextField(null=False, blank=False)
    bid_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=False, blank=False
    )
    is_approved = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    days_to_finish = models.IntegerField(null=True, blank=False)

    class Meta:
        unique_together = (
            "freelancer",
            "project",
        )  # one proposal per project per freelancer

# models.py
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

from client.models import Client
from freelancer.models import Freelancer
from project.enums import Progress


class Project(models.Model):

    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()

    freelancerId = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="freelancer_projects",
    )
    clientId = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="client_projects",
    )
    duration = models.IntegerField()  # duration in days, for example
    progress = models.CharField(
        max_length=20,
        choices=Progress.choices,
        default=Progress.NOT_STARTED,
    )
    description = models.TextField()

    def __str__(self):
        return self.name

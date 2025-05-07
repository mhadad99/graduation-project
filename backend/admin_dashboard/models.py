from django.db import models
from user.models import CustomUser

class AdminActionLog(models.Model):
    admin = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=100)  # e.g., "Project deleted"
    timestamp = models.DateTimeField(auto_now_add=True)
    target_model = models.CharField(max_length=50)  # e.g., "project.Project"
    target_id = models.PositiveIntegerField()  # ID of the object affected

    def __str__(self):
        return f"{self.admin} - {self.action} at {self.timestamp}"
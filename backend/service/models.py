from django.db import models
from django.conf import settings


class Service(models.Model):
    freelancerId = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="services"
    )
    service_name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    video = models.FileField(upload_to="service_videos/", blank=True, null=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.service_name

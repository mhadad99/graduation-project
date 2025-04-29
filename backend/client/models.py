from django.db import models
from django.conf import settings

class Client(models.Model):
    # Clients PK
    id = models.AutoField(primary_key=True)

    # FK => link between users and clients models
    uid = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='client_profile'  
    )

    # Fields specific to Client
    phone = models.CharField(max_length=20, null=True, blank=True) 
    company = models.CharField(max_length=255, null=True, blank=True)  
    is_deleted = models.BooleanField(default=False)  
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.uid.user_name} - {self.company or 'No Company'}"

    class Meta:
        verbose_name = "Client"
        verbose_name_plural = "Clients"
        ordering = ['-created_at']  # Orders clients by creation date (newest first)
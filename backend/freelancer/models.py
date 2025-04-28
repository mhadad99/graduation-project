from django.db import models
from django.conf import settings
from skill.models import Skill  

class Freelancer(models.Model):

    # Choices for experience level
    EXPERIENCE_LEVEL_CHOICES = [
        ('junior', 'Junior'),
        ('mid', 'Mid-Level'),
        ('senior', 'Senior'),
    ]

    # Freelancers PK
    id = models.AutoField(primary_key=True)

    # FK => link between users and freelancers models
    uid = models.OneToOneField(
        settings.AUTH_USER_MODEL,  
        on_delete=models.CASCADE,
        related_name='freelancer_profile'
    )

    # Fields specific to Freelancer
    experience_level = models.CharField(
        max_length=10,
        choices=EXPERIENCE_LEVEL_CHOICES,
        default='junior'
    )
    cv = models.URLField(null=True, blank=True) 
    portfolio = models.URLField(null=True, blank=True) 
    is_tested = models.BooleanField(default=False) 
    is_verified = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)  
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True) 

    # Many-to-Many relationship with Skills
    skills = models.ManyToManyField(Skill, blank=True, related_name="freelancers")

    def __str__(self):
        return f"{self.uid.user_name} - {self.get_experience_level_display()}"

    class Meta:
        verbose_name = "Freelancer"
        verbose_name_plural = "Freelancers"
        ordering = ['-created_at']  # Orders freelancers by creation date (newest first)
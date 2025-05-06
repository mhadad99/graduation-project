from django.db import models
from django.conf import settings
from skill.models import Skill  

class Certification(models.Model):
    name = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255, blank=True, null=True)
    year = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.name

class Education(models.Model):
    degree = models.CharField(max_length=255)
    school = models.CharField(max_length=255)
    year = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.degree} - {self.school}"

class Freelancer(models.Model):
    """
    Model representing a Freelancer profile linked to a CustomUser.
    """

    # Choices for experience level
    EXPERIENCE_LEVEL_CHOICES = [
        ('junior', 'Junior'),
        ('mid', 'Mid-Level'),
        ('senior', 'Senior'),
    ]

    # Primary Key
    id = models.AutoField(primary_key=True)

    # Foreign Key linking to the CustomUser model
    uid = models.OneToOneField(
        settings.AUTH_USER_MODEL,  
        on_delete=models.CASCADE,
        related_name='freelancer_profile',
        help_text="The user associated with this freelancer profile."
    )

    # Fields specific to Freelancer
    experience_level = models.CharField(
        max_length=10,
        choices=EXPERIENCE_LEVEL_CHOICES,
        default='junior',
        null=True,  # Allow null for flexibility
        blank=True,  # Allow blank in forms
        help_text="The experience level of the freelancer."
    )
    cv = models.URLField(null=True, blank=True, help_text="URL to the freelancer's CV.")
    portfolio = models.URLField(null=True, blank=True, help_text="URL to the freelancer's portfolio.")
    is_tested = models.BooleanField(default=False, help_text="Whether the freelancer has been tested.")
    is_verified = models.BooleanField(default=False, help_text="Whether the freelancer is verified.")
    is_deleted = models.BooleanField(default=False, help_text="Soft delete flag for the freelancer.")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp of when the freelancer profile was created.")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp of the last update to the freelancer profile.")
    
    # Many-to-Many relationship with Skills
    skills = models.ManyToManyField(
        Skill,
        blank=True,
        related_name="freelancers",
        help_text="Skills associated with the freelancer."
    )

    certifications = models.ManyToManyField(Certification, blank=True, related_name="freelancers")
    educations = models.ManyToManyField(Education, blank=True, related_name="freelancers")

    def __str__(self):
        return f"{self.uid.user_name} - {self.get_experience_level_display()}"

    class Meta:
        verbose_name = "Freelancer"
        verbose_name_plural = "Freelancers"
        ordering = ['-created_at']  # Orders freelancers by creation date (newest first)
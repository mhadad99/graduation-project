from django.db import models

class Skill(models.Model):
    id = models.AutoField(primary_key=True)
    skill_name = models.CharField(max_length=255, unique=True) 

    def __str__(self):
        return self.skill_name

    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"
        ordering = ['skill_name']  # Orders skills alphabetically
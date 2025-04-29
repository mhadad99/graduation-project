from django.db import models


class Progress(models.TextChoices):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed", "Completed"
    CANCELLED = "cancelled", "Cancelled"

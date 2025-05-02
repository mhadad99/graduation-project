from django.db import models


class Progress(models.TextChoices):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed", "Completed"
    CANCELLED = "cancelled", "Cancelled"


class Type(models.TextChoices):
    FIXED_PRICE = "fixed_price", "Fixed Price"
    HOURLY = "hourly", "Hourly"


class ExperienceLevel(models.TextChoices):
    JUNIOR = "junior", "Junior"
    MID = "mid", "Mid-Level"
    SENIOR = "senior", "Senior"

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model # Using Django's built-in User model
User = get_user_model()

class Conversation(models.Model):
    """
    Represents a conversation session with a user.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conversations')
    title = models.CharField(max_length=255, blank=True, null=True, help_text="Optional title for the conversation")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Conversation {self.id} for {self.user.username}"

    class Meta:
        ordering = ['-created_at']

class ChatMessage(models.Model):
    """
    Represents a single message within a conversation.
    """
    ROLE_CHOICES = [
        ('user', 'User'),
        ('model', 'Model'), # For Gemini's responses
    ]
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    # Optional: Store tokens or other metadata from Gemini API
    # prompt_tokens = models.IntegerField(null=True, blank=True)
    # completion_tokens = models.IntegerField(null=True, blank=True)
    # total_tokens = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.get_role_display()} message at {self.timestamp.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        ordering = ['timestamp']
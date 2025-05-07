from rest_framework import serializers
from .models import Conversation, ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'role', 'content', 'timestamp']
        read_only_fields = ['id', 'timestamp']

class ConversationSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)
    # To create messages along with conversation (optional, more complex)
    # messages = ChatMessageSerializer(many=True, required=False)

    class Meta:
        model = Conversation
        fields = ['id', 'user', 'title', 'created_at', 'updated_at', 'messages']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at', 'messages'] # User set by view

class UserPromptSerializer(serializers.Serializer):
    """
    Serializer for the user's input.
    """
    prompt = serializers.CharField(max_length=5000)
    conversation_id = serializers.IntegerField(required=False, allow_null=True, help_text="ID of an existing conversation. If null, a new one is created.")


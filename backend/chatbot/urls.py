from django.urls import path
from .views import ChatView, ConversationHistoryView # Already imported above

urlpatterns = [
    path('chat/', ChatView.as_view(), name='chat-api'),
    path('conversations/', ConversationHistoryView.as_view(), name='conversation-list'),
    path('conversations/<int:conversation_id>/', ConversationHistoryView.as_view(), name='conversation-detail'),
]
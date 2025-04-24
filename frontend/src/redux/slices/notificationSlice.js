import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';

// Async thunks for notification operations
export const fetchNotifications = createAsyncThunk(
  'notification/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      // Since we don't have a dedicated notifications endpoint in the JSON server,
      // we'll use a combination of messages, proposals, and other relevant data
      // to simulate notifications
      
      // Fetch unread messages
      const messagesResponse = await api.get('/messages');
      const messages = messagesResponse.data || [];
      
      // Filter messages where the user is the receiver and the message is unread
      const unreadMessages = messages.filter(
        message => message.receiverId === userId && !message.read
      );
      
      // Fetch proposals (for freelancers)
      const proposalsResponse = await api.get('/proposals');
      const proposals = proposalsResponse.data || [];
      
      // Filter proposals relevant to the user
      const userProposals = proposals.filter(
        proposal => proposal.userId === userId || proposal.clientId === userId
      );
      
      // Create notification objects
      const messageNotifications = unreadMessages.map(message => ({
        id: `msg-${message.id}`,
        type: 'message',
        content: `New message: ${message.content.substring(0, 30)}${message.content.length > 30 ? '...' : ''}`,
        createdAt: message.timestamp,
        read: false,
        sourceId: message.conversationId,
        senderId: message.senderId
      }));
      
      const proposalNotifications = userProposals.map(proposal => ({
        id: `prop-${proposal.id}`,
        type: 'proposal',
        content: `New proposal for: ${proposal.projectTitle}`,
        createdAt: proposal.createdAt,
        read: false,
        sourceId: proposal.id,
        senderId: proposal.userId
      }));
      
      // Combine all notifications
      const notifications = [
        ...messageNotifications,
        ...proposalNotifications
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return notifications;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch notifications' });
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notification/markAsRead',
  async ({ notificationId, userId }, { rejectWithValue }) => {
    try {
      // For message notifications, update the message read status
      if (notificationId.startsWith('msg-')) {
        const messageId = notificationId.replace('msg-', '');
        const messageResponse = await api.get(`/messages/${messageId}`);
        const message = messageResponse.data;
        
        if (message) {
          await api.patch(`/messages/${messageId}`, { read: true });
        }
      }
      
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to mark notification as read' });
    }
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark Notification as Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notificationId = action.payload;
        const notification = state.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.read = true;
        }
        state.unreadCount = state.notifications.filter(n => !n.read).length;
      });
  },
});

export const { clearNotifications, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;

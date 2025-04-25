import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for chat operations
export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/users/${userId}/conversations`);
      return response.json();
    } catch (error) {
      return rejectWithValue({ message: 'Failed to fetch conversations' });
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/conversations/${conversationId}/messages`);
      return response.json();
    } catch (error) {
      return rejectWithValue({ message: 'Failed to fetch messages' });
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await fetch('/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });
      return response.json();
    } catch (error) {
      return rejectWithValue({ message: 'Failed to send message' });
    }
  }
);

export const createConversation = createAsyncThunk(
  'chat/createConversation',
  async (conversationData, { rejectWithValue }) => {
    try {
      const response = await fetch('/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conversationData),
      });
      return response.json();
    } catch (error) {
      return rejectWithValue({ message: 'Failed to create conversation' });
    }
  }
);

const initialState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    markAsRead: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.unreadCount = 0;
      }
      state.unreadCount = state.conversations.reduce((total, conv) => total + conv.unreadCount, 0);
    },
    addLocalMessage: (state, action) => {
      // For optimistic updates when sending messages
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
        state.unreadCount = action.payload.reduce((total, conv) => total + conv.unreadCount, 0);
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        // Update with the actual message from the server
        const index = state.messages.findIndex(msg => msg.tempId === action.payload.tempId);
        if (index !== -1) {
          state.messages[index] = action.payload;
        } else {
          state.messages.push(action.payload);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Conversation
      .addCase(createConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations.push(action.payload);
        state.currentConversation = action.payload;
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentConversation, clearMessages, markAsRead, addLocalMessage } = chatSlice.actions;
export default chatSlice.reducer;

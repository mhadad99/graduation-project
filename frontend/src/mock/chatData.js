/** @format */

export const mockChatData = {
  currentUser: {
    id: 1,
    name: "Ayman Samir",
    avatar: "https://i.imgur.com/6AglEUF.jpeg",
  },
  conversations: [
    {
      id: 1,
      participants: [1, 2],
      lastMessage: "When can you start the project?",
      lastMessageTime: "2024-04-26T10:30:00",
      unreadCount: 2,
      participantInfo: {
        id: 2,
        name: "Sarah Ahmed",
        avatar: "https://i.imgur.com/7D8wF.jpeg",
        isOnline: true,
      },
    },
    {
      id: 2,
      participants: [1, 3],
      lastMessage: "The design looks great!",
      lastMessageTime: "2024-04-25T15:45:00",
      unreadCount: 0,
      participantInfo: {
        id: 3,
        name: "Mohamed Ali",
        avatar: "https://i.imgur.com/8DKwrRh.jpeg",
        isOnline: false,
      },
    },
  ],
  messages: {
    1: [
      {
        id: 1,
        conversationId: 1,
        senderId: 2,
        content:
          "Hi! I saw your profile and I'm interested in your web development services",
        timestamp: "2024-04-26T10:25:00",
        read: true,
      },
      {
        id: 2,
        conversationId: 1,
        senderId: 1,
        content:
          "Hello! Thank you for reaching out. I'd be happy to help with your project",
        timestamp: "2024-04-26T10:27:00",
        read: true,
      },
      {
        id: 3,
        conversationId: 1,
        senderId: 2,
        content: "When can you start the project?",
        timestamp: "2024-04-26T10:30:00",
        read: false,
      },
    ],
    2: [
      {
        id: 4,
        conversationId: 2,
        senderId: 1,
        content: "I've completed the initial design",
        timestamp: "2024-04-25T15:40:00",
        read: true,
      },
      {
        id: 5,
        conversationId: 2,
        senderId: 3,
        content: "The design looks great!",
        timestamp: "2024-04-25T15:45:00",
        read: true,
      },
    ],
  },
};

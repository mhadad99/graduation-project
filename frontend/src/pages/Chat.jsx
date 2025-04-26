/** @format */

import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search,
  ChatDots,
  Send,
  Paperclip,
  EmojiSmile,
  Clock,
  CheckCircleFill,
  ThreeDots,
} from "react-bootstrap-icons";
import { mockChatData } from "../mock/chatData";
import "../styles/components/Chat.css";
import DateDivider from "../components/chat/DateDivider";
import Message from "../components/chat/Message";
import ChatHeader from "../components/chat/ChatHeader";
import EmojiPickerButton from "../components/chat/EmojiPickerButton";

const Chat = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Local state instead of Redux
  const [currentUser] = useState(mockChatData.currentUser);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fix 1: Only load conversations once on mount
  useEffect(() => {
    setConversations(mockChatData.conversations);
    setLoading(false);
  }, []); // Empty dependency array

  // Fix 2: Modify the conversation effect to prevent infinite loops
  useEffect(() => {
    if (!conversationId || !conversations.length) return;

    const conversation = conversations.find(
      (c) => c.id.toString() === conversationId
    );

    if (conversation) {
      setCurrentConversation(conversation);
      // Only set messages if they've changed
      const conversationMessages = mockChatData.messages[conversationId] || [];
      setMessages(conversationMessages);

      // Update unread count only if needed
      if (conversation.unreadCount > 0) {
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id.toString() === conversationId
              ? { ...conv, unreadCount: 0 }
              : conv
          )
        );
      }
    } else if (conversations.length > 0) {
      // Navigate only if no conversation is selected
      navigate(`/chat/${conversations[0].id}`);
    }
  }, [conversationId, conversations.length]); // Reduced dependencies

  // Fix 3: Scroll to bottom only when messages change
  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages.length]); // Only depend on messages length

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      conversationId: currentConversation.id,
      senderId: currentUser.id,
      content: messageText,
      timestamp: new Date().toISOString(),
      read: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    // Update last message in conversations list
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === currentConversation.id
          ? {
              ...conv,
              lastMessage: messageText,
              lastMessageTime: new Date().toISOString(),
            }
          : conv
      )
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conversation) => {
    // In a real app, you would filter based on the other participant's name
    // For now, we'll just return all conversations since we don't have that data
    return true;
  });

  // Get other participant's info
  const getParticipantInfo = React.useCallback((conversation) => {
    if (!conversation) return null;

    return (
      conversation.participantInfo || {
        id: null,
        name: "Unknown",
        avatar: "innovative-methods.jpg",
        isOnline: false,
      }
    );
  }, []);

  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSelectConversation = (id) => {
    navigate(`/chat/${id}`);
  };

  const handleEmojiClick = (emoji) => {
    setMessageText((prev) => prev + emoji);
  };

  return (
    <div className="chat-page">
      <Container fluid="xxl">
        <Card className="chat-wrapper border-0">
          <Card.Body className="p-0">
            <Row className="g-0 h-100">
              {/* Conversations Column */}
              <Col md={4} className="border-end conversations-column">
                <div className="chat-header">
                  <h5 className="mb-3 fw-bold text-primary">Messages</h5>
                  <InputGroup>
                    <InputGroup.Text className="bg-transparent border-end-0">
                      <Search className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search conversations..."
                      className="border-start-0 bg-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </div>

                <div className="conversations-list">
                  {loading && conversations.length === 0 ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : filteredConversations.length > 0 ? (
                    <ListGroup variant="flush">
                      {filteredConversations.map((conversation) => {
                        const participant = getParticipantInfo(conversation);
                        const isActive =
                          currentConversation?.id === conversation.id;

                        return (
                          <ListGroup.Item
                            key={conversation.id}
                            action
                            active={isActive}
                            onClick={() =>
                              handleSelectConversation(conversation.id)
                            }
                            className={`conversation-item px-3 py-3 border-bottom ${
                              isActive ? "bg-primary bg-opacity-10" : ""
                            }`}>
                            <div className="d-flex align-items-center">
                              <div className="position-relative me-3">
                                <img
                                  src={participant.avatar}
                                  alt={participant.name}
                                  className="rounded-circle"
                                  width="48"
                                  height="48"
                                  style={{ objectFit: "cover" }}
                                />
                                {participant.isOnline && (
                                  <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-white"></span>
                                )}
                              </div>
                              <div className="flex-grow-1 min-width-0">
                                <div className="d-flex justify-content-between align-items-center">
                                  <h6 className="mb-0 text-truncate fw-bold">
                                    {participant.name}
                                  </h6>
                                  <small
                                    className={`text-${
                                      isActive ? "primary" : "muted"
                                    }`}>
                                    {formatTime(conversation.lastMessageTime)}
                                  </small>
                                </div>
                                <p className="mb-0 text-truncate small">
                                  {conversation.lastMessage}
                                </p>
                              </div>
                              {conversation.unreadCount > 0 && (
                                <Badge bg="primary" pill className="ms-2">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  ) : (
                    <div className="text-center py-5">
                      <ChatDots size={48} className="text-muted mb-3" />
                      <p className="mb-0">No conversations yet</p>
                    </div>
                  )}
                </div>
              </Col>

              {/* Messages Column */}
              <Col md={8} className="messages-column">
                {currentConversation ? (
                  <>
                    <ChatHeader
                      participant={getParticipantInfo(currentConversation)}
                    />
                    <div className="chat-messages">
                      <div
                        className="p-3"
                        style={{ height: "60vh", overflowY: "auto" }}>
                        {loading ? (
                          <div className="text-center py-5">
                            <div
                              className="spinner-border text-primary"
                              role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : messages.length > 0 ? (
                          <div>
                            {messages.map((message, index) => {
                              const isSender =
                                message.senderId === currentUser.id;
                              const showDate =
                                index === 0 ||
                                new Date(message.timestamp).toDateString() !==
                                  new Date(
                                    messages[index - 1].timestamp
                                  ).toDateString();

                              return (
                                <div key={message.id || message.tempId}>
                                  {showDate && (
                                    <DateDivider
                                      timestamp={message.timestamp}
                                    />
                                  )}
                                  <Message
                                    message={message}
                                    isSender={isSender}
                                    participant={getParticipantInfo(
                                      currentConversation
                                    )}
                                    formatTime={formatTime}
                                  />
                                </div>
                              );
                            })}
                            <div ref={messagesEndRef} />
                          </div>
                        ) : (
                          <div className="text-center py-5">
                            <ChatDots size={48} className="text-muted mb-3" />
                            <p className="mb-0">
                              No messages yet. Start the conversation!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="chat-input">
                      <div className="p-3 border-top">
                        <Form onSubmit={handleSendMessage}>
                          <InputGroup>
                            <Button variant="light" className="action-button">
                              <Paperclip />
                            </Button>
                            <Form.Control
                              type="text"
                              placeholder="Type a message..."
                              value={messageText}
                              onChange={handleMessageChange}
                            />
                            <EmojiPickerButton
                              onEmojiClick={handleEmojiClick}
                            />
                            <Button
                              variant="success"
                              type="submit"
                              className="action-button ms-1"
                              disabled={!messageText.trim()}>
                              <Send size={20} className="text-white" />
                            </Button>
                          </InputGroup>
                        </Form>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <ChatDots size={64} className="text-muted mb-3" />
                    <h5>Select a conversation</h5>
                    <p className="text-muted">
                      Choose a conversation from the list to start chatting
                    </p>
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Chat;

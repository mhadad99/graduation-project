import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchConversations, 
  fetchMessages, 
  sendMessage, 
  setCurrentConversation,
  markAsRead,
  addLocalMessage
} from '../redux/slices/chatSlice';
import { 
  Search, 
  ChatDots, 
  Send, 
  Paperclip, 
  EmojiSmile, 
  Clock, 
  CheckCircleFill, 
  ThreeDots 
} from 'react-bootstrap-icons';

const Chat = () => {
  const { conversationId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  const { conversations, currentConversation, messages, loading, unreadCount } = useSelector(state => state.chat);
  
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch conversations on component mount
  useEffect(() => {
    if (isAuthenticated && currentUser?.id) {
      dispatch(fetchConversations(currentUser.id));
    }
  }, [dispatch, isAuthenticated, currentUser]);
  
  // Set current conversation and fetch messages when conversationId changes
  useEffect(() => {
    if (conversationId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id.toString() === conversationId);
      if (conversation) {
        dispatch(setCurrentConversation(conversation));
        dispatch(fetchMessages(conversationId));
        dispatch(markAsRead(conversationId));
      }
    } else if (conversations.length > 0 && !conversationId) {
      // If no conversation is selected but conversations exist, navigate to the first one
      navigate(`/chat/${conversations[0].id}`);
    }
  }, [dispatch, conversationId, conversations, navigate]);
  
  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    // Create a temporary message for optimistic UI update
    const tempMessage = {
      id: `temp-${Date.now()}`,
      tempId: `temp-${Date.now()}`,
      conversationId: currentConversation.id,
      senderId: currentUser.id,
      receiverId: currentConversation.participants.find(id => id !== currentUser.id),
      content: messageText,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Add message locally for immediate UI update
    dispatch(addLocalMessage(tempMessage));
    
    // Send message to server
    dispatch(sendMessage({
      conversationId: currentConversation.id,
      senderId: currentUser.id,
      receiverId: currentConversation.participants.find(id => id !== currentUser.id),
      content: messageText,
      tempId: tempMessage.tempId
    }));
    
    setMessageText('');
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  };
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conversation => {
    // In a real app, you would filter based on the other participant's name
    // For now, we'll just return all conversations since we don't have that data
    return true;
  });
  
  // Get other participant's info (mock data for now)
  const getParticipantInfo = (conversation) => {
    const participantId = conversation.participants.find(id => id !== currentUser.id);
    // In a real app, you would fetch this from your users data
    return {
      id: participantId,
      name: participantId === 1 ? 'Ayman Samir' : 'Sarah Johnson',
      avatar: participantId === 1 ? 'https://i.imgur.com/6AglEUF.jpeg' : 'https://i.imgur.com/JFHjdNZ.jpeg',
      isOnline: true
    };
  };
  
  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Row className="g-0">
                {/* Conversations List */}
                <Col md={4} className="border-end">
                  <div className="p-3 border-bottom">
                    <h5 className="fw-bold mb-3">Messages</h5>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="bg-light border-end-0">
                        <Search />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-start-0 bg-light"
                      />
                    </InputGroup>
                  </div>
                  
                  <div className="conversations-list" style={{ height: '70vh', overflowY: 'auto' }}>
                    {loading && conversations.length === 0 ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : filteredConversations.length > 0 ? (
                      <ListGroup variant="flush">
                        {filteredConversations.map(conversation => {
                          const participant = getParticipantInfo(conversation);
                          const isActive = currentConversation?.id === conversation.id;
                          
                          return (
                            <ListGroup.Item 
                              key={conversation.id}
                              action
                              active={isActive}
                              onClick={() => navigate(`/chat/${conversation.id}`)}
                              className={`px-3 py-3 border-bottom ${isActive ? 'bg-primary bg-opacity-10' : ''}`}
                            >
                              <div className="d-flex align-items-center">
                                <div className="position-relative me-3">
                                  <img 
                                    src={participant.avatar} 
                                    alt={participant.name} 
                                    className="rounded-circle" 
                                    width="48" 
                                    height="48"
                                    style={{ objectFit: 'cover' }}
                                  />
                                  {participant.isOnline && (
                                    <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-white"></span>
                                  )}
                                </div>
                                <div className="flex-grow-1 min-width-0">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0 text-truncate fw-bold">{participant.name}</h6>
                                    <small className={`text-${isActive ? 'primary' : 'muted'}`}>
                                      {formatTime(conversation.lastMessageTime)}
                                    </small>
                                  </div>
                                  <p className="mb-0 text-truncate small">
                                    {conversation.lastMessage}
                                  </p>
                                </div>
                                {conversation.unreadCount > 0 && (
                                  <Badge 
                                    bg="primary" 
                                    pill 
                                    className="ms-2"
                                  >
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
                
                {/* Chat Messages */}
                <Col md={8}>
                  {currentConversation ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                        {currentConversation && (
                          <div className="d-flex align-items-center">
                            <div className="position-relative me-3">
                              {currentConversation && (
                                <img 
                                  src={getParticipantInfo(currentConversation).avatar} 
                                  alt={getParticipantInfo(currentConversation).name} 
                                  className="rounded-circle" 
                                  width="48" 
                                  height="48"
                                  style={{ objectFit: 'cover' }}
                                />
                              )}
                              <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-white"></span>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold">{getParticipantInfo(currentConversation).name}</h6>
                              <small className="text-success">Online</small>
                            </div>
                          </div>
                        )}
                        <div>
                          <Button variant="light" className="rounded-circle p-2 me-2">
                            <Search />
                          </Button>
                          <Button variant="light" className="rounded-circle p-2">
                            <ThreeDots />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Messages */}
                      <div className="chat-messages p-3" style={{ height: '60vh', overflowY: 'auto' }}>
                        {loading ? (
                          <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        ) : messages.length > 0 ? (
                          <div>
                            {messages.map((message, index) => {
                              const isSender = message.senderId === currentUser.id;
                              const showDate = index === 0 || 
                                new Date(message.timestamp).toDateString() !== 
                                new Date(messages[index - 1].timestamp).toDateString();
                              
                              return (
                                <div key={message.id || message.tempId}>
                                  {showDate && (
                                    <div className="text-center my-3">
                                      <span className="badge bg-light text-dark px-3 py-2">
                                        {formatDate(message.timestamp)}
                                      </span>
                                    </div>
                                  )}
                                  <div className={`d-flex ${isSender ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                                    {!isSender && (
                                      <img 
                                        src={getParticipantInfo(currentConversation).avatar} 
                                        alt={getParticipantInfo(currentConversation).name} 
                                        className="rounded-circle me-2 align-self-end" 
                                        width="32" 
                                        height="32"
                                        style={{ objectFit: 'cover' }}
                                      />
                                    )}
                                    <div 
                                      className={`message ${isSender ? 'message-sent' : 'message-received'}`}
                                      style={{ maxWidth: '75%' }}
                                    >
                                      <div className="message-content">
                                        {message.content}
                                      </div>
                                      <div className={`message-meta d-flex align-items-center ${isSender ? 'justify-content-end' : 'justify-content-start'} mt-1`}>
                                        <small className="text-muted me-2">
                                          {formatTime(message.timestamp)}
                                        </small>
                                        {isSender && (
                                          <small className="text-primary">
                                            <CheckCircleFill size={12} />
                                          </small>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            <div ref={messagesEndRef} />
                          </div>
                        ) : (
                          <div className="text-center py-5">
                            <ChatDots size={48} className="text-muted mb-3" />
                            <p className="mb-0">No messages yet. Start the conversation!</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Message Input */}
                      <div className="p-3 border-top">
                        <Form onSubmit={handleSendMessage}>
                          <InputGroup>
                            <Button variant="light" className="border">
                              <Paperclip />
                            </Button>
                            <Form.Control
                              type="text"
                              placeholder="Type a message..."
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                            />
                            <Button variant="light" className="border">
                              <EmojiSmile />
                            </Button>
                            <Button variant="primary" type="submit" disabled={!messageText.trim()}>
                              <Send />
                            </Button>
                          </InputGroup>
                        </Form>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center p-5">
                      <ChatDots size={64} className="text-muted mb-3" />
                      <h5>Select a conversation</h5>
                      <p className="text-muted">Choose a conversation from the list to start chatting</p>
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;

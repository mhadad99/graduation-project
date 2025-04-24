import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Tabs, Tab, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { 
  Cash, 
  Star, 
  ChatDots, 
  Briefcase, 
  PeopleFill, 
  CheckCircleFill, 
  ClockFill, 
  ArrowUpRight, 
  FileEarmarkText,
  Bell,
  Calendar3
} from 'react-bootstrap-icons';
import { fetchUserServices, fetchUserProposals } from '../redux/slices/serviceSlice';
import { fetchConversations } from '../redux/slices/chatSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser, userRole, isAuthenticated } = useSelector(state => state.user);
  const { userServices, userProposals, loading: serviceLoading } = useSelector(state => state.service);
  const { conversations, unreadCount } = useSelector(state => state.chat);
  
  // Check for success message from location state (e.g., after service submission)
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || '');
  
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    if (isAuthenticated && currentUser?.id) {
      dispatch(fetchConversations(currentUser.id));
      
      if (userRole === 'freelancer') {
        dispatch(fetchUserServices(currentUser.id));
      } else if (userRole === 'client') {
        dispatch(fetchUserProposals(currentUser.id));
      }
    }
  }, [dispatch, isAuthenticated, currentUser, userRole]);
  
  // Mock data for dashboard stats
  const stats = {
    freelancer: {
      earnings: 1250,
      pendingEarnings: 450,
      completedServices: 8,
      activeServices: 3,
      averageRating: 4.8
    },
    client: {
      totalSpent: 2500,
      activeProjects: 2,
      completedProjects: 5,
      savedFreelancers: 7
    }
  };
  
  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'message',
      content: 'Sarah Johnson sent you a message',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'proposal',
      content: 'Your proposal for "Website Redesign" was accepted',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'service',
      content: 'New review on your "UI/UX Design" service',
      time: '3 days ago',
      read: true
    }
  ];
  
  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Created a new service',
      target: 'Professional Website Development',
      time: '2024-04-20T14:30:00Z'
    },
    {
      id: 2,
      action: 'Received a 5-star rating',
      target: 'UI/UX Design service',
      time: '2024-04-18T09:15:00Z'
    },
    {
      id: 3,
      action: 'Submitted a proposal',
      target: 'E-commerce Website Development',
      time: '2024-04-15T16:45:00Z'
    }
  ];
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Render dashboard based on user role
  const renderDashboard = () => {
    if (userRole === 'freelancer') {
      return renderFreelancerDashboard();
    } else if (userRole === 'client') {
      return renderClientDashboard();
    } else if (userRole === 'admin') {
      return (
        <Alert variant="info">
          <Alert.Heading>Admin Dashboard</Alert.Heading>
          <p>
            Please use the admin panel to manage the platform. 
            <Link to="/admin" className="ms-2 btn btn-sm btn-primary">
              Go to Admin Panel
            </Link>
          </p>
        </Alert>
      );
    }
    
    return (
      <Alert variant="warning">
        <Alert.Heading>Role not recognized</Alert.Heading>
        <p>Your user role is not recognized. Please contact support.</p>
      </Alert>
    );
  };
  
  // Freelancer Dashboard
  const renderFreelancerDashboard = () => {
    return (
      <>
        {/* Success message alert */}
        {successMessage && (
          <Alert 
            variant="success" 
            className="mb-4" 
            dismissible 
            onClose={() => setSuccessMessage('')}
          >
            <Alert.Heading>Success!</Alert.Heading>
            <p className="mb-0">{successMessage}</p>
          </Alert>
        )}
        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-muted">Total Earnings</h6>
                  <Cash size={24} className="text-success" />
                </div>
                <h3 className="mb-0 mt-2 fw-bold">${stats.freelancer.earnings}</h3>
                <div className="mt-3 small text-muted">
                  <span className="text-success fw-bold">${stats.freelancer.pendingEarnings}</span> pending clearance
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-muted">Services</h6>
                  <Briefcase size={24} className="text-primary" />
                </div>
                <h3 className="mb-0 mt-2 fw-bold">{userServices.length || 0}</h3>
                <div className="mt-3 small text-muted">
                  <span className="text-primary fw-bold">{stats.freelancer.activeServices}</span> active services
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-muted">Rating</h6>
                  <Star size={24} className="text-warning" />
                </div>
                <h3 className="mb-0 mt-2 fw-bold">{stats.freelancer.averageRating}</h3>
                <div className="mt-3 small text-muted">
                  Based on <span className="text-warning fw-bold">{currentUser?.numberOfReviews || 0}</span> reviews
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Services and Messages */}
        <Row>
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">My Services</h5>
                  <Link to="/add/service" className="btn btn-sm btn-primary">
                    Add New Service
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                {serviceLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : userServices.length > 0 ? (
                  <ListGroup variant="flush">
                    {userServices.slice(0, 3).map(service => (
                      <ListGroup.Item key={service.id} className="px-0 py-3">
                        <div className="d-flex">
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="rounded me-3" 
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                              <h6 className="mb-1 fw-bold">{service.title}</h6>
                              <Badge bg={service.featured ? 'warning' : 'light'} text={service.featured ? 'dark' : 'dark'}>
                                {service.featured ? 'Featured' : 'Standard'}
                              </Badge>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <Star className="text-warning me-1" size={14} />
                              <small>{service.averageRating} ({service.numberOfReviews} reviews)</small>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="small text-muted">
                                <ClockFill className="me-1" size={12} /> {service.deliveryTime}
                              </div>
                              <h6 className="mb-0 text-success">${service.price}</h6>
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-4">
                    <p className="mb-3">You haven't created any services yet.</p>
                    <Link to="/add/service" className="btn btn-primary">
                      Create Your First Service
                    </Link>
                  </div>
                )}
              </Card.Body>
              {userServices.length > 3 && (
                <Card.Footer className="bg-white text-center">
                  <Link to="/services" className="text-decoration-none">
                    View All Services <ArrowUpRight size={14} />
                  </Link>
                </Card.Footer>
              )}
            </Card>
          </Col>
          
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Recent Messages</h5>
                  {unreadCount > 0 && (
                    <Badge bg="danger" pill>
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                {conversations.length > 0 ? (
                  <ListGroup variant="flush">
                    {conversations.slice(0, 4).map(conversation => (
                      <ListGroup.Item key={conversation.id} className="px-0 py-3 border-bottom">
                        <Link to={`/chat/${conversation.id}`} className="text-decoration-none text-dark">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center">
                              <div className="position-relative">
                                <img 
                                  src="https://i.imgur.com/JFHjdNZ.jpeg" 
                                  alt="User" 
                                  className="rounded-circle me-3" 
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                                />
                                {conversation.unreadCount > 0 && (
                                  <span className="position-absolute top-0 start-0 translate-middle p-1 bg-danger border border-light rounded-circle">
                                    <span className="visually-hidden">New messages</span>
                                  </span>
                                )}
                              </div>
                              <div>
                                <h6 className="mb-1 fw-bold">Sarah Johnson</h6>
                                <p className="mb-0 small text-truncate" style={{ maxWidth: '180px' }}>
                                  {conversation.lastMessage}
                                </p>
                              </div>
                            </div>
                            <small className="text-muted">
                              {new Date(conversation.lastMessageTime).toLocaleDateString()}
                            </small>
                          </div>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-4">
                    <ChatDots size={40} className="text-muted mb-3" />
                    <p className="mb-0">No messages yet</p>
                  </div>
                )}
              </Card.Body>
              <Card.Footer className="bg-white text-center">
                <Link to="/chat" className="text-decoration-none">
                  View All Messages <ArrowUpRight size={14} />
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </>
    );
  };
  
  // Client Dashboard
  const renderClientDashboard = () => {
    return (
      <>
        {/* Success message alert */}
        {successMessage && (
          <Alert 
            variant="success" 
            className="mb-4" 
            dismissible 
            onClose={() => setSuccessMessage('')}
          >
            <Alert.Heading>Success!</Alert.Heading>
            <p className="mb-0">{successMessage}</p>
          </Alert>
        )}
        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-muted">Total Spent</h6>
                  <Cash size={24} className="text-primary" />
                </div>
                <h3 className="mb-0 mt-2 fw-bold">${stats.client.totalSpent}</h3>
                <div className="mt-3 small text-muted">
                  On <span className="text-primary fw-bold">{stats.client.completedProjects}</span> completed projects
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-muted">Active Projects</h6>
                  <Briefcase size={24} className="text-success" />
                </div>
                <h3 className="mb-0 mt-2 fw-bold">{stats.client.activeProjects}</h3>
                <div className="mt-3 small text-muted">
                  <span className="text-success fw-bold">1</span> due this week
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-muted">Proposals</h6>
                  <FileEarmarkText size={24} className="text-info" />
                </div>
                <h3 className="mb-0 mt-2 fw-bold">{userProposals.length || 0}</h3>
                <div className="mt-3 small text-muted">
                  <span className="text-info fw-bold">2</span> new proposals
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-muted">Saved Freelancers</h6>
                  <PeopleFill size={24} className="text-warning" />
                </div>
                <h3 className="mb-0 mt-2 fw-bold">{stats.client.savedFreelancers}</h3>
                <div className="mt-3 small text-muted">
                  <span className="text-warning fw-bold">3</span> with new services
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Proposals and Messages */}
        <Row>
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Recent Proposals</h5>
                  <Link to="/proposals" className="btn btn-sm btn-primary">
                    View All Proposals
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                {serviceLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : userProposals.length > 0 ? (
                  <ListGroup variant="flush">
                    {userProposals.map(proposal => (
                      <ListGroup.Item key={proposal.id} className="px-0 py-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1 fw-bold">{proposal.projectTitle}</h6>
                            <p className="mb-2 small text-muted">{proposal.description.substring(0, 100)}...</p>
                            <div className="d-flex align-items-center">
                              <Badge 
                                bg={
                                  proposal.status === 'accepted' ? 'success' : 
                                  proposal.status === 'rejected' ? 'danger' : 'warning'
                                } 
                                className="me-2"
                              >
                                {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                              </Badge>
                              <small className="text-muted">
                                <ClockFill className="me-1" size={12} /> {proposal.deliveryTime}
                              </small>
                            </div>
                          </div>
                          <div className="text-end">
                            <h5 className="mb-2 text-success">${proposal.price}</h5>
                            <small className="text-muted">{formatDate(proposal.createdAt)}</small>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-4">
                    <FileEarmarkText size={40} className="text-muted mb-3" />
                    <p className="mb-3">You don't have any proposals yet.</p>
                    <Link to="/services" className="btn btn-primary">
                      Browse Services
                    </Link>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Recent Messages</h5>
                  {unreadCount > 0 && (
                    <Badge bg="danger" pill>
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                {conversations.length > 0 ? (
                  <ListGroup variant="flush">
                    {conversations.slice(0, 4).map(conversation => (
                      <ListGroup.Item key={conversation.id} className="px-0 py-3 border-bottom">
                        <Link to={`/chat/${conversation.id}`} className="text-decoration-none text-dark">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center">
                              <div className="position-relative">
                                <img 
                                  src="https://i.imgur.com/6AglEUF.jpeg" 
                                  alt="User" 
                                  className="rounded-circle me-3" 
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                                />
                                {conversation.unreadCount > 0 && (
                                  <span className="position-absolute top-0 start-0 translate-middle p-1 bg-danger border border-light rounded-circle">
                                    <span className="visually-hidden">New messages</span>
                                  </span>
                                )}
                              </div>
                              <div>
                                <h6 className="mb-1 fw-bold">Ayman Samir</h6>
                                <p className="mb-0 small text-truncate" style={{ maxWidth: '180px' }}>
                                  {conversation.lastMessage}
                                </p>
                              </div>
                            </div>
                            <small className="text-muted">
                              {new Date(conversation.lastMessageTime).toLocaleDateString()}
                            </small>
                          </div>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-4">
                    <ChatDots size={40} className="text-muted mb-3" />
                    <p className="mb-0">No messages yet</p>
                  </div>
                )}
              </Card.Body>
              <Card.Footer className="bg-white text-center">
                <Link to="/chat" className="text-decoration-none">
                  View All Messages <ArrowUpRight size={14} />
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </>
    );
  };
  
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, {currentUser?.name || 'User'}!</p>
        </div>
        <div className="d-flex">
          <Button variant="outline-primary" className="me-2">
            <Bell className="me-2" /> Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge bg="danger" className="ms-2" pill>
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </Button>
          <Button variant="primary">
            {userRole === 'freelancer' ? 'Create Service' : 'Post Project'}
          </Button>
        </div>
      </div>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4 custom-tab"
      >
        <Tab eventKey="overview" title="Overview">
          {renderDashboard()}
        </Tab>
        <Tab eventKey="activity" title="Recent Activity">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-4">Your Recent Activities</h5>
              <ListGroup variant="flush">
                {recentActivities.map(activity => (
                  <ListGroup.Item key={activity.id} className="px-0 py-3 border-bottom">
                    <div className="d-flex">
                      <div className="activity-icon me-3">
                        <div className="rounded-circle bg-primary bg-opacity-10 p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          <Calendar3 className="text-primary" />
                        </div>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold">{activity.action}</h6>
                        <p className="mb-0 small text-muted">{activity.target}</p>
                      </div>
                      <div className="ms-auto text-end">
                        <small className="text-muted">{formatDate(activity.time)}</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="notifications" title={
          <span>
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge bg="danger" className="ms-2" pill>
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </span>
        }>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Notifications</h5>
                <Button variant="link" className="text-decoration-none p-0">
                  Mark all as read
                </Button>
              </div>
              <ListGroup variant="flush">
                {notifications.map(notification => (
                  <ListGroup.Item 
                    key={notification.id} 
                    className={`px-0 py-3 border-bottom ${!notification.read ? 'bg-light bg-opacity-50' : ''}`}
                  >
                    <div className="d-flex">
                      <div className="notification-icon me-3">
                        <div 
                          className={`rounded-circle p-2 d-flex align-items-center justify-content-center`} 
                          style={{ 
                            width: '40px', 
                            height: '40px',
                            backgroundColor: notification.type === 'message' 
                              ? 'rgba(37, 99, 235, 0.1)' 
                              : notification.type === 'proposal' 
                                ? 'rgba(16, 185, 129, 0.1)' 
                                : 'rgba(245, 158, 11, 0.1)'
                          }}
                        >
                          {notification.type === 'message' ? (
                            <ChatDots className="text-primary" />
                          ) : notification.type === 'proposal' ? (
                            <CheckCircleFill className="text-success" />
                          ) : (
                            <Star className="text-warning" />
                          )}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1">{notification.content}</p>
                        <small className="text-muted">{notification.time}</small>
                      </div>
                      {!notification.read && (
                        <div className="ms-2">
                          <Badge bg="primary" pill>New</Badge>
                        </div>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;

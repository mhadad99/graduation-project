import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  CheckCircleFill, 
  XCircleFill, 
  ClockFill, 
  Cash, 
  Calendar, 
  PencilSquare, 
  Trash, 
  Plus, 
  Filter 
} from 'react-bootstrap-icons';

const Proposals = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  
  const [proposals, setProposals] = useState([
    {
      id: 1,
      userId: 1,
      clientId: 2,
      projectTitle: "Company Website Redesign",
      description: "Proposal for redesigning the TechStart company website with modern design and improved functionality",
      price: 1200,
      deliveryTime: "14 days",
      status: "pending",
      createdAt: "2024-04-01T12:00:00Z"
    },
    {
      id: 2,
      userId: 1,
      clientId: 3,
      projectTitle: "E-commerce Mobile App",
      description: "Development of a mobile app for an existing e-commerce platform with product browsing, cart, and checkout functionality",
      price: 2500,
      deliveryTime: "30 days",
      status: "accepted",
      createdAt: "2024-03-15T12:00:00Z"
    },
    {
      id: 3,
      userId: 1,
      clientId: 4,
      projectTitle: "Blog Website",
      description: "Creating a blog website with content management system for a lifestyle blogger",
      price: 800,
      deliveryTime: "10 days",
      status: "rejected",
      createdAt: "2024-03-05T12:00:00Z"
    }
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProposal, setNewProposal] = useState({
    projectTitle: '',
    description: '',
    price: '',
    deliveryTime: ''
  });
  const [filter, setFilter] = useState('all');
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Handle input change for new proposal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProposal(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add new proposal
  const handleAddProposal = () => {
    const newItem = {
      id: Date.now(),
      userId: currentUser?.id || 1,
      clientId: 2, // Mock client ID
      ...newProposal,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setProposals(prev => [newItem, ...prev]);
    setNewProposal({
      projectTitle: '',
      description: '',
      price: '',
      deliveryTime: ''
    });
    setShowCreateModal(false);
  };
  
  // Filter proposals
  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    return proposal.status === filter;
  });
  
  // Get badge variant based on status
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };
  
  // Get icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <ClockFill className="me-1" />;
      case 'accepted': return <CheckCircleFill className="me-1" />;
      case 'rejected': return <XCircleFill className="me-1" />;
      default: return null;
    }
  };
  
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold mb-0">Proposals</h2>
            <Button 
              variant="primary" 
              className="d-flex align-items-center"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="me-2" /> Create Proposal
            </Button>
          </div>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Filter size={20} className="text-muted" />
                </div>
                <div className="d-flex">
                  <Button 
                    variant={filter === 'all' ? 'primary' : 'light'} 
                    className="me-2"
                    onClick={() => setFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={filter === 'pending' ? 'warning' : 'light'} 
                    className="me-2"
                    onClick={() => setFilter('pending')}
                  >
                    Pending
                  </Button>
                  <Button 
                    variant={filter === 'accepted' ? 'success' : 'light'} 
                    className="me-2"
                    onClick={() => setFilter('accepted')}
                  >
                    Accepted
                  </Button>
                  <Button 
                    variant={filter === 'rejected' ? 'danger' : 'light'} 
                    onClick={() => setFilter('rejected')}
                  >
                    Rejected
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {filteredProposals.length > 0 ? (
        <Row>
          {filteredProposals.map(proposal => (
            <Col xs={12} className="mb-3" key={proposal.id}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="d-flex align-items-center mb-2">
                        <h5 className="fw-bold mb-0">{proposal.projectTitle}</h5>
                        <Badge 
                          bg={getBadgeVariant(proposal.status)} 
                          className="ms-3"
                        >
                          {getStatusIcon(proposal.status)} {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-muted mb-3">{proposal.description}</p>
                      <div className="d-flex flex-wrap">
                        <div className="me-4 mb-2">
                          <Cash className="text-muted me-1" /> 
                          <span className="fw-bold text-success">${proposal.price}</span>
                        </div>
                        <div className="me-4 mb-2">
                          <ClockFill className="text-muted me-1" /> 
                          <span>{proposal.deliveryTime}</span>
                        </div>
                        <div className="mb-2">
                          <Calendar className="text-muted me-1" /> 
                          <span>{formatDate(proposal.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      {proposal.status === 'pending' && (
                        <>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            <PencilSquare className="me-1" /> Edit
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <Trash className="me-1" /> Delete
                          </Button>
                        </>
                      )}
                      {proposal.status === 'accepted' && (
                        <Button variant="outline-primary" size="sm">
                          View Project
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <div className="mb-3">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 3V7C13 8.10457 13.8954 9 15 9H19" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h5>No proposals found</h5>
            <p className="text-muted mb-3">
              {filter === 'all' 
                ? "You haven't created any proposals yet." 
                : `You don't have any ${filter} proposals.`}
            </p>
            {filter === 'all' && (
              <Button 
                variant="primary"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="me-2" /> Create Your First Proposal
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
      
      {/* Create Proposal Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                name="projectTitle"
                value={newProposal.projectTitle}
                onChange={handleInputChange}
                placeholder="Enter project title"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newProposal.description}
                onChange={handleInputChange}
                placeholder="Describe your proposal"
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={newProposal.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryTime"
                    value={newProposal.deliveryTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 7 days"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddProposal}
            disabled={!newProposal.projectTitle || !newProposal.description || !newProposal.price || !newProposal.deliveryTime}
          >
            Create Proposal
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Proposals;

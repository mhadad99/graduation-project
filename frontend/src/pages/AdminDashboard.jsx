import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Alert, Tabs, Tab, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchServices, updateService } from '../redux/slices/serviceSlice';
import { fetchUsers } from '../redux/slices/userSlice';
import { FiCheck, FiX, FiEye, FiEdit } from 'react-icons/fi';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, userRole, isAuthenticated, users } = useSelector(state => state.user);
  const { services, loading: serviceLoading } = useSelector(state => state.service);
  
  // State for filtering and modals
  const [activeTab, setActiveTab] = useState('pending');
  const [filteredServices, setFilteredServices] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  
  // Check if user is admin
  useEffect(() => {
    if (isAuthenticated && currentUser?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, currentUser, navigate]);
  
  // Fetch all services and users
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUsers());
  }, [dispatch]);
  
  // Filter services based on active tab
  useEffect(() => {
    if (!services) return;
    
    let result = [];
    
    switch (activeTab) {
      case 'pending':
        result = services.filter(service => service.status === 'pending');
        break;
      case 'active':
        result = services.filter(service => service.status === 'active');
        break;
      case 'rejected':
        result = services.filter(service => service.status === 'rejected');
        break;
      default:
        result = services;
        break;
    }
    
    setFilteredServices(result);
  }, [services, activeTab]);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Handle service approval
  const handleApproveService = async (serviceId) => {
    try {
      const result = await dispatch(updateService({
        id: serviceId,
        status: 'active',
        adminReviewed: true
      })).unwrap();
      setActionSuccess(`Service "${result.title}" has been approved and is now active.`);
      setTimeout(() => setActionSuccess(''), 5000);
    } catch (error) {
      console.error("Approve error:", error); // Add this line
      setActionError('Failed to approve service. Please try again.');
      setTimeout(() => setActionError(''), 5000);
    }
  };
  
  // Handle service rejection
  const handleRejectService = async () => {
    if (!currentService) return;
    
    try {
      const result = await dispatch(updateService({
        id: currentService.id,
        status: 'rejected',
        adminReviewed: true,
        rejectionReason: rejectionReason
      })).unwrap();
      
      setShowRejectModal(false);
      setRejectionReason('');
      setActionSuccess(`Service "${result.title}" has been rejected.`);
      setTimeout(() => setActionSuccess(''), 5000);
    } catch (error) {
      setActionError('Failed to reject service. Please try again.');
      setTimeout(() => setActionError(''), 5000);
    }
  };
  
  // View service details
  const handleViewService = (service) => {
    setCurrentService(service);
    setShowViewModal(true);
  };
  
  // Open rejection modal
  const handleOpenRejectModal = (service) => {
    setCurrentService(service);
    setShowRejectModal(true);
  };
  
  // Get user name by ID
  const getUserName = (userId) => {
    const user = users?.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };
  
  // Render service status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };
  
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Admin Dashboard</h2>
          <p className="text-muted">Manage services, users, and platform settings</p>
        </Col>
      </Row>
      
      {actionSuccess && (
        <Alert variant="success" dismissible onClose={() => setActionSuccess('')}>
          {actionSuccess}
        </Alert>
      )}
      
      {actionError && (
        <Alert variant="danger" dismissible onClose={() => setActionError('')}>
          {actionError}
        </Alert>
      )}
      
      <Row>
        <Col md={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Services</h5>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-primary">
                  <h2 className="mb-0">{services?.length || 0}</h2>
                  <small>Total Services</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Pending</h5>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-warning">
                  <h2 className="mb-0">{services?.filter(s => s.status === 'pending').length || 0}</h2>
                  <small>Awaiting Review</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Active</h5>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-success">
                  <h2 className="mb-0">{services?.filter(s => s.status === 'active').length || 0}</h2>
                  <small>Live Services</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Users</h5>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-info">
                  <h2 className="mb-0">{users?.length || 0}</h2>
                  <small>Registered Users</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="shadow-sm">
        <Card.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="pending" title="Pending Services">
              <h5 className="mb-3">Services Awaiting Review</h5>
            </Tab>
            <Tab eventKey="active" title="Active Services">
              <h5 className="mb-3">Active Services</h5>
            </Tab>
            <Tab eventKey="rejected" title="Rejected Services">
              <h5 className="mb-3">Rejected Services</h5>
            </Tab>
          </Tabs>
          
          {serviceLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading services...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <Alert variant="info">
              No {activeTab} services found.
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map(service => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.title}</td>
                    <td>{getUserName(service.userId)}</td>
                    <td>${service.price}</td>
                    <td>{formatDate(service.createdAt)}</td>
                    <td>{renderStatusBadge(service.status)}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-1"
                        onClick={() => handleViewService(service)}
                      >
                        <FiEye />
                      </Button>
                      
                      {service.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline-success" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleApproveService(service.id)}
                          >
                            <FiCheck />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleOpenRejectModal(service)}
                          >
                            <FiX />
                          </Button>
                        </>
                      )}
                      
                      {service.status === 'active' && (
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleOpenRejectModal(service)}
                        >
                          <FiX />
                        </Button>
                      )}
                      
                      {service.status === 'rejected' && (
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleApproveService(service.id)}
                        >
                          <FiCheck />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      {/* View Service Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Service Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentService && (
            <Row>
              <Col md={6}>
                <img 
                  src={currentService.image} 
                  alt={currentService.title} 
                  className="img-fluid mb-3 rounded"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              </Col>
              <Col md={6}>
                <h4>{currentService.title}</h4>
                <p className="text-muted">
                  By {getUserName(currentService.userId)} • 
                  {renderStatusBadge(currentService.status)}
                </p>
                <p><strong>Price:</strong> ${currentService.price}</p>
                <p><strong>Delivery Time:</strong> {currentService.deliveryTime}</p>
                <p><strong>Created:</strong> {formatDate(currentService.createdAt)}</p>
                <div>
                  <strong>Tags:</strong>{' '}
                  {currentService.tags?.map((tag, index) => (
                    <Badge key={index} bg="secondary" className="me-1">{tag}</Badge>
                  ))}
                </div>
              </Col>
              <Col xs={12} className="mt-3">
                <h5>Description</h5>
                <p>{currentService.longDescription || currentService.description}</p>
              </Col>
              {currentService.rejectionReason && (
                <Col xs={12} className="mt-3">
                  <Alert variant="danger">
                    <strong>Rejection Reason:</strong> {currentService.rejectionReason}
                  </Alert>
                </Col>
              )}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
          {currentService && currentService.status === 'pending' && (
            <>
              <Button 
                variant="success" 
                onClick={() => {
                  handleApproveService(currentService.id);
                  setShowViewModal(false);
                }}
              >
                Approve
              </Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  setShowViewModal(false);
                  handleOpenRejectModal(currentService);
                }}
              >
                Reject
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      
      {/* Reject Service Modal */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentService && (
            <>
              <p>You are about to reject the service: <strong>{currentService.title}</strong></p>
              <Form.Group className="mb-3">
                <Form.Label>Reason for Rejection</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a reason for rejection"
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleRejectService}
            disabled={!rejectionReason.trim()}
          >
            Reject Service
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;

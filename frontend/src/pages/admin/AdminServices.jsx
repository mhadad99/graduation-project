import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Alert, Spinner, Modal, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices, updateService } from '../../redux/slices/serviceSlice';
import { Search, CheckCircleFill, XCircleFill, Trash, Eye, PencilSquare } from 'react-bootstrap-icons';
import api from '../../api/axiosConfig';

const AdminServices = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector(state => state.service);
  
  // Local state
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  const [localLoading, setLocalLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  
  // Mock data for fallback
  const mockServices = [
    { 
      id: 1, 
      title: 'Web Development', 
      description: 'Professional web development services using modern technologies', 
      category: 'Development', 
      price: 500, 
      status: 'active', 
      createdAt: '2023-01-20',
      userId: 1,
      userName: 'John Doe',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
    },
    { 
      id: 2, 
      title: 'Logo Design', 
      description: 'Creative and professional logo design for your brand', 
      category: 'Design', 
      price: 200, 
      status: 'active', 
      createdAt: '2023-02-15',
      userId: 2,
      userName: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1626785774573-354056afd6fc'
    },
    { 
      id: 3, 
      title: 'Content Writing', 
      description: 'High-quality content writing for blogs and websites', 
      category: 'Writing', 
      price: 150, 
      status: 'pending', 
      createdAt: '2023-03-25',
      userId: 3,
      userName: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a'
    },
    { 
      id: 4, 
      title: 'SEO Optimization', 
      description: 'Improve your website ranking with our SEO services', 
      category: 'Marketing', 
      price: 300, 
      status: 'active', 
      createdAt: '2023-04-10',
      userId: 4,
      userName: 'Sarah Williams',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0'
    },
    { 
      id: 5, 
      title: 'Mobile App Development', 
      description: 'Native and cross-platform mobile app development', 
      category: 'Development', 
      price: 800, 
      status: 'rejected', 
      createdAt: '2023-05-05',
      userId: 5,
      userName: 'David Brown',
      rejectionReason: 'Service description is too vague',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3'
    },
    { 
      id: 6, 
      title: 'UI/UX Design', 
      description: 'User-centered design for websites and applications', 
      category: 'Design', 
      price: 400, 
      status: 'pending', 
      createdAt: '2023-06-18',
      userId: 6,
      userName: 'Emily Davis',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d'
    },
    { 
      id: 7, 
      title: 'Social Media Marketing', 
      description: 'Grow your brand with effective social media strategies', 
      category: 'Marketing', 
      price: 350, 
      status: 'active', 
      createdAt: '2023-07-22',
      userId: 7,
      userName: 'Alex Wilson',
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf'
    },
    { 
      id: 8, 
      title: 'Video Editing', 
      description: 'Professional video editing for all your needs', 
      category: 'Multimedia', 
      price: 250, 
      status: 'pending', 
      createdAt: '2023-08-30',
      userId: 8,
      userName: 'Olivia Taylor',
      image: 'https://images.unsplash.com/photo-1574717024453-4b799315345d'
    }
  ];
  
  // Apply search filter
  const applySearchFilter = (services, term) => {
    if (!term || term.trim() === '') return services;
    
    const searchTerm = term.trim().toLowerCase();
    return services.filter(service => {
      // Check title
      if (service.title && service.title.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Check description
      if (service.description && service.description.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Check tags
      if (service.tags && Array.isArray(service.tags)) {
        for (const tag of service.tags) {
          if (tag.toLowerCase().includes(searchTerm)) {
            return true;
          }
        }
      }
      
      // Check provider name
      if (service.userName && service.userName.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      return false;
    });
  };

  // Apply category filter
  const applyCategoryFilter = (services, category) => {
    if (!category || category === 'all') return services;
    
    return services.filter(service => {
      // Check category field
      if (service.category === category) {
        return true;
      }
      
      // Check tags array
      if (service.tags && Array.isArray(service.tags)) {
        return service.tags.includes(category);
      }
      
      return false;
    });
  };

  // Apply status filter
  const applyStatusFilter = (services, status) => {
    if (!status || status === 'all') {
      // Default: show all non-deleted services
      return services.filter(service => !service.deleted);
    }
    
    if (status === 'deleted') {
      // Show only deleted services
      return services.filter(service => service.deleted === true);
    }
    
    // Filter by specific status (and not deleted)
    return services.filter(service => 
      service.status === status && !service.deleted
    );
  };

  // Fetch services data
  useEffect(() => {
    setLocalLoading(true);
    
    const fetchData = async () => {
      try {
        // Try to fetch from API first
        let servicesData = [];
        try {
          console.log('Fetching services from API...');
          const response = await api.get('/services');
          servicesData = response.data;
          console.log('Successfully fetched services:', servicesData.length);
          
          // Process services to ensure they have a category field
          servicesData = servicesData.map(service => {
            // If service has no category but has tags, use the first tag as category
            if (!service.category && service.tags && service.tags.length > 0) {
              return { ...service, category: service.tags[0] };
            }
            return service;
          });
          
          // Extract unique categories
          const uniqueCategories = [...new Set(
            servicesData
              .map(service => service.category || (service.tags && service.tags.length > 0 ? service.tags[0] : null))
              .filter(Boolean)
          )];
          console.log('Extracted categories:', uniqueCategories);
          setCategories(uniqueCategories);
        } catch (err) {
          console.warn('Error fetching services from API, using mock data:', err.message);
          servicesData = mockServices;
          
          // Extract unique categories from mock data
          const uniqueCategories = [...new Set(mockServices.map(service => service.category))].filter(Boolean);
          setCategories(uniqueCategories);
        }
        
        // Also dispatch Redux action
        dispatch(fetchServices());
        
        // Set filtered services
        setFilteredServices(servicesData);
        setLocalLoading(false);
      } catch (err) {
        console.error('Error in service data processing:', err);
        setActionError('Failed to load services data. Please try again.');
        setFilteredServices(mockServices);
        setLocalLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch]); // Only run on mount and when dispatch changes
  
  // Filter and sort services when dependencies change
  useEffect(() => {
    console.log("Filter triggered with:", {
      searchTerm,
      selectedCategory,
      selectedStatus,
      servicesCount: services?.length || 0,
      categoriesAvailable: categories
    });
    
    if (!services || services.length === 0) {
      console.log("No services available to filter");
      return;
    }
    
    try {
      // Start with all services
      let filtered = [...services];
      console.log("Starting with services count:", filtered.length);
      
      // Apply filters in sequence
      filtered = applySearchFilter(filtered, searchTerm);
      console.log("After search filter:", filtered.length);
      
      filtered = applyCategoryFilter(filtered, selectedCategory);
      console.log("After category filter:", filtered.length);
      
      filtered = applyStatusFilter(filtered, selectedStatus);
      console.log("After status filter:", filtered.length);
      
      // Sort by creation date (newest first)
      filtered.sort((a, b) => {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
      
      console.log("Final filtered services count:", filtered.length);
      setFilteredServices(filtered);
    } catch (error) {
      console.error("Error in filtering services:", error);
      // Fallback to showing all services
      setFilteredServices(services.filter(service => !service.deleted));
    }
  }, [services, searchTerm, selectedCategory, selectedStatus]);
  
  // Handle status change
  const handleStatusChange = async (serviceId, newStatus, rejectionReason = '') => {
    try {
      setActionSuccess('');
      setActionError('');
      
      // Find service
      const service = filteredServices.find(s => s.id === serviceId);
      if (!service) {
        setActionError('Service not found');
        return;
      }
      
      // Prepare update data
      const updateData = { status: newStatus };
      if (newStatus === 'rejected' && rejectionReason) {
        updateData.rejectionReason = rejectionReason;
      }
      
      // Update local state first for immediate UI feedback
      setFilteredServices(prev => 
        prev.map(s => s.id === serviceId ? { ...s, ...updateData } : s)
      );
      
      // Update service in Redux - this will handle both API and offline mode
      const result = await dispatch(updateService({ 
        id: serviceId, 
        ...updateData 
      })).unwrap().catch(error => {
        console.warn('Redux update failed, but UI is already updated:', error);
        return { success: false, error };
      });
      
      if (result && !result.error) {
        setActionSuccess(`Service "${service.title}" status changed to ${newStatus}`);
      } else {
        // Still show success message but indicate offline mode
        setActionSuccess(`Service "${service.title}" status changed to ${newStatus} (offline mode)`);
      }
      
      // Close modals if open
      if (showDeleteModal) {
        setShowDeleteModal(false);
      }
      
      if (showRejectModal) {
        setShowRejectModal(false);
        setRejectionReason('');
      }
    } catch (err) {
      console.error('Error in service status change process:', err);
      setActionError(`An error occurred: ${err.message || 'Unknown error'}`);
    }
  };
  
  // Handle service deletion (soft delete)
  const handleDeleteService = async (serviceId) => {
    try {
      setActionSuccess('');
      setActionError('');
      
      // Find service
      const service = filteredServices.find(s => s.id === serviceId);
      if (!service) {
        setActionError('Service not found');
        return;
      }
      
      // Update local state first for immediate UI feedback
      setFilteredServices(prev => 
        prev.map(s => s.id === serviceId ? { ...s, deleted: true } : s)
      );
      
      // Update service in Redux - this will handle both API and offline mode
      const result = await dispatch(updateService({ 
        id: serviceId, 
        deleted: true 
      })).unwrap().catch(error => {
        console.warn('Redux update failed, but UI is already updated:', error);
        return { success: false, error };
      });
      
      if (result && !result.error) {
        setActionSuccess(`Service "${service.title}" has been deleted`);
      } else {
        // Still show success message but indicate offline mode
        setActionSuccess(`Service "${service.title}" has been deleted (offline mode)`);
      }
      
      // Close delete modal
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting service:', err);
      setActionError(`An error occurred: ${err.message || 'Unknown error'}`);
    }
  };
  
  // Handle view service
  const handleViewService = (service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };
  
  // Handle delete (soft delete)
  const handleDelete = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };
  
  // Handle reject
  const handleReject = (service) => {
    setSelectedService(service);
    setRejectionReason('');
    setShowRejectModal(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (selectedService) {
      handleDeleteService(selectedService.id);
    }
  };
  
  // Confirm reject
  const confirmReject = () => {
    if (selectedService && rejectionReason.trim()) {
      handleStatusChange(selectedService.id, 'rejected', rejectionReason);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    console.log("Resetting all filters");
    // Reset filter inputs
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    
    // Just reset to original non-deleted services
    if (services && services.length > 0) {
      const nonDeletedServices = services.filter(service => !service.deleted);
      console.log("Reset to non-deleted services:", nonDeletedServices.length);
      setFilteredServices(nonDeletedServices);
    }
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      case 'deleted':
        return <Badge bg="dark">Deleted</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  
  // Format price
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h2 className="mb-4">Service Management</h2>
              
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
              
              <Row className="mb-4">
                <Col md={4}>
                  <InputGroup>
                    <InputGroup.Text>
                      <Search />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                
                <Col md={2}>
                  <Form.Select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Col>
                
                <Col md={2}>
                  <Form.Select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="rejected">Rejected</option>
                    <option value="deleted">Deleted</option>
                  </Form.Select>
                </Col>
                
                <Col md={1}>
                  <Button variant="outline-secondary" onClick={resetFilters}>
                    Reset
                  </Button>
                </Col>
              </Row>
              
              {localLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading services...</p>
                </div>
              ) : filteredServices.length === 0 ? (
                <Alert variant="info">
                  No services found matching the current filters.
                </Alert>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Service</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Provider</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredServices.map(service => (
                        <tr key={service.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded overflow-hidden me-3" 
                                style={{ width: '50px', height: '40px', flexShrink: 0 }}
                              >
                                <img 
                                  src={service.image || 'https://via.placeholder.com/150?text=No+Image'} 
                                  alt={service.title} 
                                  className="w-100 h-100 object-fit-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                  }}
                                />
                              </div>
                              <div>
                                <p className="fw-bold mb-0">{service.title}</p>
                                <small className="text-muted">{service.description?.substring(0, 30)}...</small>
                              </div>
                            </div>
                          </td>
                          <td>{service.category || 'Uncategorized'}</td>
                          <td>{formatPrice(service.price || 0)}</td>
                          <td>{service.userName || `User #${service.userId}`}</td>
                          <td>{getStatusBadge(service.status)}</td>
                          <td>{new Date(service.createdAt || 0).toLocaleDateString()}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handleViewService(service)}
                                title="View Service"
                              >
                                <Eye />
                              </Button>
                              
                              {service.status !== 'active' && service.status !== 'deleted' && (
                                <Button 
                                  variant="outline-success" 
                                  size="sm"
                                  onClick={() => handleStatusChange(service.id, 'active')}
                                  title="Approve Service"
                                >
                                  <CheckCircleFill />
                                </Button>
                              )}
                              
                              {service.status !== 'rejected' && service.status !== 'deleted' && (
                                <Button 
                                  variant="outline-warning" 
                                  size="sm"
                                  onClick={() => handleReject(service)}
                                  title="Reject Service"
                                >
                                  <XCircleFill />
                                </Button>
                              )}
                              
                              {service.status !== 'deleted' && (
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => handleDelete(service)}
                                  title="Delete Service"
                                >
                                  <Trash />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              
              <div className="mt-3 text-muted">
                <small>Showing {filteredServices.length} services</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* View Service Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Service Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <Row>
              <Col md={5}>
                <div className="rounded overflow-hidden mb-3">
                  <Image 
                    src={selectedService.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={selectedService.title}
                    fluid
                    className="w-100"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                </div>
              </Col>
              <Col md={7}>
                <h3>{selectedService.title}</h3>
                <p className="text-muted">{selectedService.description}</p>
                
                <div className="mb-3">
                  <strong>Category:</strong> {selectedService.category || 'Uncategorized'}
                </div>
                
                <div className="mb-3">
                  <strong>Price:</strong> {formatPrice(selectedService.price || 0)}
                </div>
                
                <div className="mb-3">
                  <strong>Provider:</strong> {selectedService.userName || `User #${selectedService.userId}`}
                </div>
                
                <div className="mb-3">
                  <strong>Status:</strong> {getStatusBadge(selectedService.status)}
                </div>
                
                <div className="mb-3">
                  <strong>Created:</strong> {new Date(selectedService.createdAt || 0).toLocaleDateString()}
                </div>
                
                {selectedService.status === 'rejected' && selectedService.rejectionReason && (
                  <Alert variant="danger">
                    <strong>Rejection Reason:</strong> {selectedService.rejectionReason}
                  </Alert>
                )}
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
          {selectedService && selectedService.status !== 'active' && selectedService.status !== 'deleted' && (
            <Button 
              variant="success" 
              onClick={() => {
                handleStatusChange(selectedService.id, 'active');
                setShowViewModal(false);
              }}
            >
              Approve Service
            </Button>
          )}
          {selectedService && selectedService.status !== 'rejected' && selectedService.status !== 'deleted' && (
            <Button 
              variant="warning" 
              onClick={() => {
                setShowViewModal(false);
                handleReject(selectedService);
              }}
            >
              Reject Service
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the service <strong>{selectedService?.title}</strong>?
          <p className="text-muted mt-2">
            This will mark the service as deleted. It will no longer be visible to users.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Reject Service Modal */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to reject the service <strong>{selectedService?.title}</strong>.</p>
          <Form.Group className="mb-3">
            <Form.Label>Rejection Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="warning" 
            onClick={confirmReject}
            disabled={!rejectionReason.trim()}
          >
            Reject Service
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminServices;

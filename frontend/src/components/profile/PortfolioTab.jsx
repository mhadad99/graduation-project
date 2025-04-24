import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  Modal, 
  Form,
  Alert
} from 'react-bootstrap';
import { 
  Plus, 
  Trash, 
  Link45deg, 
  Collection 
} from 'react-bootstrap-icons';

const PortfolioTab = ({ portfolioItems = [], isMyProfile, isLoading, onAddItem, onDeleteItem }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    tags: ''
  });
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Handle input change for new portfolio item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPortfolioItem(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add new portfolio item
  const handleAddPortfolioItem = () => {
    // Convert tags string to array
    const tagsArray = newPortfolioItem.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    const newItem = {
      ...newPortfolioItem,
      tags: tagsArray,
    };
    
    onAddItem(newItem);
    
    // Reset form and close modal
    setNewPortfolioItem({
      title: '',
      description: '',
      image: '',
      link: '',
      tags: ''
    });
    setShowAddModal(false);
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading portfolio...</p>
      </div>
    );
  }
  
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold mb-0">Portfolio</h4>
            {isMyProfile && (
              <Button 
                variant="primary" 
                className="d-flex align-items-center"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="me-2" /> Add Project
              </Button>
            )}
          </div>
        </Col>
      </Row>
      
      {portfolioItems.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {portfolioItems.map(item => (
            <Col key={item.id}>
              <Card className="h-100 portfolio-card border-0 shadow-sm">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={item.image} 
                    alt={item.title} 
                    className="portfolio-img"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  {isMyProfile && (
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="position-absolute top-0 end-0 m-2"
                      onClick={() => onDeleteItem(item.id)}
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
                <Card.Body>
                  <Card.Title className="h5 fw-bold">{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.description}</Card.Text>
                  <div className="mb-3">
                    {item.tags.map((tag, idx) => (
                      <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{item.createdAt && formatDate(item.createdAt)}</small>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <Link45deg className="me-1" /> View Project
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <Collection size={48} className="text-muted mb-3" />
            <h5>No portfolio items yet</h5>
            {isMyProfile ? (
              <div>
                <p className="text-muted mb-3">Showcase your work by adding projects to your portfolio</p>
                <Button 
                  variant="primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus className="me-2" /> Add Your First Project
                </Button>
              </div>
            ) : (
              <p className="text-muted">This user hasn't added any portfolio items yet</p>
            )}
          </Card.Body>
        </Card>
      )}
      
      {/* Add Portfolio Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Portfolio Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newPortfolioItem.title}
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
                value={newPortfolioItem.description}
                onChange={handleInputChange}
                placeholder="Enter project description"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={newPortfolioItem.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Project URL</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={newPortfolioItem.link}
                onChange={handleInputChange}
                placeholder="Enter project URL"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Tags (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={newPortfolioItem.tags}
                onChange={handleInputChange}
                placeholder="React, Node.js, MongoDB"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddPortfolioItem}
            disabled={!newPortfolioItem.title || !newPortfolioItem.description || !newPortfolioItem.image}
          >
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PortfolioTab;

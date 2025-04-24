import React from 'react';
import { Row, Col, Alert, Badge, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServiceCard from '../ServiceCard'; // Import the global ServiceCard component

const ServicesTab = ({ services, isLoading, isMyProfile, displayAsProjects = false }) => {
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading {displayAsProjects ? 'projects' : 'services'}...</p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <Alert variant="info">
        {isMyProfile ? 
          `You haven't created any ${displayAsProjects ? 'projects' : 'services'} yet.` : 
          `This user hasn't created any ${displayAsProjects ? 'projects' : 'services'} yet.`
        }
      </Alert>
    );
  }
  
  // If displaying as projects, show a different UI for client projects
  if (displayAsProjects) {
    return (
      <div className="projects-container">
        {services.map((project) => (
          <Card key={project.id} className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-light">
              <h5 className="mb-0">{project.title}</h5>
              <Badge bg={project.status === 'active' ? 'success' : 'secondary'} className="px-3 py-2">
                {project.status || 'Active'}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <p>{project.description}</p>
                  <div className="mb-3">
                    {project.tags && project.tags.map((tag, idx) => (
                      <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mb-3">
                    <strong>Budget:</strong> ${project.price}
                  </div>
                  <div>
                    <strong>Posted:</strong> {new Date(project.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </Col>
                <Col md={4} className="d-flex flex-column justify-content-center align-items-end">
                  <Button 
                    variant="primary" 
                    as={Link} 
                    to={`/service-details/${project.id}`}
                    className="mb-2 w-100"
                  >
                    View Details
                  </Button>
                  {isMyProfile && (
                    <Button 
                      variant="outline-secondary" 
                      as={Link} 
                      to={`/edit-project/${project.id}`}
                      className="w-100"
                    >
                      Edit Project
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

  // Regular service display for freelancers
  return (
    <Row xs={1} md={2} lg={3} className="g-4 mb-4">
      {services.map((service) => (
        <Col key={service.id}>
          <ServiceCard 
            service={service} 
            freelancerId={service.freelancerId || service.userId} 
          />
        </Col>
      ))}
    </Row>
  );
};

export default ServicesTab;

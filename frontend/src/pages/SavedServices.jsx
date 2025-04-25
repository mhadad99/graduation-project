import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../redux/slices/serviceSlice';

const SavedServices = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { services, loading } = useSelector(state => state.service);

  const [savedServices, setSavedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all services if not already loaded
    if (!services.length) {
      dispatch(fetchServices());
    }

    // Fetch user's saved services
    const fetchSavedServices = async () => {
      if (!currentUser || !currentUser.savedServices) {
        setSavedServices([]);
        setIsLoading(false);
        return;
      }
      // Match saved service IDs with loaded services
      const matched = services.filter(service => currentUser.savedServices.includes(service.id));
      setSavedServices(matched);
      setIsLoading(false);
    };

    fetchSavedServices();
  }, [dispatch, services, currentUser]);

  const handleRemoveSaved = (serviceId) => {
    // Implement removal logic as needed
    setSavedServices(prev => prev.filter(service => service.id !== serviceId));
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <Container className="py-5 text-center">
        <h2>Please log in to view your saved services</h2>
        <Link to="/login" className="btn btn-primary mt-3">Log In</Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Saved Services</h2>
      
      {savedServices.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">You haven't saved any services yet</h4>
          <p>Browse services and save the ones you're interested in</p>
          <Link to="/services" className="btn btn-primary mt-3">Browse Services</Link>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {savedServices.map(service => (
            <Col key={service.id}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={service.image} 
                  alt={service.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0 h5">{service.title}</Card.Title>
                    <h5 className="text-primary mb-0">${service.price}</h5>
                  </div>
                  
                  <Card.Text className="text-muted small mb-3">
                    {service.description.length > 100 
                      ? `${service.description.substring(0, 100)}...` 
                      : service.description
                    }
                  </Card.Text>
                  
                  <div className="mb-3">
                    {service.tags.slice(0, 3).map((tag, index) => (
                      <Badge 
                        key={index} 
                        bg="light" 
                        text="dark" 
                        className="me-1 mb-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-auto d-flex justify-content-between">
                    <Link 
                      to={`/services/${service.id}`} 
                      className="btn btn-outline-primary"
                    >
                      View Details
                    </Link>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveSaved(service.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white border-0 text-muted small">
                  <div className="d-flex justify-content-between">
                    <span>Delivery: {service.deliveryTime}</span>
                    <span>★ {service.averageRating} ({service.numberOfReviews})</span>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SavedServices;

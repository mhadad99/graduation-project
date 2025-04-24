import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ServiceDetails({ service }) {
  if (!service) {
    return null;
  }
  
  // Extract YouTube video ID from URL
  const extractYoutubeId = (url) => {
    if (!url) return null;
    
    // Match YouTube URL patterns
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Extract features from the long description
  const generateFeatures = () => {
    if (!service.longDescription) return [];
    
    // Split by periods and filter out empty strings
    return service.longDescription
      .split('.')
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .slice(0, 6); // Limit to 6 features
  };
  
  const features = generateFeatures();
  
  return (
    <Card className="mb-3 p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-semibold mb-0">About this service</h5>
        <div>
          {service.tags && service.tags.map((tag, idx) => (
            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">{tag}</Badge>
          ))}
        </div>
      </div>
      
      <p style={{ whiteSpace: 'pre-line' }}>{service.description}</p>
      
      {service.longDescription && (
        <p style={{ whiteSpace: 'pre-line' }}>{service.longDescription}</p>
      )}
      
      {/* YouTube Video Section */}
      {service.youtubeUrl && (
        <div className="mt-4 mb-4">
          <h6 className="fw-bold mb-3">Service Showcase Video</h6>
          <div className="ratio ratio-16x9" style={{ maxWidth: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <iframe
              src={`https://www.youtube.com/embed/${extractYoutubeId(service.youtubeUrl)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      
      {/* Gallery Images Section */}
      {service.galleryImages && service.galleryImages.length > 0 && (
        <div className="mt-4 mb-4">
          <h6 className="fw-bold mb-3">Gallery</h6>
          <Row className="g-2">
            {service.galleryImages.map((image, index) => (
              <Col xs={6} md={4} key={index}>
                <img 
                  src={image} 
                  alt={`Gallery ${index}`} 
                  className="img-fluid rounded" 
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
      
      {features.length > 0 && (
        <>
          <h6 className="fw-bold mt-4 mb-2">What's included</h6>
          <ListGroup variant="flush">
            {features.map((feature, idx) => (
              <ListGroup.Item key={idx} className="ps-0 border-0 bg-transparent">
                <span className="text-success me-2">&#10003;</span>
                {feature}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      
      <div className="mt-4">
        <h6 className="fw-bold mb-2">Service details</h6>
        <div className="d-flex flex-wrap">
          <div className="me-4 mb-2">
            <small className="text-muted">Price:</small>
            <div className="fw-semibold">${service.price}</div>
          </div>
          <div className="me-4 mb-2">
            <small className="text-muted">Delivery time:</small>
            <div className="fw-semibold">{service.deliveryTime}</div>
          </div>
          <div className="me-4 mb-2">
            <small className="text-muted">Rating:</small>
            <div className="fw-semibold">{service.averageRating ? service.averageRating.toFixed(1) : 'New'} {service.numberOfReviews ? `(${service.numberOfReviews} reviews)` : ''}</div>
          </div>
          <div className="me-4 mb-2">
            <small className="text-muted">Created:</small>
            <div className="fw-semibold">{new Date(service.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Alert, Spinner, Badge } from 'react-bootstrap';

export default function PricingBox({ service }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, userRole } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!service) {
    return null;
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Navigate to chat with this service provider
    navigate(`/chat`);
  };

  return (
    <Card className="shadow-sm p-4 border-0 mb-3" style={{ background: '#f8fffa' }}>
      <h4 className="fw-bold mb-3">${service.price} <span className="fw-normal fs-6 text-secondary">USD</span></h4>
      <div className="mb-3 text-muted" style={{ fontSize: '1.01rem' }}>Standard Package</div>
      <div className="d-flex align-items-center mb-3">
        <Badge bg="info" className="me-2">Delivery: {service.deliveryTime}</Badge>
        {service.featured && <Badge bg="success">Featured</Badge>}
      </div>
      <ul className="mb-3 ps-3">
        {service.longDescription && service.longDescription.split('.').slice(0, 3).map((point, index) => (
          point.trim() && <li key={index}>{point.trim()}.</li>
        ))}
      </ul>

      {success && (
        <Alert variant="success" className="mb-3 py-2">
          Service added to cart successfully!
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mb-3 py-2">
          {error}
        </Alert>
      )}

      {userRole === 'client' ? (
        <Button
          variant="success"
          size="lg"
          className="w-100 fw-semibold mb-2"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="ms-2">Processing...</span>
            </>
          ) : (
            <>Add to Cart (${service.price})</>
          )}
        </Button>
      ) : userRole === 'freelancer' ? (
        <Button variant="outline-primary" size="lg" className="w-100 fw-semibold mb-2" disabled>
          You cannot purchase your own service
        </Button>
      ) : (
        <Button
          variant="primary"
          size="lg"
          className="w-100 fw-semibold mb-2"
          onClick={() => navigate('/login')}
        >
          Sign in to purchase
        </Button>
      )}

      <Button
        variant="outline-secondary"
        className="w-100 mb-2"
        onClick={handleContactSeller}
      >
        Contact Seller
      </Button>

      <div className="text-center mt-2 text-secondary" style={{ fontSize: 12 }}>
        Secure payment · {service.deliveryTime} delivery
      </div>
    </Card>
  );
}
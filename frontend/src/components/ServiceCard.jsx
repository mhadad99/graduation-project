import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Image } from 'react-bootstrap';
import { FaStar, FaClock, FaHeart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/slices/userSlice';

const ServiceCard = ({ service, freelancerId }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser, users } = useSelector(state => state.user);
  const [seller, setSeller] = useState(null);
  
  // Format price to 2 decimal places
  const formattedPrice = parseFloat(service.price).toFixed(2);
  
  // Check if the current user is the service owner
  const isOwner = isAuthenticated && currentUser?.id === service.userId;
  
  // Set seller information from props or Redux store
  useEffect(() => {
    // Use freelancerId prop if provided, otherwise use service.userId
    const sellerId = freelancerId || service.userId || service.freelancerId;
    
    if (!sellerId) return;
    
    // Check if we already have the user data in the Redux store
    const existingUser = users?.find(user => user.id === parseInt(sellerId));
    if (existingUser) {
      setSeller(existingUser);
      return;
    }
    
    // Check if this is the current user
    if (currentUser && currentUser.id === parseInt(sellerId)) {
      setSeller(currentUser);
      return;
    }
    
    // Only fetch if we don't have the data and haven't tried before
    const fetchSellerInfo = async () => {
      try {
        const userData = await dispatch(fetchUserProfile(sellerId)).unwrap();
        setSeller(userData);
      } catch (error) {
        console.error('Error fetching seller info:', error);
      }
    };
    
    fetchSellerInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Card className="service-card h-100 shadow-sm border-0 position-relative">
      {service.featured && (
        <Badge 
          bg="warning" 
          text="dark"
          className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded-pill"
        >
          Featured
        </Badge>
      )}
      
      <Link to={`/service-details/${service.id}`} className="text-decoration-none">
        <div className="service-image-container" style={{ height: '180px', overflow: 'hidden' }}>
          <Card.Img 
            variant="top" 
            src={service.image || 'https://i.imgur.com/thdopBi.jpeg'} 
            alt={service.title}
            className="service-image"
            style={{ 
              objectFit: 'cover', 
              height: '100%', 
              width: '100%',
              transition: 'transform 0.3s ease-in-out'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://i.imgur.com/thdopBi.jpeg';
            }}
          />
        </div>
      </Link>
      
      <Card.Body className="d-flex flex-column">
        {/* Seller info */}
        <div className="d-flex align-items-center mb-2">
          <Link to={`/profile/${freelancerId || service.userId || service.freelancerId}`} className="text-decoration-none">
            <div className="d-flex align-items-center">
              {seller?.profileImage ? (
                <Image 
                  src={seller.profileImage} 
                  roundedCircle 
                  width={24} 
                  height={24} 
                  className="me-2" 
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="bg-light rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: 24, height: 24 }}>
                  <FaUser size={12} className="text-secondary" />
                </div>
              )}
              <span className="small text-muted">{seller?.name || 'Freelancer'}</span>
            </div>
          </Link>
        </div>
        
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            {service.tags && service.tags.length > 0 && (
              <Badge bg="primary" className="me-1 mb-2">{service.tags[0]}</Badge>
            )}
          </div>
          <div className="d-flex align-items-center">
            <FaStar className="text-warning me-1" />
            <span className="small">{service.averageRating || '0.0'}</span>
            <span className="text-muted small ms-1">({service.numberOfReviews || 0})</span>
          </div>
        </div>
        
        <Link to={`/service-details/${service.id}`} className="text-decoration-none">
          <Card.Title className="mb-2 service-title" style={{ fontSize: '1rem', color: 'var(--bs-dark)' }}>
            {service.title}
          </Card.Title>
        </Link>
        
        <Card.Text className="small text-muted mb-3 flex-grow-1">
          {service.description && service.description.length > 100
            ? `${service.description.substring(0, 100)}...`
            : service.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex align-items-center">
            <FaClock className="text-muted me-1" size={14} />
            <span className="small text-muted">{service.deliveryTime}</span>
          </div>
          <div className="fw-bold text-primary">
            ${formattedPrice}
          </div>
        </div>
      </Card.Body>
      
      <Card.Footer className="bg-white border-top-0 pt-0">
        <div className="d-grid gap-2">
          {isOwner ? (
            <Link to={`/edit/service/${service.id}`} className="btn btn-outline-primary btn-sm">
              Edit Service
            </Link>
          ) : (
            <Link to={`/service/${service.id}`} className="btn btn-primary btn-sm">
              View Details
            </Link>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ServiceCard;

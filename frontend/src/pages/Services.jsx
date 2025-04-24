import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchServices } from '../redux/slices/serviceSlice';
import { 
  Search, 
  Funnel, 
  Star, 
  StarFill, 
  Heart, 
  Share, 
  Clock, 
  SortDown, 
  Grid, 
  List, 
  LightningCharge 
} from 'react-bootstrap-icons';

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector(state => state.service);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    deliveryTime: [],
    rating: 0,
    categories: []
  });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  
  // Categories for filtering
  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Graphic Design',
    'Content Writing',
    'Digital Marketing',
    'SEO',
    'Video Editing',
    'Animation'
  ];
  
  // Delivery time options
  const deliveryTimeOptions = [
    { value: '1-2', label: '1-2 days' },
    { value: '3-5', label: '3-5 days' },
    { value: '6-10', label: '6-10 days' },
    { value: '10+', label: 'More than 10 days' }
  ];
  
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  
  // Filter services based on search term and filters
  const filteredServices = services.filter(service => {
    // Search term filter
    if (searchTerm && !service.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !service.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Price range filter
    if (service.price < filters.priceRange[0] || service.price > filters.priceRange[1]) {
      return false;
    }
    
    // Rating filter
    if (filters.rating > 0 && service.averageRating < filters.rating) {
      return false;
    }
    
    // Categories filter
    if (filters.categories.length > 0) {
      const hasMatchingCategory = service.tags.some(tag => 
        filters.categories.includes(tag)
      );
      if (!hasMatchingCategory) {
        return false;
      }
    }
    
    // Delivery time filter
    if (filters.deliveryTime.length > 0) {
      // This is a simplified approach - in a real app, you'd have a more precise way to filter by delivery time
      const deliveryDays = parseInt(service.deliveryTime);
      const matchesDeliveryTime = filters.deliveryTime.some(option => {
        if (option === '1-2') return deliveryDays >= 1 && deliveryDays <= 2;
        if (option === '3-5') return deliveryDays >= 3 && deliveryDays <= 5;
        if (option === '6-10') return deliveryDays >= 6 && deliveryDays <= 10;
        if (option === '10+') return deliveryDays > 10;
        return false;
      });
      
      if (!matchesDeliveryTime) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort filtered services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.averageRating - a.averageRating;
      default:
        return 0;
    }
  });
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const handleCategoryToggle = (category) => {
    setFilters(prev => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories: updatedCategories
      };
    });
  };
  
  const handleDeliveryTimeToggle = (option) => {
    setFilters(prev => {
      const updatedDeliveryTime = prev.deliveryTime.includes(option)
        ? prev.deliveryTime.filter(o => o !== option)
        : [...prev.deliveryTime, option];
      
      return {
        ...prev,
        deliveryTime: updatedDeliveryTime
      };
    });
  };
  
  const handlePriceRangeChange = (index, value) => {
    setFilters(prev => {
      const newPriceRange = [...prev.priceRange];
      newPriceRange[index] = value;
      return {
        ...prev,
        priceRange: newPriceRange
      };
    });
  };
  
  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      deliveryTime: [],
      rating: 0,
      categories: []
    });
    setSearchTerm('');
  };
  
  // Render star rating
  const renderStarRating = (rating) => {
    return (
      <div className="d-inline-flex align-items-center">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className="me-1">
            {star <= rating ? (
              <StarFill className="text-warning" size={14} />
            ) : (
              <Star className="text-muted" size={14} />
            )}
          </span>
        ))}
        <span className="ms-1 small text-muted">({rating.toFixed(1)})</span>
      </div>
    );
  };
  
  // Grid view service card
  const ServiceCardGrid = ({ service }) => (
    <Card className="h-100 service-card border-0 shadow-sm">
      {service.featured && (
        <div className="featured-badge">
          <LightningCharge className="me-1" /> Featured
        </div>
      )}
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={service.image}
          alt={service.title}
          className="service-img"
        />
        <div className="service-overlay">
          <Button variant="light" size="sm" className="me-2">
            <Heart className="text-danger" />
          </Button>
          <Button variant="light" size="sm">
            <Share />
          </Button>
        </div>
      </div>
      <Card.Body>
        <div className="d-flex align-items-center mb-2">
          <img
            src="https://i.imgur.com/6AglEUF.jpeg"
            alt="Seller"
            className="rounded-circle me-2"
            width="30"
            height="30"
          />
          <span className="small fw-bold">Ayman Samir</span>
        </div>
        <Card.Title className="h5 fw-bold">
          <Link to={`/services/${service.id}`} className="text-decoration-none text-dark">
            {service.title}
          </Link>
        </Card.Title>
        <Card.Text className="text-muted mb-3">{service.description}</Card.Text>
        <div className="mb-2">
          {renderStarRating(service.averageRating)}
          <span className="ms-2 small text-muted">({service.numberOfReviews} reviews)</span>
        </div>
        <div className="service-tags mb-3">
          {service.tags.map((tag, idx) => (
            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
              {tag}
            </Badge>
          ))}
        </div>
        <hr className="my-3" />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Clock className="text-muted me-1" size={14} />
            <small className="text-muted">{service.deliveryTime}</small>
          </div>
          <div className="text-end">
            <small className="text-muted d-block">Starting from</small>
            <h5 className="text-success mb-0 fw-bold">${service.price}</h5>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-0">
        <Link to={`/services/${service.id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
  
  // List view service card
  const ServiceCardList = ({ service }) => (
    <Card className="mb-3 service-card border-0 shadow-sm">
      <Row className="g-0">
        <Col md={3} className="position-relative">
          {service.featured && (
            <div className="featured-badge" style={{ top: '10px', left: '10px' }}>
              <LightningCharge className="me-1" /> Featured
            </div>
          )}
          <Card.Img
            src={service.image}
            alt={service.title}
            className="h-100"
            style={{ objectFit: 'cover' }}
          />
        </Col>
        <Col md={9}>
          <Card.Body>
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://i.imgur.com/6AglEUF.jpeg"
                alt="Seller"
                className="rounded-circle me-2"
                width="30"
                height="30"
              />
              <span className="small fw-bold">Ayman Samir</span>
            </div>
            <Card.Title className="h5 fw-bold">
              <Link to={`/services/${service.id}`} className="text-decoration-none text-dark">
                {service.title}
              </Link>
            </Card.Title>
            <Card.Text className="text-muted">{service.description}</Card.Text>
            <div className="mb-2">
              {renderStarRating(service.averageRating)}
              <span className="ms-2 small text-muted">({service.numberOfReviews} reviews)</span>
            </div>
            <div className="service-tags mb-3">
              {service.tags.map((tag, idx) => (
                <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Clock className="text-muted me-1" size={14} />
                <small className="text-muted">{service.deliveryTime}</small>
              </div>
              <div className="d-flex align-items-center">
                <div className="text-end me-3">
                  <small className="text-muted d-block">Starting from</small>
                  <h5 className="text-success mb-0 fw-bold">${service.price}</h5>
                </div>
                <Link to={`/services/${service.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
  
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold mb-1">Explore Services</h2>
          <p className="text-muted">Find the perfect service for your project</p>
        </Col>
      </Row>
      
      {/* Search and Filters */}
      <Row className="mb-4">
        <Col md={8} lg={9}>
          <InputGroup className="mb-3">
            <InputGroup.Text className="bg-light border-end-0">
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search for services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-start-0"
            />
            <Button variant="primary">
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col md={4} lg={3} className="d-flex justify-content-end align-items-center">
          <div className="me-3">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-sort" className="d-flex align-items-center">
                <SortDown className="me-2" /> Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item 
                  active={sortBy === 'newest'} 
                  onClick={() => setSortBy('newest')}
                >
                  Newest First
                </Dropdown.Item>
                <Dropdown.Item 
                  active={sortBy === 'oldest'} 
                  onClick={() => setSortBy('oldest')}
                >
                  Oldest First
                </Dropdown.Item>
                <Dropdown.Item 
                  active={sortBy === 'price-low'} 
                  onClick={() => setSortBy('price-low')}
                >
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item 
                  active={sortBy === 'price-high'} 
                  onClick={() => setSortBy('price-high')}
                >
                  Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item 
                  active={sortBy === 'rating'} 
                  onClick={() => setSortBy('rating')}
                >
                  Highest Rated
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="btn-group">
            <Button 
              variant={viewMode === 'grid' ? 'primary' : 'light'} 
              onClick={() => setViewMode('grid')}
            >
              <Grid />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'primary' : 'light'} 
              onClick={() => setViewMode('list')}
            >
              <List />
            </Button>
          </div>
        </Col>
      </Row>
      
      <Row>
        {/* Filters Sidebar */}
        <Col md={3} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Filters</h5>
                <Button variant="link" className="p-0 text-decoration-none" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Price Range Filter */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Price Range</h6>
                <Row className="mb-2">
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 0)}
                    />
                  </Col>
                </Row>
                <Form.Range 
                  min={0}
                  max={1000}
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                  className="mt-2"
                />
              </div>
              
              {/* Delivery Time Filter */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Delivery Time</h6>
                {deliveryTimeOptions.map(option => (
                  <Form.Check
                    key={option.value}
                    type="checkbox"
                    id={`delivery-${option.value}`}
                    label={option.label}
                    checked={filters.deliveryTime.includes(option.value)}
                    onChange={() => handleDeliveryTimeToggle(option.value)}
                    className="mb-2"
                  />
                ))}
              </div>
              
              {/* Rating Filter */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Minimum Rating</h6>
                <div className="d-flex align-items-center">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <Button
                      key={rating}
                      variant={filters.rating === rating ? 'warning' : 'light'}
                      className="me-2 p-1 px-2"
                      onClick={() => handleFilterChange('rating', rating === filters.rating ? 0 : rating)}
                    >
                      {rating} <StarFill size={12} />
                    </Button>
                  ))}
                  {filters.rating > 0 && (
                    <Button 
                      variant="link" 
                      className="p-0 ms-2 text-decoration-none"
                      onClick={() => handleFilterChange('rating', 0)}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Categories Filter */}
              <div>
                <h6 className="fw-bold mb-3">Categories</h6>
                {categories.map(category => (
                  <Form.Check
                    key={category}
                    type="checkbox"
                    id={`category-${category}`}
                    label={category}
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="mb-2"
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Services Grid/List */}
        <Col md={9}>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading services...</p>
            </div>
          ) : sortedServices.length > 0 ? (
            viewMode === 'grid' ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {sortedServices.map(service => (
                  <Col key={service.id}>
                    <ServiceCardGrid service={service} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div>
                {sortedServices.map(service => (
                  <ServiceCardList key={service.id} service={service} />
                ))}
              </div>
            )
          ) : (
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center py-5">
                <Funnel size={48} className="text-muted mb-3" />
                <h4>No services found</h4>
                <p className="text-muted">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Services;

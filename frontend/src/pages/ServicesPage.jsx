import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, InputGroup, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import ServiceCard from '../components/ServiceCard';
import { fetchServices } from '../redux/slices/serviceSlice';

const ServicesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get services from Redux store
  const { services, loading, error } = useSelector(state => state.service);
  
  // Filter states
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories derived from services
  const [categories, setCategories] = useState([]);
  
  // Extract query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    
    if (categoryParam) {
      // Convert URL format (e.g., web-development) to display format (Web Development)
      const formattedCategory = categoryParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setSelectedCategory(formattedCategory);
    } else {
      setSelectedCategory('');
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    } else {
      setSearchTerm('');
    }
  }, [location.search]);
  
  // Fetch services on component mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  
  // Derive unique categories from loaded services
  useEffect(() => {
    if (services && services.length > 0) {
      const uniqueCategories = [...new Set(services.map(s => s.category).filter(Boolean))];
      setCategories(uniqueCategories.map(cat => ({ name: cat, value: cat, id: cat })));
    } else {
      setCategories([]);
    }
  }, [services]);
  
  // Apply filters and sorting
  useEffect(() => {
    if (!services) return;
    
    // Start with only active services
    let result = services.filter(service => service.status === 'active' || !service.status);
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(service => 
        service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(service => {
        // Check if service has tags array
        if (!service.tags || !Array.isArray(service.tags)) {
          return false;
        }
        
        // Check if any tag matches the selected category (case insensitive)
        return service.tags.some(tag => 
          tag.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      });
    }
    
    // Apply price range filter
    if (priceRange.min) {
      result = result.filter(service => service.price >= parseInt(priceRange.min));
    }
    
    if (priceRange.max) {
      result = result.filter(service => service.price <= parseInt(priceRange.max));
    }
    
    // Apply sorting
    const resultCopy = [...result]; // Create a copy to avoid modifying the original during sort
    switch (sortBy) {
      case 'newest':
        resultCopy.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'oldest':
        resultCopy.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case 'price-low':
        resultCopy.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        resultCopy.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        resultCopy.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      default:
        break;
    }
    
    setFilteredServices(resultCopy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, searchTerm, selectedCategory, sortBy, priceRange.min, priceRange.max]);
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Update URL with search params
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) {
      // Convert display format (Web Development) to URL format (web-development)
      const urlCategory = selectedCategory.toLowerCase().replace(/ /g, '-');
      params.set('category', urlCategory);
    }
    
    navigate({
      pathname: '/services',
      search: params.toString()
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
    navigate('/services');
  };
  
  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <Container className="py-5">
      <h1 className="mb-4">Browse Services</h1>
      
      {/* Search and Filter Row */}
      <Row className="mb-4">
        <Col md={8}>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <FaSearch />
              </Button>
              <Button 
                variant="outline-secondary" 
                className="d-md-none"
                onClick={toggleFilters}
              >
                <FaFilter />
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col md={4} className="mt-3 mt-md-0">
          <Form.Select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </Form.Select>
        </Col>
      </Row>
      
      <Row>
        {/* Filters Column - Desktop */}
        <Col md={3} className="d-none d-md-block">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Filters</h5>
                {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
                  <Button 
                    variant="link" 
                    className="p-0 text-decoration-none"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              {/* Categories Filter */}
              <div className="mb-4">
                <h6 className="mb-2">Categories</h6>
                <Form>
                  {categories.map((category, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      id={`category-${index}`}
                      label={`${category.name} `}
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => setSelectedCategory(category.name)}
                      className="mb-2"
                    />
                  ))}
                  {selectedCategory && (
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none"
                      onClick={() => setSelectedCategory('')}
                    >
                      Clear Category
                    </Button>
                  )}
                </Form>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h6 className="mb-2">Price Range</h6>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                      min="0"
                      className="mb-2"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      min="0"
                      className="mb-2"
                    />
                  </Col>
                </Row>
                {(priceRange.min || priceRange.max) && (
                  <Button 
                    variant="link" 
                    className="p-0 text-decoration-none"
                    onClick={() => setPriceRange({ min: '', max: '' })}
                  >
                    Clear Price
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Filters - Mobile */}
        {showFilters && (
          <Col xs={12} className="d-md-none mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Filters</h5>
                  <Button 
                    variant="link" 
                    className="p-0"
                    onClick={toggleFilters}
                  >
                    <FaTimes />
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {/* Categories Filter - Mobile */}
                <div className="mb-4">
                  <h6 className="mb-2">Categories</h6>
                  <Form>
                    {categories.slice(0, 5).map((category, index) => (
                      <Form.Check
                        key={index}
                        type="radio"
                        id={`category-mobile-${index}`}
                        label={`${category.name} `}
                        name="category-mobile"
                        checked={selectedCategory === category.name}
                        onChange={() => {
                          setSelectedCategory(category.name);
                          setShowFilters(false);
                        }}
                        className="mb-2"
                      />
                    ))}
                  </Form>
                </div>
                
                {/* Price Range Filter - Mobile */}
                <div>
                  <h6 className="mb-2">Price Range</h6>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                        min="0"
                        className="mb-2"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                        min="0"
                        className="mb-2"
                      />
                    </Col>
                  </Row>
                </div>
                
                {/* Apply Filters Button - Mobile */}
                <div className="d-grid gap-2 mt-3">
                  <Button 
                    variant="primary"
                    onClick={() => {
                      handleSearch({ preventDefault: () => {} });
                      setShowFilters(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                  {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
                    <Button 
                      variant="outline-secondary"
                      onClick={() => {
                        clearFilters();
                        setShowFilters(false);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
        
        {/* Services Grid */}
        <Col md={showFilters ? 12 : 9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading services...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">
              {error}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-5">
              <h4>No services found</h4>
              <p className="text-muted">Try adjusting your search or filters</p>
              {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
                <Button 
                  variant="outline-primary"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Active Filters */}
              {(selectedCategory || (priceRange.min || priceRange.max)) && (
                <div className="mb-3">
                  <h6>Active Filters:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedCategory && (
                      <Badge 
                        bg="primary" 
                        className="p-2 d-flex align-items-center"
                      >
                        Category: {selectedCategory}
                        <Button 
                          variant="link" 
                          className="p-0 ms-2 text-white" 
                          onClick={() => setSelectedCategory('')}
                        >
                          <FaTimes size={12} />
                        </Button>
                      </Badge>
                    )}
                    
                    {(priceRange.min || priceRange.max) && (
                      <Badge 
                        bg="primary" 
                        className="p-2 d-flex align-items-center"
                      >
                        Price: {priceRange.min || '0'} - {priceRange.max || 'Any'}
                        <Button 
                          variant="link" 
                          className="p-0 ms-2 text-white" 
                          onClick={() => setPriceRange({ min: '', max: '' })}
                        >
                          <FaTimes size={12} />
                        </Button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-muted mb-4">
                Showing {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
              </p>
              
              <Row xs={1} sm={2} lg={3} className="g-4">
                {filteredServices.map(service => (
                  <Col key={service.id}>
                    <ServiceCard service={service} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ServicesPage;

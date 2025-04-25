import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Alert, Spinner } from 'react-bootstrap';
import { FiUpload, FiDollarSign, FiTag, FiList, FiX, FiImage, FiInfo, FiYoutube } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createService, fetchServiceById, updateService, fetchServices } from '../redux/slices/serviceSlice';
import '../styles/CreateService.css';

const CreateService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { isAuthenticated, currentUser } = useSelector(state => state.user);
  const { services, loading, error } = useSelector(state => state.service);
  
  // Ref for file input
  const galleryInputRef = useRef(null);
  
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: [],
    priceFrom: '',
    description: '',
    thumbnailImage: null,
    galleryImages: [],
    youtubeUrl: ''
  });
  
  // State for current tag being entered
  const [currentTag, setCurrentTag] = useState('');
  
  // State for form validation
  const [validated, setValidated] = useState(false);
  
  // State for alerts
  const [showMaxImagesAlert, setShowMaxImagesAlert] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for YouTube video preview
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [youtubeError, setYoutubeError] = useState('');
  
  // State for categories from services
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    // Derive unique categories from loaded services
    if (services && services.length > 0) {
      const uniqueCategories = [...new Set(services.map(s => s.category).filter(Boolean))];
      setCategories(uniqueCategories.map(cat => ({ name: cat, value: cat, id: cat })));
    } else {
      // Optionally fetch all services if not loaded
      dispatch(fetchServices());
      setCategories([]);
    }
  }, [services, dispatch]);

  // Redirect if not authenticated or not a freelancer
  useEffect(() => {
    if (!isAuthenticated || (currentUser && currentUser.role !== 'freelancer')) {
      navigate('/login');
    }
  }, [isAuthenticated, currentUser, navigate]);
  
  // Fetch service data if editing
  useEffect(() => {
    if (serviceId) {
      setIsEditing(true);
      dispatch(fetchServiceById(serviceId))
        .unwrap()
        .then((service) => {
          // Convert price to string for the form
          const priceFromStr = service.price ? service.price.toString() : '';
          
          setFormData({
            title: service.title || '',
            category: service.tags?.[0] || '',
            tags: service.tags || [],
            priceFrom: priceFromStr,
            description: service.longDescription || service.description || '',
            thumbnailImage: service.image || null,
            galleryImages: service.galleryImages || [],
            youtubeUrl: service.youtubeUrl || ''
          });
          
          if (service.youtubeUrl) {
            const videoId = extractYoutubeId(service.youtubeUrl);
            if (videoId) setYoutubeVideoId(videoId);
          }
        })
        .catch((err) => {
          console.error('Error fetching service:', err);
          setSubmitError('Could not load service data. Please try again.');
        });
    }
  }, [serviceId, dispatch]);
  
  // Handle text/select inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setYoutubeVideoId('');
    setYoutubeError('');
  };

  // Handle thumbnail image upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert image to base64 for storage in JSON
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          thumbnailImage: reader.result // Store base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery images upload
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Check if adding these files would exceed the limit
      const totalImagesAfterAdd = formData.galleryImages.length + files.length;
      
      if (totalImagesAfterAdd > 6) {
        setShowMaxImagesAlert(true);
        // Only add images up to the limit
        const remainingSlots = 6 - formData.galleryImages.length;
        
        if (remainingSlots > 0) {
          const filesToAdd = files.slice(0, remainingSlots);
          
          // Convert each image to base64
          processGalleryImages(filesToAdd);
        }
        
        // Clear the input
        if (galleryInputRef.current) {
          galleryInputRef.current.value = '';
        }
        
        return;
      }
      
      // Convert all images to base64
      processGalleryImages(files);
    }
  };
  
  // Process gallery images to base64
  const processGalleryImages = (files) => {
    const processedImages = [...formData.galleryImages];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        processedImages.push(reader.result); // Add base64 string
        
        // Update state after all images are processed
        if (processedImages.length === formData.galleryImages.length + files.length) {
          setFormData({
            ...formData,
            galleryImages: processedImages
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add tag to the tags array
  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() !== '' && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  // Handle tag input keypress (add on Enter)
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(e);
    }
  };

  // Remove tag from the tags array
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (index) => {
    const updatedGalleryImages = [...formData.galleryImages];
    updatedGalleryImages.splice(index, 1);
    setFormData({
      ...formData,
      galleryImages: updatedGalleryImages
    });
    setShowMaxImagesAlert(false);
    
    // Clear the file input
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };
  
  // Extract YouTube video ID from URL
  const extractYoutubeId = (url) => {
    if (!url) return null;
    
    // Match YouTube URL patterns
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Handle YouTube URL validation and preview
  const handleYoutubePreview = (e) => {
    e.preventDefault();
    const videoId = extractYoutubeId(formData.youtubeUrl);
    
    if (videoId) {
      setYoutubeVideoId(videoId);
      setYoutubeError('');
    } else {
      setYoutubeError('Please enter a valid YouTube URL');
      setYoutubeVideoId('');
    }
  };
  
  // Remove YouTube video
  const handleRemoveYoutubeVideo = () => {
    setFormData({
      ...formData,
      youtubeUrl: ''
    });
    setYoutubeVideoId('');
    setYoutubeError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Validate required fields
    if (!formData.title || !formData.category || !formData.priceFrom || !formData.description) {
      setSubmitError('Please fill in all required fields');
      setValidated(true);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    // Create service object
    const serviceData = {
      userId: currentUser.id,
      title: formData.title,
      description: formData.description.substring(0, 150), // Short description
      longDescription: formData.description,
      price: parseFloat(formData.priceFrom),
      deliveryTime: '7 days', // Default delivery time
      image: formData.thumbnailImage || 'https://i.imgur.com/thdopBi.jpeg', // Default image if none provided
      galleryImages: formData.galleryImages || [], // Add gallery images as base64 strings
      tags: formData.tags.length > 0 ? formData.tags : [formData.category],
      featured: false,
      createdAt: new Date().toISOString(),
      averageRating: 0,
      numberOfReviews: 0,
      youtubeUrl: formData.youtubeUrl || '',
      status: 'pending', // Add pending status for admin review
      adminReviewed: false
    };
    
    // If editing, update the service, otherwise create a new one
    const action = isEditing 
      ? updateService({ id: serviceId, ...serviceData })
      : createService(serviceData);
    
    dispatch(action)
      .unwrap()
      .then((result) => {
        setIsSubmitting(false);
        // Navigate to dashboard with success message instead of service details
        navigate('/dashboard', { 
          state: { 
            successMessage: 'Service submitted successfully! It is now pending admin review.'
          }
        });
      })
      .catch((err) => {
        setIsSubmitting(false);
        setSubmitError(err.message || 'Failed to save service. Please try again.');
      });
  };

  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <h1 className="fw-bold">{isEditing ? 'Edit Service' : 'Add a New Service'}</h1>
          <p className="text-muted mb-0">
            Complete the form below to create a service that clients can order. Be detailed and showcase your best work.
          </p>
        </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col lg={8}>
              <Card className="mb-4 custom-card">
                <div className="card-header-custom">
                  <h5 className="mb-0">Basic Information</h5>
                </div>
                <Card.Body className="card-body-custom">
                  <Form.Group className="mb-4">
                    <Form.Label>Service Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="E.g., Professional Landing Page Design"
                      className="form-control-custom"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a service title.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Category</Form.Label>
                    <Form.Select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-control-custom"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select a category.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Tags</Form.Label>
                    <div className="d-flex input-group-custom">
                      <Form.Control
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        placeholder="E.g., responsive, modern, etc."
                        className="form-control-custom"
                      />
                      <Button 
                        variant="primary" 
                        onClick={handleAddTag}
                        className="px-3"
                      >
                        <FiTag /> Add
                      </Button>
                    </div>
                    <Form.Text className="text-muted">
                      Press Enter to add a tag
                    </Form.Text>
                    <div className="mt-3">
                      {formData.tags.map((tag, index) => (
                        <span className="tag-badge" key={index}>
                          {tag}
                          <FiX 
                            className="remove-tag-icon"
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </span>
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Starting Price ($)</Form.Label>
                    <div className="input-group input-group-custom">
                      <span className="input-group-text">
                        <FiDollarSign />
                      </span>
                      <Form.Control
                        type="number"
                        name="priceFrom"
                        value={formData.priceFrom}
                        onChange={handleInputChange}
                        placeholder="Price starting from"
                        className="form-control-custom"
                        min="1"
                        required
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid starting price.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card.Body>
              </Card>

              <Card className="mb-4 custom-card">
                <div className="card-header-custom">
                  <h5 className="mb-0">Service Description</h5>
                </div>
                <Card.Body className="card-body-custom">
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Describe your service in detail. What's included, your process, delivery time, etc."
                      className="form-control-custom textarea-custom"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a service description.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="mb-4 custom-card">
                <div className="card-header-custom">
                  <h5 className="mb-0">Media</h5>
                </div>
                <Card.Body className="card-body-custom">
                  <Form.Group className="mb-4">
                    <Form.Label>Thumbnail Image</Form.Label>
                    <div className="mb-3">
                      {formData.thumbnailImage ? (
                        <div className="thumbnail-preview">
                          <img 
                            src={URL.createObjectURL(formData.thumbnailImage)} 
                            alt="Thumbnail preview" 
                            className="thumbnail-image"
                          />
                          <Button 
                            variant="light"
                            className="remove-button "
                            onClick={() => setFormData({...formData, thumbnailImage: null})}
                          >
                            <FiX size={18} style={{ margin: '-6px 0 6px -8px ' }} />
                          </Button>
                        </div>
                      ) : (
                        <label htmlFor="thumbnail-upload" className="thumbnail-container">
                          <FiImage size={48} className="text-muted mb-2" />
                          <p className="text-muted mb-0">Click to upload thumbnail image</p>
                          <input
                            id="thumbnail-upload"
                            type="file"
                            className="d-none"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            required={!formData.thumbnailImage}
                          />
                        </label>
                      )}
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please upload a thumbnail image.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>YouTube Video (Optional)</Form.Label>
                    <div className="youtube-form">
                      <div className="input-group input-group-custom">
                        <Form.Control
                          type="text"
                          name="youtubeUrl"
                          value={formData.youtubeUrl}
                          onChange={handleInputChange}
                          placeholder="Paste YouTube URL"
                          className="form-control-custom"
                        />
                        <Button 
                          variant="primary" 
                          onClick={handleYoutubePreview}
                          className="px-3"
                        >
                          <FiYoutube /> Preview
                        </Button>
                      </div>
                      
                      {youtubeError && (
                        <div className="text-danger small mt-2">{youtubeError}</div>
                      )}
                      
                      {youtubeVideoId && (
                        <div className="youtube-preview mt-3">
                          <div className="youtube-container">
                            <iframe
                              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="youtube-iframe"
                            ></iframe>
                            <Button 
                              variant="light"
                              className="remove-button"
                              onClick={handleRemoveYoutubeVideo}
                            >
                            <FiX size={18} style={{ margin: '-6px 0 6px -8px ' }} />
                            </Button>
                          </div>
                          <div className="text-muted small mt-2">
                            <FiInfo className="me-1" /> This video will be shown on your service page
                          </div>
                        </div>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex justify-content-between align-items-center">
                      Gallery Images
                      <span className="text-muted fs-6">
                        {formData.galleryImages.length}/6
                      </span>
                    </Form.Label>
                    
                    {showMaxImagesAlert && (
                      <Alert variant="warning" className="py-2">
                        <FiInfo className="me-2" /> You can upload a maximum of 6 images.
                      </Alert>
                    )}
                    
                    <div className="gallery-grid">
                      {formData.galleryImages.map((image, index) => (
                        <div key={index} className="gallery-item">
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Gallery ${index}`} 
                            className="gallery-image"
                          />
                          <Button 
                            variant="light"
                            className="remove-button"
                            onClick={() => handleRemoveGalleryImage(index)}
                          >
                            <FiX size={18} style={{ margin: '-6px 0 6px -8px ' }} />
                            </Button>
                        </div>
                      ))}
                      
                      {formData.galleryImages.length < 6 && (
                        <label htmlFor="gallery-upload" className="upload-placeholder">
                          <FiUpload size={24} className="text-muted mb-2" />
                          <small className="text-muted">Add Image</small>
                        </label>
                      )}
                    </div>
                    
                    <input
                      ref={galleryInputRef}
                      id="gallery-upload"
                      type="file"
                      className={formData.galleryImages.length >= 6 ? "d-none" : "d-none"}
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      disabled={formData.galleryImages.length >= 6}
                    />
                    
                    {formData.galleryImages.length < 6 && (
                      <Button 
                        variant="outline-primary" 
                        className="w-100 mt-2"
                        onClick={() => document.getElementById('gallery-upload').click()}
                      >
                        <FiUpload className="me-2" /> Upload Images
                      </Button>
                    )}
                    
                    <Form.Text className="text-muted d-block mt-2">
                      Upload up to 6 images showcasing your work
                    </Form.Text>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {submitError && (
            <Alert variant="danger" className="mt-3" onClose={() => setSubmitError('')} dismissible>
              {submitError}
            </Alert>
          )}
          
          <div className="d-flex justify-content-between mt-4">
            <Button 
              variant="outline-secondary" 
              className="button-outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              className="button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {isEditing ? 'Updating...' : 'Publishing...'}
                </>
              ) : (
                isEditing ? 'Update Service' : 'Publish Service'
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateService;
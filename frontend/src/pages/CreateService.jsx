import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Alert } from 'react-bootstrap';
import { FiUpload, FiDollarSign, FiTag, FiList, FiX, FiImage, FiInfo, FiYoutube } from 'react-icons/fi';
import '../styles/CreateService.css';
import { addService } from '../api/service';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom';



const CreateService = () => {
  // Ref for file input
  const galleryInputRef = useRef(null);
  const navigate = useNavigate();

  // State for form fields
  // const [formData, setFormData] = useState({
  //   title: '',
  //   category: '',
  //   tags: [],
  //   priceFrom: '',
  //   description: '',
  //   thumbnailImage: null,
  //   galleryImages: [],
  //   youtubeUrl: ''
  // });
  const [formData, setFormData] = useState({
    service_name: '',
    description: '',
  });

  // State for current tag being entered
  // const [currentTag, setCurrentTag] = useState('');

  // State for form validation
  const [validated, setValidated] = useState(false);

  // State for alerts
  // const [showMaxImagesAlert, setShowMaxImagesAlert] = useState(false);

  // // State for YouTube video preview
  // const [youtubeVideoId, setYoutubeVideoId] = useState('');
  // const [youtubeError, setYoutubeError] = useState('');

  // Sample categories (you can replace with your actual categories)
  const categories = [
    'Web Development',
    'Graphic Design',
    'Interior Design',
    'Content Writing',
    'Digital Marketing',
    'UI/UX Design',
    'Video Editing',
    'Translation',
    'Photography',
    'Other'
  ];

  // Handle text/select inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear YouTube error when user modifies input
    // if (name === 'youtubeUrl') {
    //   setYoutubeError('');
    // }
  };

  // Handle thumbnail image upload
  // const handleThumbnailUpload = (e) => {
  //   if (e.target.files[0]) {
  //     setFormData({
  //       ...formData,
  //       thumbnailImage: e.target.files[0]
  //     });
  //   }
  // };

  // // Handle gallery images upload
  // const handleGalleryUpload = (e) => {
  //   if (e.target.files) {
  //     const newImages = Array.from(e.target.files);
  //     const totalImages = formData.galleryImages.length + newImages.length;

  //     if (totalImages <= 6) {
  //       setFormData({
  //         ...formData,
  //         galleryImages: [...formData.galleryImages, ...newImages]
  //       });
  //       setShowMaxImagesAlert(false);
  //     } else {
  //       // Only add images up to the maximum of 6
  //       const availableSlots = 6 - formData.galleryImages.length;
  //       if (availableSlots > 0) {
  //         const imagesToAdd = newImages.slice(0, availableSlots);
  //         setFormData({
  //           ...formData,
  //           galleryImages: [...formData.galleryImages, ...imagesToAdd]
  //         });
  //       }
  //       setShowMaxImagesAlert(true);

  //       // Clear the file input
  //       if (galleryInputRef.current) {
  //         galleryInputRef.current.value = '';
  //       }
  //     }
  //   }
  // };

  // // Add tag to the tags array
  // const handleAddTag = (e) => {
  //   e.preventDefault();
  //   if (currentTag.trim() !== '' && !formData.tags.includes(currentTag.trim())) {
  //     setFormData({
  //       ...formData,
  //       tags: [...formData.tags, currentTag.trim()]
  //     });
  //     setCurrentTag('');
  //   }
  // };

  // // Handle tag input keypress (add on Enter)
  // const handleTagKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     handleAddTag(e);
  //   }
  // };

  // // Remove tag from the tags array
  // const handleRemoveTag = (tagToRemove) => {
  //   setFormData({
  //     ...formData,
  //     tags: formData.tags.filter(tag => tag !== tagToRemove)
  //   });
  // };

  // // Remove gallery image
  // const handleRemoveGalleryImage = (index) => {
  //   const updatedGalleryImages = [...formData.galleryImages];
  //   updatedGalleryImages.splice(index, 1);
  //   setFormData({
  //     ...formData,
  //     galleryImages: updatedGalleryImages
  //   });
  //   setShowMaxImagesAlert(false);

  //   // Clear the file input
  //   if (galleryInputRef.current) {
  //     galleryInputRef.current.value = '';
  //   }
  // };

  // // Extract YouTube video ID from URL
  // const extractYoutubeId = (url) => {
  //   if (!url) return null;

  //   // Match YouTube URL patterns
  //   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  //   const match = url.match(regExp);

  //   return (match && match[2].length === 11) ? match[2] : null;
  // };

  // // Handle YouTube URL validation and preview
  // const handleYoutubePreview = (e) => {
  //   e.preventDefault();
  //   const videoId = extractYoutubeId(formData.youtubeUrl);

  //   if (videoId) {
  //     setYoutubeVideoId(videoId);
  //     setYoutubeError('');
  //   } else {
  //     setYoutubeError('Please enter a valid YouTube URL');
  //     setYoutubeVideoId('');
  //   }
  // };

  // // Remove YouTube video
  // const handleRemoveYoutubeVideo = () => {
  //   setFormData({
  //     ...formData,
  //     youtubeUrl: ''
  //   });
  //   setYoutubeVideoId('');
  //   setYoutubeError('');
  // };

  // Handle form submission
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    addService(formData).then((response) => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Service created successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/services');
      })
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Service creation failed',
        text: error || 'Something went wrong. Please try again.',
      })
    });


    // Here you would typically send the data to your backend API
  };

  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <h1 className="fw-bold">Add a New Service</h1>
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
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="service_name"
                      value={formData.service_name}
                      onChange={handleInputChange}
                      placeholder="E.g., Professional Landing Page Design"
                      className="form-control-custom"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a service title.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* <Form.Group className="mb-4">
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
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select a category.
                    </Form.Control.Feedback>
                  </Form.Group> */}

                  {/* <Form.Group className="mb-4">
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
                  </Form.Group> */}

                  {/* <Form.Group className="mb-3">
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
                  </Form.Group> */}
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
                  {/* <Form.Group className="mb-4">
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
                            // onChange={handleThumbnailUpload}
                            required={!formData.thumbnailImage}
                          />
                        </label>
                      )}
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please upload a thumbnail image.
                    </Form.Control.Feedback>
                  </Form.Group> */}

                  {/* <Form.Group className="mb-4">
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
                  </Form.Group> */}

                  {/* <Form.Group className="mb-3">
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
                  </Form.Group> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="d-flex justify-content-between mt-4">
            {/* <Button 
              variant="outline-secondary" 
              className="button-outline"
            >
              Save as Draft
            </Button> */}
            <Button
              variant="primary"
              type="submit"
              className="button-primary"
            >
              Publish Service
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateService;
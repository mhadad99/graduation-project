import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/slices/userSlice';

const EditProfile = () => {
  const { currentUser, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    location: '',
    description: '',
    mobileNumber: '',
    languages: [],
    skills: []
  });
  
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Initialize form with user data when available
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        title: currentUser.title || '',
        location: currentUser.location || '',
        description: currentUser.description || '',
        mobileNumber: currentUser.mobileNumber || '',
        languages: currentUser.languages || [],
        skills: currentUser.skills || []
      });
    }
  }, [currentUser]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle array inputs (languages, skills)
  const handleArrayChange = (e, field) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Dispatch update profile action
    dispatch(updateUserProfile({
      userId: currentUser.id,
      userData: formData
    })).then((result) => {
      if (!result.error) {
        setSuccessMessage('Profile updated successfully!');
        // Redirect to profile page after 2 seconds
        setTimeout(() => {
          navigate(`/profile/${currentUser.id}`);
        }, 2000);
      }
    });
  };
  
  if (!currentUser) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <h2 className="mb-4 text-center">Edit Profile</h2>
              
              {successMessage && (
                <Alert variant="success" className="mb-4">
                  {successMessage}
                </Alert>
              )}
              
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error.message || 'An error occurred. Please try again.'}
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="name">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled // Email shouldn't be editable
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="title">
                      <Form.Label>Professional Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Front-end Developer"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="location">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. New York, USA"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={12} className="mb-3">
                    <Form.Group controlId="description">
                      <Form.Label>About Me</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell clients about yourself, your experience and skills"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="mobileNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="e.g. +1234567890"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="languages">
                      <Form.Label>Languages</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.languages.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'languages')}
                        placeholder="e.g. English (Fluent), Arabic (Native)"
                      />
                      <Form.Text className="text-muted">
                        Separate languages with commas
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  
                  <Col md={12} className="mb-3">
                    <Form.Group controlId="skills">
                      <Form.Label>Skills</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.skills.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'skills')}
                        placeholder="e.g. React, JavaScript, UI/UX Design"
                      />
                      <Form.Text className="text-muted">
                        Separate skills with commas
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-flex justify-content-between mt-4">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate(`/profile/${currentUser.id}`)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;

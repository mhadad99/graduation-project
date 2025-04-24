import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';
import { Person, Envelope, Lock, CheckCircle, ArrowRight } from 'react-bootstrap-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client', // Default role
    agreeTerms: false
  });
  const [validated, setValidated] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        setPasswordMatch(value === formData.confirmPassword || formData.confirmPassword === '');
      } else {
        setPasswordMatch(value === formData.password);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false || !passwordMatch || !formData.agreeTerms) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      isVerified: false,
      profileImage: 'https://i.imgur.com/8MKXyDV.jpeg',
      lastSeen: 'Just now'
    })).then((result) => {
      if (!result.error) {
        // Show success message and redirect to login
        alert('Registration successful! Please login with your credentials.');
        navigate('/login');
      }
    });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={7}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-1">Create an Account</h2>
                <p className="text-muted">Join Tanfeez and start your freelancing journey</p>
              </div>
              
              {error && (
                <Alert variant="danger">
                  {error.message || 'Registration failed. Please try again.'}
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={12} className="mb-4">
                    <Form.Group controlId="name">
                      <Form.Label>Full Name</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Person />
                        </span>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your name.
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={12} className="mb-4">
                    <Form.Group controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Envelope />
                        </span>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid email address.
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-4">
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Lock />
                        </span>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength={6}
                          isInvalid={validated && (!formData.password || !passwordMatch)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {!formData.password ? 'Password is required' : !passwordMatch ? 'Passwords do not match' : 'Password must be at least 6 characters'}
                        </Form.Control.Feedback>
                      </div>
                      <Form.Text className="text-muted">
                        Must be at least 6 characters long
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-4">
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        isInvalid={validated && (!formData.confirmPassword || !passwordMatch)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {!formData.confirmPassword ? 'Please confirm your password' : 'Passwords do not match'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={12} className="mb-4">
                    <Form.Group controlId="role">
                      <Form.Label>I want to join as</Form.Label>
                      <div className="d-flex gap-3">
                        <Form.Check
                          type="radio"
                          id="role-client"
                          name="role"
                          value="client"
                          label="Client - Hire freelancers"
                          checked={formData.role === 'client'}
                          onChange={handleChange}
                          className="form-check-inline"
                        />
                        <Form.Check
                          type="radio"
                          id="role-freelancer"
                          name="role"
                          value="freelancer"
                          label="Freelancer - Offer services"
                          checked={formData.role === 'freelancer'}
                          onChange={handleChange}
                          className="form-check-inline"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={12} className="mb-4">
                    <Form.Group controlId="agreeTerms">
                      <Form.Check
                        type="checkbox"
                        name="agreeTerms"
                        label={
                          <span>
                            I agree to the <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                          </span>
                        }
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        isInvalid={validated && !formData.agreeTerms}
                        feedback="You must agree to the terms and conditions"
                        feedbackType="invalid"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-4"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'} {!loading && <ArrowRight className="ms-2" />}
                </Button>
                
                <div className="text-center">
                  <p className="mb-0">
                    Already have an account? <Link to="/login" className="text-primary fw-bold">Sign In</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

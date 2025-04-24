import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';
import { Person, Lock, ArrowRight } from 'react-bootstrap-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [validated, setValidated] = useState(false);
  
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    dispatch(loginUser({
      email: formData.email,
      password: formData.password
    }));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-1">Welcome Back</h2>
                <p className="text-muted">Sign in to continue to Tanfeez</p>
              </div>
              
              {error && (
                <Alert variant="danger">
                  {error.message || 'Invalid email or password. Please try again.'}
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Person />
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
                
                <Form.Group className="mb-4" controlId="password">
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label>Password</Form.Label>
                    <Link to="/forgot-password" className="text-primary small">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Lock />
                    </span>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 6 characters.
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="rememberMe">
                  <Form.Check
                    type="checkbox"
                    name="rememberMe"
                    label="Remember me"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-4"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'} {!loading && <ArrowRight className="ms-2" />}
                </Button>
                
                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account? <Link to="/register" className="text-primary fw-bold">Sign Up</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
                    <div className="text-center mt-4">
            <p className="text-muted small">
              For demo purposes, you can use:
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setFormData({
                  email: 'john@example.com',
                  password: 'password123',
                  rememberMe: false
                })}
              >
                Freelancer
              </Button>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setFormData({
                  email: 'jane@example.com',
                  password: 'password123',
                  rememberMe: false
                })}
              >
                Client
              </Button>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setFormData({
                  email: 'admin@example.com',
                  password: 'admin123',
                  rememberMe: false
                })}
              >
                Admin
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

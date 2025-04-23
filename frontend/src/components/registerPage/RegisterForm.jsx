import React, { useState } from 'react';
import { Card, Nav, Button, Form, Row, Col } from 'react-bootstrap';
import SocialRegister from './SocialRegister';
import '../../styles/registerPage/RegisterPage.css';
import { registerUser } from '../../api/auth'; // Import the registerUser function

export default function RegisterForm({ isClient, setIsClient }) {
    const [formType, setFormType] = useState(isClient ? 'client' : 'freelancer');
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        second_name: '',
        email: '',
        user_name: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                const newUser = {
                    ...formData,
                    userType: formType, // Add user type (client or freelancer)
                };
                const response = await registerUser(newUser); // Call the API
                setSuccessMessage('Registration successful! You can now log in.');
                setErrorMessage('');
                console.log('User registered:', response);
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
                setSuccessMessage('');
                console.error('Error registering user:', error);
            }
        }

        setValidated(true);
    };

    return (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white p-0">
                <Nav variant="tabs" className="signup-tabs">
                    <Nav.Item className="w-50">
                        <Nav.Link
                            className={formType === 'client' ? 'active border-0 py-3' : 'border-0 py-3 text-muted'}
                            onClick={() => {
                                setFormType('client');
                                setIsClient(true); // Update isClient in parent
                            }}
                        >
                            I'm a client, hiring for a project
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="w-50">
                        <Nav.Link
                            className={formType === 'freelancer' ? 'active border-0 py-3' : 'border-0 py-3 text-muted'}
                            onClick={() => {
                                setFormType('freelancer');
                                setIsClient(false); // Update isClient in parent
                            }}
                        >
                            I'm a freelancer, looking for work
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body className="p-4">
                <SocialRegister />

                <div className="divider position-relative my-4">
                    <span className="position-relative start-50 text-muted small text-uppercase">or</span>
                </div>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="first_name">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide your first name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="second_name">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="second_name"
                                    value={formData.second_name}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide your last name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="user_name">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid username.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password (8 or more characters)</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                Password must be at least 8 characters.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        >
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="India">India</option>
                            // Add more countries as needed
                        </Form.Select>
                    </Form.Group> */}

                    {/* <Form.Group className="mb-4" controlId="agreeTerms">
                        <Form.Check
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            label="Yes, I understand and agree to the Upwork Terms of Service, including the User Agreement and Privacy Policy."
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            You must agree to the terms to continue.
                        </Form.Control.Feedback>
                    </Form.Group> */}

                    <Button
                        variant="success"
                        type="submit"
                        className="w-100 py-3 rounded-pill fw-medium"
                    >
                        {formType === 'client' ? 'Join as a Client' : 'Join as a Freelancer'}
                    </Button>

                    <div className="text-center mt-4">
                        <p className="mb-0">
                            Already have an account? <a href="/login" className="text-success">Log In</a>
                        </p>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

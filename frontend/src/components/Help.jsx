/** @format */

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import '../styles/components/Help.css';
const Help = () => {
  // Get user from Redux store with safe default
  const user = useSelector((state) => state.auth?.user) || {};

  const [contactForm, setContactForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Add error boundary state
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setContactForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const form = e.currentTarget;

      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return;
      }

      // Simulate API call
      setTimeout(() => {
        setSubmitStatus("success");
        setContactForm((prev) => ({
          ...prev,
          subject: "",
          message: "",
        }));
        setValidated(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Show error message if something went wrong
  if (error) {
    return (
      <Alert variant="danger">
        An error occurred: {error}. Please try again later.
      </Alert>
    );
  }

  // FAQ data
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        'To create an account, click on the "Sign Up" button in the top-right corner of the page. Fill in the required information and select whether you want to join as a client or freelancer. Once you\'ve completed the form, click "Create Account" to register.',
    },
    {
      question: "How do I post a service?",
      answer:
        'If you\'re registered as a freelancer, you can post a service by clicking on the "Add a service" button in the header or by going to your dashboard and selecting "Create New Service". Fill in all the required details about your service, including title, description, pricing, and delivery time.',
    },
    {
      question: "How do payments work?",
      answer:
        "Tanfeez uses a secure payment system. Clients pay upfront when ordering a service, but the funds are held in escrow until the service is completed and approved. This ensures protection for both parties. Freelancers receive payment once the client approves the delivered work.",
    },
    {
      question: "What if I'm not satisfied with a service?",
      answer:
        "If you're not satisfied with a service, you can request revisions from the freelancer as specified in their service package. If issues persist, you can contact our support team, and we'll help mediate the situation. In some cases, refunds may be issued according to our refund policy.",
    },
    {
      question: "How do I contact a freelancer?",
      answer:
        'You can contact a freelancer by visiting their profile or service page and clicking on the "Contact" or "Message" button. This will open a chat where you can discuss your requirements before placing an order.',
    },
    {
      question: "What are the fees for using Tanfeez?",
      answer:
        "Tanfeez charges a 10% service fee on all transactions. This fee covers platform maintenance, customer support, and secure payment processing. The fee is automatically calculated and deducted when a payment is made.",
    },
  ];

  return (
    <div className="help-page">
      <Container className="py-5">
        <h1 className="text-center mb-5 display-5 fw-bold text-gradient">
          Help & Support
        </h1>

        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="faq-card border-0">
              <Card.Body className="p-4">
                <h3 className="mb-4 fw-bold text-muted">Frequently Asked Questions</h3>
                <Accordion className="custom-accordion">
                  {faqs.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                      <Accordion.Header>
                        <span className="fw-semibold">{faq.question}</span>
                      </Accordion.Header>
                      <Accordion.Body className="text-muted">
                        {faq.answer}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="contact-card border-0">
              <Card.Body className="p-4">
                <h3 className="mb-4 fw-bold text-muted">Contact Support</h3>

                {submitStatus === "success" && (
                  <Alert
                    variant="success"
                    className="success-alert"
                    dismissible
                    onClose={() => setSubmitStatus(null)}>
                    <i className="bi bi-check-circle me-2"></i>
                    Your message has been sent successfully! Our support team
                    will get back to you shortly.
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="name">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={contactForm.name}
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
                          value={contactForm.email}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid email address.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a subject.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={contactForm.message}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your message.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="submit-btn px-4 py-2">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <div className="contact-info text-center p-4">
              <h4 className="mb-4 fw-bold">Other Ways to Reach Us</h4>
              <div className="contact-details">
                <p className="mb-2">
                  <i className="bi bi-envelope me-2"></i>
                  support@tanfeez.com
                </p>
                <p className="mb-2">
                  <i className="bi bi-telephone me-2"></i>
                  +2 (012) 035-4567
                </p>
                <p className="mb-0">
                  <i className="bi bi-clock me-2"></i>
                  Monday to Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Help;

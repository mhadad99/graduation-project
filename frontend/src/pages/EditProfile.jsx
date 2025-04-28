/** @format */

import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Container,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { mockUserData } from "../mockData/profileData";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // For demo, we'll determine user type based on ID
  const userType = id === "1" ? "freelancer" : id === "2" ? "client" : "admin";
  const userData = mockUserData[userType];

  const [formData, setFormData] = useState(userData);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      console.log("Saving profile:", formData);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/profile/${id}`);
      }, 2000);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const renderRoleSpecificFields = () => {
    switch (userType) {
      case "freelancer":
        return (
          <>
            <h4 className="section-title">Professional Information</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hourly Rate ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expertise Level</Form.Label>
                  <Form.Select
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </>
        );

      case "client":
        return (
          <>
            <h4 className="section-title">Company Information</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Industry</Form.Label>
                  <Form.Control
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        );

      case "admin":
        return (
          <>
            <h4 className="section-title">Administrative Information</h4>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" value={formData.role} disabled />
            </Form.Group>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container className="py-5">
      <Card className="edit-profile-card">
        <Card.Body className="p-4">
          <h3 className="mb-4 text-muted">Edit Profile</h3>

          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              Profile updated successfully! Redirecting...
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <h4 className="section-title">Basic Information</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={formData.email} disabled />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </Form.Group>

            {renderRoleSpecificFields()}

            <div className="d-flex gap-2 justify-content-end mt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate(`/profile/${id}`)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;

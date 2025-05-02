import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FreelancerTab = ({ formData, handleChange, handleSubmit, navigate, id }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="section-title">Professional Information</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Hourly Rate ($)</Form.Label>
            <Form.Control
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Expertise Level</Form.Label>
            <Form.Select
              name="expertise"
              value={formData.expertise || ""}
              onChange={handleChange}
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-2 justify-content-end mt-4">
        <Button variant="outline-secondary" onClick={() => navigate(`/profile/${id}`)}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default FreelancerTab;

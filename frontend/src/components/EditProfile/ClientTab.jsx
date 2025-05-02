import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const ClientTab = ({ formData, handleChange, handleSubmit, navigate, id }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="section-title">Company Information</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={formData.company || ""}
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
              value={formData.industry || ""}
              onChange={handleChange}
            />
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

export default ClientTab;

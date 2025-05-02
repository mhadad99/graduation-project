/** @format */

import { Form, Card } from "react-bootstrap";

const ProjectBasicInfo = ({ formData, handleChange, errors }) => (
  <Card className="custom-card">
    <div className="card-header-custom">
      <h5 className="mb-0 text-light">Basic Information</h5>
    </div>
    <Card.Body className="card-body-custom">
      <Form.Group className="mb-3">
        <Form.Label>Project Title</Form.Label>
        <Form.Control
          name="title"
          value={formData.title}
          onChange={handleChange}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>
    </Card.Body>
  </Card>
);

export default ProjectBasicInfo;

/** @format */

import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import '../../styles/components/modals/AddProjectModal.css';

const AddProjectModal = ({
  show,
  onHide,
  onSubmit,
  formData,
  onChange,
  categories,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Portfolio Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Enter project title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Enter project description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={onChange}
              placeholder="Enter image URL"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project URL</Form.Label>
            <Form.Control
              type="text"
              name="link"
              value={formData.link}
              onChange={onChange}
              placeholder="Enter project URL"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={formData.tags}
              onChange={onChange}
              placeholder="React, Node.js, MongoDB"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={onChange}
              required>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={
            !formData.title ||
            !formData.description ||
            !formData.image ||
            !formData.category
          }>
          Add Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProjectModal;

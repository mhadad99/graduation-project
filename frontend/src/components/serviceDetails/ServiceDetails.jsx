import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const details = {
  description: `
    Get a unique, professional, and memorable logo tailored to your brand identity. 
    Every design is crafted from scratch, with unlimited revisions until you’re 100% satisfied.
  `,
  features: [
    "Custom logo concept (3 initial options)",
    "Unlimited revisions",
    "All file formats (AI, SVG, PNG, JPG, PDF)",
    "Transparent background",
    "Full copyright ownership",
    "48-hour delivery",
  ],
};

export default function ServiceDetails() {
  return (
    <Card className="mb-3 p-4 shadow-sm">
      <h5 className="fw-semibold mb-3">About this service</h5>
      <p style={{ whiteSpace: 'pre-line' }}>{details.description}</p>
      <h6 className="fw-bold mt-4 mb-2">What’s included</h6>
      <ListGroup variant="flush">
        {details.features.map((f, idx) => (
          <ListGroup.Item key={idx} className="ps-0 border-0 bg-transparent">
            <span className="text-success me-2">&#10003;</span>
            {f}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
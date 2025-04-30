/** @format */

import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export default function ServiceDetails({ serviceData }) {
  const { description, features = [] } = serviceData;

  return (
    <>
      <div className="service-description mb-4">
        <h5 className="fw-semibold mb-3">About this service</h5>
        <p className="text-secondary">{description}</p>
      </div>

      {features.length > 0 && (
        <div className="service-features">
          <h6 className="fw-bold mb-3">What's included</h6>
          <ListGroup variant="flush">
            {features.map((feature, idx) => (
              <ListGroup.Item
                key={idx}
                className="ps-0 border-0 d-flex align-items-center gap-2">
                <i className="bi bi-check2 text-success"></i>
                {feature}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </>
  );
}

/** @format */

import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import ServiceCard from "../cards/ServiceCard";
import { Plus } from "react-bootstrap-icons";

const ServicesTab = ({ services = [], isMyProfile }) => {
  const hasServices = services.length > 0;

  return (
    <div className="services-tab">
      {isMyProfile && hasServices && (
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary"
          href="/add/service"
          >
            <Plus className="me-2" />
            Add New Service
          </Button>
        </div>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {hasServices ? (
          services.map((service) => (
            <Col key={service.id}>
              <ServiceCard service={service} isOwner={isMyProfile} />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5">
              <h5 className="text-muted mb-3">No services available</h5>
              {isMyProfile && (
                <Button
                  variant="primary"
                  href="/add/service"
                >
                  <Plus className="me-2" />
                  Create Your First Service
                </Button>
              )}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ServicesTab;

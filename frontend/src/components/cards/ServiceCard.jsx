/** @format */

import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Star, Clock, CheckCircle } from "react-bootstrap-icons";

const ServiceCard = ({ service, isOwner }) => {
  const {
    title,
    description,
    price,
    rating,
    reviewCount,
    deliveryTime,
    image,
    status = "active",
  } = service;

  return (
    <Card className="service-card h-100 border-0 shadow-sm">
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="h5 mb-0">{title}</Card.Title>
          {status !== "active" && (
            <Badge bg={status === "pending" ? "warning" : "danger"}>
              {status}
            </Badge>
          )}
        </div>
        <Card.Text className="text-muted mb-3">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <Star className="text-warning me-1" />
            <span>{rating}</span>
            <span className="text-muted ms-1">({reviewCount})</span>
          </div>
          <div className="d-flex align-items-center">
            <Clock className="text-muted me-1" />
            <span className="text-muted">{deliveryTime}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="h5 mb-0">
            Starting at <span className="text-primary">${price}</span>
          </div>
          {isOwner ? (
            <Button variant="outline-primary" size="sm">
              Edit Service
            </Button>
          ) : (
            <Button variant="primary" size="sm">
              View Details
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;

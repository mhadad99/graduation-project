import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Badge, Row, Col } from "react-bootstrap";
import { BsPersonCircle, BsClock } from "react-icons/bs";
import {mockServiceRequests} from "../mock/mockServiceRequests";
import {mockServices} from "../mock/mockServices";
import "../styles/ServiceRequests.css";

const statusColors = {
  pending: "secondary",
  accepted: "success",
  rejected: "danger",
};

const ServiceRequests = () => {
  const { serviceId } = useParams();
  const [requests, setRequests] = useState([]);
  const [service, setService] = useState(null);

  useEffect(() => {
    setRequests(mockServiceRequests);
    const found = mockServices.find(
      (s) => String(s.id) === String(serviceId)
    );
    setService(found);
  }, [serviceId]);

  const handleStatus = (requestId, status) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status } : r
      )
    );
  };

  if (!service) {
    return <div className="text-center text-muted py-5">Service not found.</div>;
  }

  return (
    <div className="service-requests-page-container py-4" style={{ minHeight: "80vh" }}>
      {/* --- Service Main Info --- */}
      <Card className="mb-4 shadow-sm service-card">
        <Card.Body>
          <h3 className="mb-2">{service.title}</h3>
          <div className="mb-2 text-muted">{service.description}</div>
          <div className="d-flex flex-wrap gap-3 mb-2">
            <Badge bg="info" className="me-2">{service.category}</Badge>
            <Badge bg="success" className="me-2">{service.status}</Badge>
            <Badge bg="dark" className="me-2">{service.price}</Badge>
            <Badge bg="light" text="dark" className="me-2">{service.deliveryTime}</Badge>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {service.skills && service.skills.map((skill, idx) => (
              <Badge key={idx} bg="primary" className="me-1">{skill}</Badge>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* --- Requests List --- */}
      <h2 className="mb-4 section-title text-center">Service Requests</h2>
      {requests.length === 0 ? (
        <div className="text-center text-muted py-5">No requests yet.</div>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {requests.map((request) => (
            <Col key={request.id}>
              <Card className="request-card shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <BsPersonCircle size={38} className="me-3 text-primary" />
                    <div>
                      <div className="fw-bold">{request.clientName}</div>
                      <Badge
                        bg={statusColors[request.status]}
                        className="request-status-badge ms-1"
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Card.Text className="request-message mb-3">
                    <span className="text-muted">Message:</span>
                    <br />
                    {request.message}
                  </Card.Text>
                  <div className="d-flex flex-wrap gap-3 mb-3 request-meta">
                    <span className="d-flex align-items-center">
                      <BsClock className="me-1 text-warning" />
                      <span>{request.createdAt}</span>
                    </span>
                  </div>
                  {request.status === "pending" && (
                    <div className="d-flex gap-2 mt-2">
                      <Button
                        onClick={() => handleStatus(request.id, "accepted")}
                        variant="success"
                        size="sm"
                        className="flex-fill"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleStatus(request.id, "rejected")}
                        variant="danger"
                        size="sm"
                        className="flex-fill"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ServiceRequests;
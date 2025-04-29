/** @format */

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { mockProjects } from "../mock/projectsData";
import {
  Calendar3,
  GeoAlt,
  Cash,
  Star,
  StarFill,
  Wallet,
} from "react-bootstrap-icons";
import "../styles/pages/ProjectDetails.css";
function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposal, setProposal] = useState({
    coverLetter: "",
    price: "",
    deliveryTime: "",
  });

  useEffect(() => {
    const projectData = mockProjects.find((p) => p.id === parseInt(id));
    if (!projectData) {
      navigate("/projects");
      return;
    }
    setProject(projectData);
  }, [id, navigate]);

  if (!project) return <p>Loading...</p>;

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    console.log("Submitting proposal:", proposal);
    setShowProposalModal(false);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      open: "success",
      "in-progress": "warning",
      completed: "secondary",
      cancelled: "danger",
    };
    return colors[status] || "primary";
  };

  return (
    <Container className="mt-5 mb-5">
      <Card className="project-card">
        <Card.Body className="p-4">
          <div className="project-header">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h2 className="mb-0 project-title">{project.title}</h2>
              <Badge
                bg={getStatusBadgeColor(project.status)}
                className="px-4 py-3">
                {project.status}
              </Badge>
            </div>

            <div className="d-flex gap-3 mt-4">
              <div className="project-meta-item">
                <Calendar3 size={18} />
                Posted {project.postedDate}
              </div>
              <div className="project-meta-item">
                <GeoAlt size={18} />
                {project.location}
              </div>
              <div className="project-meta-item">
                <Cash size={18} />
                {project.budget}
              </div>
            </div>
          </div>

          <section className="mb-5">
            <h5 className="section-title">Project Description</h5>
            <p className="text-muted">{project.description}</p>
          </section>

          <Row className="mb-5">
            <Col md={6}>
              <h5 className="section-title">Project Details</h5>
              <div className="client-stat">
                <span className="client-stat-label">Experience Level:</span>
                <span className="client-stat-value">{project.level}</span>
              </div>
              <div className="client-stat">
                <span className="client-stat-label">Project Type:</span>
                <span className="client-stat-value">{project.type}</span>
              </div>
              <div className="client-stat">
                <span className="client-stat-label">Proposals:</span>
                <span className="client-stat-value">{project.proposals}</span>
              </div>
            </Col>
            <Col md={6}>
              <h5 className="section-title">Required Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <Badge key={index} className="skill-badge py-2 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>

          <section className="client-info">
            <h5 className="section-title mb-4">About the Client</h5>
            <Row>
              <Col md={6}>
                <div className="client-stat">
                  <GeoAlt size={18} className="me-2 text-primary" />
                  <span className="client-stat-label">Location:</span>
                  <span className="client-stat-value">{project.location}</span>
                </div>
                <div className="client-stat">
                  <div className="d-flex align-items-center w-100">
                    <span className="client-stat-label me-2">Rating:</span>
                    <div className="star-rating d-flex align-items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarFill
                          key={star}
                          size={14}
                          className={`star me-1 ${
                            star <= project.clientInfo?.rating ? "active" : ""
                          }`}
                        />
                      ))}
                      <span className="ms-2 client-stat-value">
                        {project.clientInfo?.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="client-stat">
                  <span className="client-stat-label">Projects Posted:</span>
                  <span className="client-stat-value">
                    {
                      mockProjects.filter(
                        (p) => p.clientId === project.clientId
                      ).length
                    }
                  </span>
                </div>
                <div className="client-stat">
                  <Wallet size={18} className="me-2 text-primary" />
                  <span className="client-stat-label">Total Spent:</span>
                  <span className="client-stat-value text-success">
                    ${project.clientInfo?.totalSpent.toLocaleString()}
                  </span>
                </div>
              </Col>
            </Row>
          </section>

          {project.status === "open" && (
            <div className="mt-4 d-flex justify-content-end">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowProposalModal(true)}>
                Submit Proposal
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={showProposalModal}
        onHide={() => setShowProposalModal(false)}
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Submit Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitProposal}>
            <Form.Group className="mb-3">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={proposal.coverLetter}
                onChange={(e) =>
                  setProposal({ ...proposal, coverLetter: e.target.value })
                }
                placeholder="Explain why you're the best fit for this project..."
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Proposed Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    value={proposal.price}
                    onChange={(e) =>
                      setProposal({ ...proposal, price: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Time (days)</Form.Label>
                  <Form.Control
                    type="number"
                    value={proposal.deliveryTime}
                    onChange={(e) =>
                      setProposal({ ...proposal, deliveryTime: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowProposalModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit Proposal
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ProjectDetails;

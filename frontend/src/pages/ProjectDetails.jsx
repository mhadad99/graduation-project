import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Modal,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getAllProject } from "../api/project"; // Or create a getProjectById API if you have one
import {
  Calendar3,
  GeoAlt,
  Cash,
  StarFill,
  Wallet,
} from "react-bootstrap-icons";
import "../styles/pages/ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposal, setProposal] = useState({
    coverLetter: "",
    price: "",
    deliveryTime: "",
  });

  useEffect(() => {
    // If you have a getProjectById API, use it here instead of getAllProject
    getAllProject()
      .then((response) => {
        const projectData = response.data.find(
          (p) => String(p.id) === String(id)
        );
        if (!projectData) {
          setError("Project not found.");
          setLoading(false);
          return;
        }
        setProject(projectData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load project.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner className="d-block mx-auto my-5" />;
  if (error)
    return (
      <Alert variant="danger" className="my-5 text-center">
        {error}
      </Alert>
    );

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    // TODO: Implement proposal submission to backend
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
              <h2 className="mb-0 project-title">{project.name}</h2>
              <Badge
                bg={getStatusBadgeColor(project.status)}
                className="px-4 py-3"
              >
                {project.status}
              </Badge>
            </div>

            <div className="d-flex gap-3 mt-4">
            <div className="project-meta-item">
            <Calendar3 size={18} />
            Posted {project.posted_at
              ? formatDistanceToNow(parseISO(project.posted_at), { addSuffix: true })
              : "Unknown"}
          </div>
              <div className="project-meta-item">
                <GeoAlt size={18} />
                {project.location}
              </div>
              <div className="project-meta-item">
                <Cash size={18} />
                {project.type === "fixed_price"
                  ? `$${project.budget}`
                  : `$${project.hourly_rate}/hr` +
                    (project.estimated_hours
                      ? `, ${project.estimated_hours} hrs`
                      : "")}
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
                <span className="client-stat-value">
                  {project.experience_level}
                </span>
              </div>
              <div className="client-stat">
                <span className="client-stat-label">Project Type:</span>
                <span className="client-stat-value">{project.type}</span>
              </div>
              {/* You can add proposals count if available in your backend */}
            </Col>
            <Col md={6}>
              <h5 className="section-title">Required Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                {project.skills &&
                  project.skills.map((skill, index) => (
                    <Badge key={index} className="skill-badge py-2 px-3">
                      {skill}
                    </Badge>
                  ))}
              </div>
            </Col>
          </Row>

          {/* Optionally, add client info if available in your backend */}
          {/* ... */}

          {project.status === "open" && (
            <div className="mt-4 d-flex justify-content-end">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowProposalModal(true)}
              >
                Submit Proposal
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={showProposalModal}
        onHide={() => setShowProposalModal(false)}
        size="lg"
      >
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
                      setProposal({
                        ...proposal,
                        deliveryTime: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowProposalModal(false)}
              >
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
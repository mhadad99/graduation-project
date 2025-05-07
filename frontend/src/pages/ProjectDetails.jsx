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
import { useDispatch, useSelector } from "react-redux";
import { getProjectByIdAction } from "../store/slices/projectSlice";
import { getUserProfile } from "../api/auth";
import { fetchUserProfile } from "../store/slices/userSlice";
import { addProposalAction, approveProposalAction, getMyProposalsAction, getProposalsByProjectAction } from "../store/slices/proposalSlice";
import Swal from "sweetalert2"; // Add this if not already imported
import ProposalsList from "../components/proposals/ProposalsList";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposal, setProposal] = useState({
    body: "", // renamed from coverLetter
    bid_price: "",
    days_to_finish: "", // renamed from deliveryTime
    project: "", // new field for project id
  });

  const { projectDetails, isLoading } = useSelector((myStore) => myStore.projectSlice);
  const { profile } = useSelector((myStore) => myStore.userSlice);
  const { user } = useSelector((myStore) => myStore.userSlice);

  const { proposals } = useSelector((myStore) => myStore.proposalSlice);

  useEffect(() => {
    if (id) {
      dispatch(getProposalsByProjectAction(id)).unwrap();
      console.log(proposals)
    }
  }, [dispatch, id]);



  useEffect(() => {
    // Always fetch project details when ID changes
    dispatch(getProjectByIdAction(id)).unwrap()
      .then((project) => {
        // After getting project details, fetch the client profile
        if (project?.user_id) {
          dispatch(fetchUserProfile(project.user_id)).unwrap();
        }
      });
  }, [dispatch, id]); // Only depend on id and dispatch

  if (isLoading) return <Spinner className="d-block mx-auto my-5" />;
  if (error)
    return (
      <Alert variant="danger" className="my-5 text-center">
        {error}
      </Alert>
    );

    const handleApproveProposal = async (proposalId) => {
      try {

        console.log(proposalId)
        await dispatch(approveProposalAction(proposalId)).unwrap();
        Swal.fire({
          icon: 'success',
          title: 'Proposal Approved',
          text: 'The proposal has been approved successfully.',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Action Failed',
          text: error?.message || 'Failed to approve proposal. Please try again.',
        });
      }
    };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();

    try {
      // Prepare proposal data
      const proposalData = {
        ...proposal,
        project: id, // Add project ID from URL params
      };

      // Dispatch action
      await dispatch(addProposalAction(proposalData)).unwrap();

      // Close modal and show success message
      setShowProposalModal(false);
      Swal.fire({
        icon: 'success',
        title: 'Proposal Submitted',
        text: 'Your proposal has been successfully submitted.',
        timer: 2000,
        showConfirmButton: false
      });

      // Reset form
      setProposal({
        body: "",
        bid_price: "",
        days_to_finish: "",
        project: "",
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error?.message || 'Failed to submit proposal. Please try again.',
      });
    }
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
  console.log(profile);

  return (
    <Container className="mt-5 mb-5">
      <Card className="project-card">
        <Card.Body className="p-4">
          <div className="project-header">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h2 className="mb-0 project-title">{projectDetails?.name}</h2>
              <Badge
                bg={getStatusBadgeColor(projectDetails?.progress)}
                className="px-4 py-3"
              >
                {projectDetails?.progress}
              </Badge>
            </div>

            <div className="d-flex gap-3 mt-4">
              <div className="project-meta-item">
                <Calendar3 size={18} />
                {/* Comment out posted_at since it's not in API */}
                {/* Posted {projectDetails.posted_at
                  ? formatDistanceToNow(parseISO(projectDetails.posted_at), { addSuffix: true })
                  : "Unknown"} */}
                Start Date: {projectDetails?.start_date}
              </div>
              {/* Comment out location since it's not in API */}
              {/* <div className="project-meta-item">
                <GeoAlt size={18} />
                {projectDetails.location}
              </div> */}
              <div className="project-meta-item">
                <Cash size={18} />
                {projectDetails?.type === "hourly"
                  ? `$${projectDetails?.budget}/hr`
                  : `$${projectDetails?.budget}`}
              </div>
            </div>
          </div>

          <section className="mb-5">
            <h5 className="section-title">Project Description</h5>
            <p className="text-muted">{projectDetails?.description}</p>
          </section>

          <Row className="mb-5">
            <Col md={6}>
              <h5 className="section-title">Project Details</h5>
              <div className="client-stat">
                <span className="client-stat-label">Experience Level:</span>
                <span className="client-stat-value">
                  {projectDetails?.experience_level}
                </span>
              </div>
              <div className="client-stat">
                <span className="client-stat-label">Project Type:</span>
                <span className="client-stat-value">{projectDetails?.type}</span>
              </div>
              <div className="client-stat">
                <span className="client-stat-label">Duration:</span>
                <span className="client-stat-value">{projectDetails?.duration} days</span>
              </div>
            </Col>

            <Col md={6}>
              <h5 className="section-title">Client Information</h5>
              <Card className="client-profile-card">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    {profile?.photo ? (
                      <img
                        src={profile.photo}
                        alt="Client"
                        className="client-avatar rounded-circle me-3"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="client-avatar-placeholder rounded-circle me-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: '#e9ecef',
                          fontSize: '1.5rem'
                        }}
                      >
                        {profile?.first_name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h6 className="mb-0">{`${profile?.first_name} ${profile?.second_name}`}</h6>
                      <small className="text-muted">@{profile?.user_name}</small>
                    </div>
                  </div>

                  <div className="client-info-grid">
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{profile?.email}</span>
                    </div>

                    {profile?.phone && (
                      <div className="info-item">
                        <span className="info-label">Phone:</span>
                        <span className="info-value">{profile.phone}</span>
                      </div>
                    )}

                    {profile?.client_profile?.company && (
                      <div className="info-item">
                        <span className="info-label">Company:</span>
                        <span className="info-value">{profile.client_profile.company}</span>
                      </div>
                    )}

                    {profile?.bio && (
                      <div className="info-item">
                        <span className="info-label">Bio:</span>
                        <span className="info-value">{profile.bio}</span>
                      </div>
                    )}

                    <div className="info-item">
                      <span className="info-label">Member Since:</span>
                      <span className="info-value">
                        {new Date(profile?.client_profile?.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* Comment out skills section since it's not in API */}
            {/* <Col md={6}>
              <h5 className="section-title">Required Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                {projectDetails?.skills &&
                  projectDetails?.skills.map((skill, index) => (
                    <Badge key={index} className="skill-badge py-2 px-3">
                      {skill}
                    </Badge>
                  ))}
              </div>
            </Col> */}
          </Row>

          {projectDetails?.progress === "not_started" &&   user.user_type === "freelancer" && (
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

      {user.id === projectDetails?.user_id &&<ProposalsList 
        proposals={proposals}
        onApprove={handleApproveProposal}
        projectStatus = {projectDetails.progress}
        isClientView={profile?.user_type === 'client' && projectDetails?.clientId === profile?.id}
      />}


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
                value={proposal.body}
                onChange={(e) =>
                  setProposal({ ...proposal, body: e.target.value })
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
                    value={proposal.bid_price}
                    onChange={(e) =>
                      setProposal({ ...proposal, bid_price: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (days)</Form.Label>
                  <Form.Control
                    type="number"
                    value={proposal.days_to_finish}
                    onChange={(e) =>
                      setProposal({
                        ...proposal,
                        days_to_finish: e.target.value,
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
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Proposal'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ProjectDetails;



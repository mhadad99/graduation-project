import { Modal, Button, Badge } from 'react-bootstrap';

const ProjectDetailsModal = ({ project, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{project?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="project-details">
          <div className="detail-item">
            <strong>Description:</strong>
            <p>{project?.description}</p>
          </div>
          
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Status:</strong>
              <Badge >
                {project?.progress}
              </Badge>
            </div>
            
            <div className="detail-item">
              <strong>Type:</strong>
              <span>{project?.type}</span>
            </div>
            
            <div className="detail-item">
              <strong>Budget:</strong>
              <span>${project?.budget}</span>
            </div>
            
            <div className="detail-item">
              <strong>Duration:</strong>
              <span>{project?.duration} days</span>
            </div>
            
            <div className="detail-item">
              <strong>Experience Level:</strong>
              <span>{project?.experience_level}</span>
            </div>
            
            <div className="detail-item">
              <strong>Start Date:</strong>
              <span>{new Date(project?.start_date).toLocaleDateString()}</span>
            </div>
            
            <div className="detail-item">
              <strong>End Date:</strong>
              <span>{new Date(project?.end_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectDetailsModal;
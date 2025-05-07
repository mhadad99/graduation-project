import { Modal, Button, Badge } from 'react-bootstrap';

const ProposalDetailsModal = ({ proposal, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Proposal Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="proposal-details">
                    <div className="detail-item">
                        <strong>Project:</strong>
                        <h5>{proposal?.project?.name}</h5>
                        <p className="text-muted">{proposal?.project?.description}</p>
                    </div>

                    <div className="detail-grid">
                        <div className="detail-item">
                            <strong>Bid Price:</strong>
                            <span>${proposal?.bid_price}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Project Budget:</strong>
                            <span>${proposal?.project?.budget}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Days to Finish:</strong>
                            <span>{proposal?.days_to_finish} days</span>
                        </div>

                        <div className="detail-item">
                            <strong>Status:</strong>
                            <Badge bg={proposal?.is_approved ? 'success' : 'warning'}>
                                {proposal?.is_approved ? 'Approved' : 'Pending'}
                            </Badge>
                        </div>

                        <div className="detail-item">
                            <strong>Submitted:</strong>
                            <span>{new Date(proposal?.created_at).toLocaleDateString()}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Cover Letter:</strong>
                            <p>{proposal?.body}</p>
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

export default ProposalDetailsModal;
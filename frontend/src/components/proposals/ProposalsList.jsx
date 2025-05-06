import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';

const ProposalsList = ({ proposals, onApprove, isClientView, is_approved }) => {
    
    return (
        <div className="proposals-section mt-4">
            <Card>
                <Card.Header className="bg-light">
                    <h5 className="mb-0">Proposals ({proposals?.length || 0})</h5>
                </Card.Header>
                <Card.Body>
                    {proposals?.length > 0 ? (
                        proposals.map((proposal) => (
                            <div key={proposal.id} className="proposal-item mb-4 pb-4 border-bottom">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h6 className="mb-1">{proposal.freelancer?.user?.first_name} {proposal.freelancer?.user?.last_name}</h6>
                                        <small className="text-muted">
                                            Submitted {formatDistanceToNow(new Date(proposal.created_at), { addSuffix: true })}
                                        </small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Badge bg="primary" className="me-2">${proposal.bid_price}</Badge>
                                        <Badge bg="info">{proposal.days_to_finish} days</Badge>
                                    </div>
                                </div>

                                <p className="proposal-body mb-3">{proposal.body}</p>

                                {isClientView && !is_approved && (
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => onApprove(proposal.id)}
                                        >
                                            Accept Proposal
                                        </Button>
                                    </div>
                                )}

                                {is_approved && (
                                    <Badge bg="success" className="approved-badge">Approved</Badge>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted py-4">
                            No proposals yet
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProposalsList;
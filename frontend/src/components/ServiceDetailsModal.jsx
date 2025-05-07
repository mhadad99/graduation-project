import { Modal, Button, Badge } from 'react-bootstrap';

const ServiceDetailsModal = ({ service, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{service?.service_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="service-details">
                    {service?.photo && (
                        <div className="text-center mb-4">
                            <img
                                src={service.photo}
                                alt={service.service_name}
                                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    <div className="detail-grid">
                        <div className="detail-item">
                            <strong>Description:</strong>
                            <p>{service?.description}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Category:</strong>
                            <Badge bg="primary">{service?.category}</Badge>
                        </div>

                        <div className="detail-item">
                            <strong>Price:</strong>
                            <span>${service?.price}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Tags:</strong>
                            <div className="d-flex gap-2 flex-wrap">
                                {service?.tags?.map((tag, index) => (
                                    <Badge key={index} bg="secondary">
                                        {tag.replace(/[{}]/g, '')}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="detail-item">
                            <strong>Freelancer:</strong>
                            <span>{service?.freelancerId?.user_name}</span>
                        </div>

                        {service?.video && (
                            <div className="detail-item">
                                <strong>Video:</strong>
                                <a
                                    href={service.video.replace(/"/g, '')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-outline-primary"
                                >
                                    Watch Video
                                </a>
                            </div>
                        )}

                        <div className="detail-item">
                            <strong>Created At:</strong>
                            <span>{new Date(service?.created_at).toLocaleDateString()}</span>
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

export default ServiceDetailsModal;
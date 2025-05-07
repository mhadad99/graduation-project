import { Modal, Button, Card } from 'react-bootstrap';

const UserDetailsModal = ({ user, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <div className="d-flex align-items-center mb-4">
                            {user?.photo ? (
                                <img
                                    src={user.photo}
                                    alt="Profile"
                                    className="rounded-circle me-3"
                                    style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    className="rounded-circle me-3 d-flex align-items-center justify-content-center bg-secondary text-white"
                                    style={{ width: '64px', height: '64px' }}
                                >
                                    {user?.first_name?.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h4 className="mb-1">{`${user?.first_name} ${user?.second_name}`}</h4>
                                <p className="text-muted mb-0">@{user?.user_name}</p>
                            </div>
                        </div>

                        <div className="user-details-grid">
                            <div className="detail-item">
                                <strong>Email:</strong>
                                <span>{user?.email}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Phone:</strong>
                                <span>{user?.phone || 'Not provided'}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Birth Date:</strong>
                                <span>{user?.birth_date || 'Not provided'}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Address:</strong>
                                <span>{user?.address || 'Not provided'}</span>
                            </div>
                            <div className="detail-item">
                                <strong>User Type:</strong>
                                <span className={`badge bg-${user?.user_type === 'client' ? 'primary' : 'success'}`}>
                                    {user?.user_type}
                                </span>
                            </div>
                            {user?.bio && (
                                <div className="detail-item">
                                    <strong>Bio:</strong>
                                    <p>{user.bio}</p>
                                </div>
                            )}

                            {/* Show freelancer specific details */}
                            {user?.freelancer_profile && (
                                <>
                                    <div className="detail-item">
                                        <strong>Experience Level:</strong>
                                        <span>{user.freelancer_profile.experience_level}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Verified:</strong>
                                        <span>{user.freelancer_profile.is_verified ? 'Yes' : 'No'}</span>
                                    </div>
                                </>
                            )}

                            {/* Show client specific details */}
                            {user?.client_profile && (
                                <div className="detail-item">
                                    <strong>Company:</strong>
                                    <span>{user.client_profile.company || 'Not provided'}</span>
                                </div>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailsModal;
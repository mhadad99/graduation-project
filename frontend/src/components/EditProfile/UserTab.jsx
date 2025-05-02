import React, { useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { updateUserProfileAction } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const UserTab = ({ setFormData, formData, handleChange, navigate, id }) => {
      const dispatch = useDispatch();
      const { user, isLoading } = useSelector((myStore) => myStore.userSlice);


      useEffect(() => {
        if (user) {
          setFormData(user);
        }
      }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const filteredData = { ...formData };
            delete filteredData.freelancer_profile;
            delete filteredData.client_profile;
            delete filteredData.photo;

            await dispatch(updateUserProfileAction(filteredData)).unwrap();
            setTimeout(() => {
                navigate(`/profile/${id}`);
            }, 2000);
        } catch (err) {
            console.log(err);
            setError("Failed to update profile. Please try again.");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h4 className="section-title">Basic Information</h4>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Second Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="second_name"
                            value={formData.second_name || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={formData.email || ""} disabled />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-4">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end mt-4">
                <Button variant="outline-secondary" onClick={() => navigate(`/profile/${id}`)}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </div>
        </Form>
    );
};

export default UserTab;

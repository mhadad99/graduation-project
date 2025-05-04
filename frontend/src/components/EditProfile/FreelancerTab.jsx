import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyFreelancerProfileAction, updateFreelancerProfileAction } from "../../store/slices/userSlice";
import Swal from "sweetalert2";

const FreelancerTab = ({ navigate, id }) => {



    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { freelancer, isLoading } = useSelector((myStore) => myStore.userSlice);

    useEffect(() => {
        if (!freelancer) {
            dispatch(getMyFreelancerProfileAction());
        }

    }, [freelancer, dispatch]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    useEffect(() => {
        if (freelancer) {
            setFormData(freelancer);
        }
    }, [freelancer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const filteredData = {
                cv: formData.cv,
                experience_level: formData.experience_level,
                portfolio: formData.portfolio,
            };
            await dispatch(updateFreelancerProfileAction(filteredData)).unwrap().then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    text: "Your profile has been updated successfully",
                    timer: 3000,
                    showConfirmButton: false,
                })
            }).catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Profile Not Updated",
                    text: "Your profile has not been updated successfully",
                    timer: 3000,
                    showConfirmButton: false,
                });
            });

        } catch (err) {
            setError("Failed to update profile. Please try again.");
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <h4 className="section-title">Professional Information</h4>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>CV Link</Form.Label>
                        <Form.Control
                            type="text"
                            name="cv"
                            value={formData.cv || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Expertise Level</Form.Label>
                        <Form.Select
                            name="experience_level"
                            value={formData.experience_level || ""}
                            onChange={handleChange}
                        >
                            <option value="junior">Junior</option>
                            <option value="mid">Mid-Level</option>
                            <option value="senior">Senior</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

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

export default FreelancerTab;

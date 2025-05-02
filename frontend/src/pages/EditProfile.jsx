/** @format */

import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Container,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileAction } from "../store/slices/userSlice";
import UserTab from "../components/EditProfile/UserTab";
import FreelancerTab from "../components/EditProfile/FreelancerTab";
import ClientTab from "../components/EditProfile/ClientTab";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((myStore) => myStore.userSlice);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [key, setKey] = useState('user'); // default tab is "user"

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = { ...formData };
      delete filteredData.freelancer_profile;
      delete filteredData.client_profile;
      delete filteredData.photo;

      await dispatch(updateUserProfileAction(filteredData)).unwrap();
      setSuccess(true);
      setTimeout(() => {
        navigate(`/profile/${id}`);
      }, 2000);
    } catch (err) {
      console.log(err);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading profile...</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="danger">User profile not found</Alert>
      </Container>
    );
  }

  const userType = user.user_type;

  return (
    <Container className="py-5">
      <Card className="edit-profile-card">
        <Card.Body className="p-4">
          <h3 className="mb-4 text-muted">Edit Profile</h3>

          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              Profile updated successfully! Redirecting...
            </Alert>
          )}

          <Tabs
            id="profile-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="user" title="Persenal Information">
              <UserTab
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                navigate={navigate}
                id={id}
                userType={userType}
              />
            </Tab>

            {(userType === "freelancer" ) && (
              <Tab eventKey="freelancer" title="Professional Information">
                <FreelancerTab
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  navigate={navigate}
                  id={id}
                />
              </Tab>
            )}

            {(userType === "client" ) && (
              <Tab eventKey="client" title="Company Information">
                <ClientTab
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  navigate={navigate}
                  id={id}
                />
              </Tab>
            )}
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;

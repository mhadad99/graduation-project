/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Container, Image, Button, Row, Col, Badge } from "react-bootstrap";
import {
  Star,
  Award,
  Clock,
  Heart,
  Share,
  ChatDots,
  Pencil,
  GeoAlt,
  Envelope,
  Calendar3,
  PersonBadge,
} from "react-bootstrap-icons";
import "../../styles/UserProfile.css";

const ProfileHeader = ({ profileData, isMyProfile }) => {
  if (!profileData) {
    return <div className="profile-header text-center py-5">Loading...</div>;
  }

  const {
    id,
    profileImage = "https://i.imgur.com/6AglEUF.jpeg",
    name = "User",
    title = "Freelancer",
    location = "Not specified",
    averageRating = 0,
    numberOfReviews = 0,
    completionRate = 0,
    averageResponse = "N/A",
    role = "freelancer",
  } = profileData;

  const stats = [
    {
      icon: Star,
      text: `${averageRating.toFixed(1)} (${numberOfReviews} reviews)`,
    },
    { icon: Award, text: `${completionRate}% Completion` },
    { icon: Clock, text: `${averageResponse} response` },
  ];

  const actions = [
    { icon: Heart, text: "Save", variant: "light" },
    { icon: Share, text: "Share", variant: "light" },
    { icon: Envelope, text: "Message", variant: "light" },
  ];

  const getRoleBadgeVariant = (role) => {
    switch (role.toLowerCase()) {
      case "freelancer":
        return "primary";
      case "client":
        return "success";
      case "admin":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="profile-header text-center">
      <Container>
        <div className="profile-pic-container mb-4">
          <Image
            src={profileImage}
            roundedCircle
            className="profile-avatar"
            alt={name}
          />
          <span className="profile-status-dot" />
        </div>

        <h2 className="fw-bold mb-1">
          {name}
          <Badge
            bg={getRoleBadgeVariant(role)}
            className="ms-2 role-badge text-capitalize"
            size="sm"
            pill>
            <PersonBadge size={12} className="me-1" />
            {role}
          </Badge>
        </h2>
        <div className="text-muted mb-3">{title}</div>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <span className="profile-badge">
            <GeoAlt size={18} className="me-2" />
            {location}
          </span>
          <span className="profile-badge">
            <Calendar3 size={18} className="me-2" />
            Member since {new Date().getFullYear()}
          </span>
        </div>

        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8}>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {stats.map(({ icon: Icon, text }, idx) => (
                <span key={idx} className="profile-badge">
                  <Icon size={18} className="me-2" />
                  {text}
                </span>
              ))}
            </div>
          </Col>
        </Row>

        <div className="d-flex flex-wrap justify-content-center gap-2">
          {actions.map(({ icon: Icon, text, variant }, idx) => (
            <Button key={idx} variant={variant} className="action-btn">
              <Icon size={18} className="me-2" />
              {text}
            </Button>
          ))}

          {isMyProfile ? (
            <Button
              as={Link}
              to={`/profile/edit/${id}`}
              variant="success"
              className="action-btn">
              <Pencil size={18} className="me-2" />
              Edit Profile
            </Button>
          ) : (
            <Button
              as={Link}
              to={`/chat?user=${id}`}
              variant="primary"
              className="action-btn">
              <ChatDots size={18} className="me-2" />
              Contact
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfileHeader;

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Image, 
  Button,
  Row,
  Col
} from 'react-bootstrap';
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
  Calendar3
} from 'react-bootstrap-icons';
import '../../styles/UserProfile.css';

const ProfileHeader = ({ profileData, isMyProfile }) => {
  // Early return if profileData is not available
  if (!profileData) {
    return (
      <div className="profile-header text-center">
        <Container>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-white">Loading profile data...</p>
        </Container>
      </div>
    );
  }

  // Default values for missing properties
  const {
    profileImage = "https://i.imgur.com/6AglEUF.jpeg",
    name = "User",
    title = "Freelancer",
    location = "Not specified",
    averageRating = 0,
    numberOfReviews = 0,
    completionRate = 0,
    averageResponse = "N/A",
    role = "freelancer"
  } = profileData;

  return (
    <div className="profile-header text-center fade-in-up">
      <Container>
        <div className="profile-pic-container mb-4">
          <Image
            src={profileImage}
            roundedCircle
            className="profile-avatar"
            alt="Profile Picture"
          />
          <span className="position-absolute profile-status-dot bg-success rounded-circle"></span>
        </div>
        
        <h2 className="mt-3 mb-1 fw-bold">{name}</h2>
        <div className="profile-title mb-3">{title}</div>
        
        <div className="d-flex justify-content-center align-items-center mb-4">
          <span className="profile-badge">
            <GeoAlt size={18} className="me-2" />
            <span>{location}</span>
          </span>
          <span className="profile-badge">
            <Calendar3 size={18} className="me-2" />
            <span>Member since {new Date().getFullYear()}</span>
          </span>
        </div>
        
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8}>
            <div className="d-flex flex-wrap justify-content-center">
              <span className="profile-badge">
                <Star size={18} className="me-2" /> 
                <span>
                  {typeof averageRating === 'number' ? averageRating.toFixed(1) : '0.0'} 
                  <small className="ms-1">({numberOfReviews} reviews)</small>
                </span>
              </span>
              <span className="profile-badge">
                <Award size={18} className="me-2" /> 
                <span>{completionRate}% Completion</span>
              </span>
              <span className="profile-badge">
                <Clock size={18} className="me-2" /> 
                <span>{averageResponse} response</span>
              </span>
            </div>
          </Col>
        </Row>
        
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
          <Button variant="light" className="px-3 py-2 rounded-pill shadow-sm">
            <Heart size={18} className="me-2" /> Save
          </Button>
          <Button variant="light" className="px-3 py-2 rounded-pill shadow-sm">
            <Share size={18} className="me-2" /> Share
          </Button>
          <Button variant="light" className="px-3 py-2 rounded-pill shadow-sm">
            <Envelope size={18} className="me-2" /> Message
          </Button>
          
          {isMyProfile ? (
            <Button 
              variant="success"
              className="contact-btn shadow-sm"
              as={Link}
              to="/edit-profile"
            >
              <Pencil size={18} className="me-2" /> Edit Profile
            </Button>
          ) : (
            <Button 
              variant="primary" 
              className="contact-btn shadow-sm"
              as={Link}
              to={`/chat?user=${profileData.id || 0}`}
            >
              <ChatDots size={18} className="me-2" /> Contact
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfileHeader;

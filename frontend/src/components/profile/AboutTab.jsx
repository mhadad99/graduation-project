import React from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Badge, 
  ListGroup,
  ProgressBar
} from 'react-bootstrap';
import { 
  CheckCircleFill, 
  PatchCheck, 
  Calendar, 
  Clock, 
  File, 
  Phone, 
  Envelope, 
  Bookmark,
  Github,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  GeoAlt,
  StarFill,
  Award,
  BriefcaseFill
} from 'react-bootstrap-icons';
import '../../styles/UserProfile.css';

const AboutTab = ({ profileData, skills = [], qualities = [] }) => {
  // Early return if profileData is not available
  if (!profileData) {
    return (
      <Row>
        <Col>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading profile data...</p>
          </div>
        </Col>
      </Row>
    );
  }

  // Default values for missing properties
  const {
    description = "No description available.",
    languages = [],
    completionRate = 0,
    publishedServices = 0,
    averageRating = 0,
    joinDate = "Not available",
    lastSeen = "Not available",
    socialMedia = {},
    mobileNumber = "Not available"
  } = profileData;

  return (
    <Row className="fade-in-up">
      {/* Left Column - About & Skills */}
      <Col md={8} className="mb-4">
        <Card className="border-0 shadow-sm mb-4 rounded-lg">
          <Card.Body className="p-4">
            <h5 className="section-title">About Me</h5>
            <p className="mb-4 text-secondary">{description}</p>
            
            <h5 className="section-title">Skills</h5>
            <div className="mb-4">
              {skills.map((skill, index) => (
                <span key={index} className="skill-pill">
                  <CheckCircleFill className="text-success me-2" size={14} />
                  {skill}
                </span>
              ))}
            </div>
            
            <h5 className="section-title">Working Style</h5>
            <Row xs={1} md={2} className="g-3 mb-4">
              {qualities.map((quality, index) => (
                <Col key={index}>
                  <div className="quality-item">
                    <div className="d-flex align-items-center">
                      <PatchCheck className="text-primary me-2" size={20} />
                      <span>{quality}</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            
            <h5 className="section-title">Languages</h5>
            <div className="mb-2">
              {languages && languages.length > 0 ? (
                languages.map((language, index) => (
                  <Badge 
                    key={index} 
                    bg="light" 
                    text="dark" 
                    className="me-2 mb-2 px-3 py-2 rounded-pill shadow-sm"
                  >
                    {language}
                  </Badge>
                ))
              ) : (
                <p className="text-muted">No languages specified.</p>
              )}
            </div>
          </Card.Body>
        </Card>
        
        <Card className="border-0 shadow-sm rounded-lg">
          <Card.Body className="p-4">
            <h5 className="section-title">Recent Work</h5>
            <Row xs={1} md={2} className="g-4">
              {[1, 2, 3, 4].map((item) => (
                <Col key={item}>
                  <Card className="portfolio-item border-0">
                    <div className="position-relative overflow-hidden">
                      <Card.Img 
                        variant="top" 
                        src={`https://i.imgur.com/thdopBi.jpeg`} 
                        className="img-fluid"
                      />
                      <div className="position-absolute top-0 start-0 m-3">
                        <Badge 
                          bg="primary" 
                          className="rounded-pill px-2 py-1 shadow-sm"
                        >
                          <StarFill size={10} className="me-1" /> Featured
                        </Badge>
                      </div>
                    </div>
                    <Card.Body className="p-3">
                      <Card.Title className="h6 fw-bold">Project {item}</Card.Title>
                      <p className="text-muted small mb-0">Web Development</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>
      
      {/* Right Column - Stats & Contact */}
      <Col md={4}>
        <Card className="border-0 shadow-sm mb-4 stats-card rounded-lg">
          <Card.Body className="p-4">  
            <h5 className="section-title">Stats & Info</h5>
            <Row className="text-center g-3 mb-4">
              <Col xs={4}>
                <div className="stat-circle">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h3 className="mb-0 fw-bold">{completionRate}%</h3>
                  </div>
                </div>
                <p className="mb-0 mt-2 fw-medium">Completion</p>
              </Col>
              <Col xs={4}>
                <div className="stat-circle">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h3 className="mb-0 fw-bold">{publishedServices}</h3>
                  </div>
                </div>
                <p className="mb-0 mt-2 fw-medium">Services</p>
              </Col>
              <Col xs={4}>
                <div className="stat-circle">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0 fw-bold">{averageRating}</h3>
                      <StarFill size={16} className="ms-1 text-warning" />
                    </div>
                  </div>
                </div>
                <p className="mb-0 mt-2 fw-medium">Rating</p>
              </Col>
            </Row>
            <h5 className="section-title">Contact Info</h5>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item className="px-0 py-3 d-flex justify-content-between align-items-center border-bottom">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <span>Mobile</span>
                </div>
                <span className="fw-medium">{mobileNumber}</span>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 py-3 d-flex justify-content-between align-items-center border-bottom">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3">
                    <Calendar size={18} className="text-success" />
                  </div>
                  <span>Member since</span>
                </div>
                <span className="fw-medium">{joinDate}</span>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 py-3 d-flex justify-content-between align-items-center border-bottom">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-info bg-opacity-10 p-2 me-3">
                    <Clock size={18} className="text-info" />
                  </div>
                  <span>Last active</span>
                </div>
                <span className="fw-medium">{lastSeen}</span>
              </ListGroup.Item>
            </ListGroup>
            
            <h5 className="section-title">Verifications</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="px-0 py-3 d-flex align-items-center justify-content-between border-bottom">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3">
                    <Phone size={18} className="text-success" />
                  </div>
                  <span>Phone</span>
                </div>
                <Badge bg="success" className="rounded-pill px-3 py-2">
                  Verified
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 py-3 d-flex align-items-center justify-content-between border-bottom">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                    <Envelope size={18} className="text-primary" />
                  </div>
                  <span>Email</span>
                </div>
                <Badge bg="success" className="rounded-pill px-3 py-2">
                  Verified
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 py-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-danger bg-opacity-10 p-2 me-3">
                    <Bookmark size={18} className="text-danger" />
                  </div>
                  <span>ID</span>
                </div>
                <Badge bg="danger" className="rounded-pill px-3 py-2">
                  Not Verified
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        
        {/* Social Media Links */}
        <Card className="border-0 shadow-sm mb-4 rounded-lg">
          <Card.Body className="p-4">
            <h5 className="section-title">Social Media</h5>
            <ListGroup variant="flush">
              {socialMedia?.github && (
                <ListGroup.Item className="px-0 py-3 d-flex align-items-center border-bottom">
                  <a 
                    href={`https://github.com/${socialMedia.github}`}
                    className="text-decoration-none d-flex align-items-center w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="rounded-circle bg-dark bg-opacity-10 p-2 me-3">
                      <Github size={18} className="text-dark" />
                    </div>
                    <span className="text-secondary">{socialMedia.github}</span>
                  </a>
                </ListGroup.Item>
              )}
              {socialMedia?.instagram && (
                <ListGroup.Item className="px-0 py-3 d-flex align-items-center border-bottom">
                  <a 
                    href={`https://instagram.com/${socialMedia.instagram}`}
                    className="text-decoration-none d-flex align-items-center w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="rounded-circle bg-danger bg-opacity-10 p-2 me-3">
                      <Instagram size={18} className="text-danger" />
                    </div>
                    <span className="text-secondary">{socialMedia.instagram}</span>
                  </a>
                </ListGroup.Item>
              )}
              {socialMedia?.facebook && (
                <ListGroup.Item className="px-0 py-3 d-flex align-items-center border-bottom">
                  <a 
                    href={`https://facebook.com/${socialMedia.facebook}`}
                    className="text-decoration-none d-flex align-items-center w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                      <Facebook size={18} className="text-primary" />
                    </div>
                    <span className="text-secondary">{socialMedia.facebook}</span>
                  </a>
                </ListGroup.Item>
              )}
              {socialMedia?.linkedin && (
                <ListGroup.Item className="px-0 py-3 d-flex align-items-center border-bottom">
                  <a 
                    href={`https://linkedin.com/in/${socialMedia.linkedin}`}
                    className="text-decoration-none d-flex align-items-center w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="rounded-circle bg-info bg-opacity-10 p-2 me-3">
                      <Linkedin size={18} className="text-info" />
                    </div>
                    <span className="text-secondary">{socialMedia.linkedin}</span>
                  </a>
                </ListGroup.Item>
              )}
              {socialMedia?.twitter && (
                <ListGroup.Item className="px-0 py-3 d-flex align-items-center">
                  <a 
                    href={`https://twitter.com/${socialMedia.twitter}`}
                    className="text-decoration-none d-flex align-items-center w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="rounded-circle bg-info bg-opacity-10 p-2 me-3">
                      <Twitter size={18} className="text-info" />
                    </div>
                    <span className="text-secondary">{socialMedia.twitter}</span>
                  </a>
                </ListGroup.Item>
              )}
              {(!socialMedia || 
                (!socialMedia.github && 
                 !socialMedia.instagram && 
                 !socialMedia.facebook && 
                 !socialMedia.linkedin && 
                 !socialMedia.twitter)) && (
                <p className="text-muted py-3">No social media links available.</p>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AboutTab;

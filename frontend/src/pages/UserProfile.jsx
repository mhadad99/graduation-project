import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
  Image,
  Nav,
  Tabs,
  Tab,
  ProgressBar,
} from "react-bootstrap";
import {
  Calendar,
  Star,
  Phone,
  Envelope,
  Bookmark,
  Clock,
  Award,
  File,
  Instagram,
  Facebook,
  CheckCircleFill,
  PersonFill,
  Briefcase,
  StarFill,
  GeoAlt,
  ChatDots,
  Heart,
  Share,
  Cash,
  PatchCheck,
  LightningCharge,
  Pencil,
} from "react-bootstrap-icons";
import "../styles/UserProfile.css";

  const UserProfile = ({ isMyProfile = true }) => {
    // State for profile data
    const [profileData, setProfileData] = useState({
      name: "Ayman Samir",
      title: "Front-end and Web Developer | React and Python Expert",
      location: "New York, USA",
      description:
        "Hello, I'm Ayman Samir, a web developer specializing in front-end design and development using HTML, CSS, JavaScript, and React, with experience in Python and Django to create dynamic and high-performance solutions.",
      completionRate: 98,
      publishedServices: 12,
      numberOfReviews: 45,
      averageResponse: "2 hours",
      joinDate: "January 23, 2023",
      lastSeen: "2 days ago",
      mobileNumber: "+1234567890",
      email: "ayman@example.com",
      averageRating: 4.8,
      languages: ["English (Fluent)", "Arabic (Native)", "French (Basic)"],
      socialMedia: {
        instagram: "ayman_samir",
        facebook: "aymansamir",
        github: "aymansamir",
      },
    });
    const [activeTab, setActiveTab] = useState("services"); 

  // Function to handle field editing
  const handleEditField = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const skills = [
    "Professional landing page design",
    "Responsive and fast loading",
    "Custom website development",
    "React.js",
    "Website optimization",
    "API integration",
    "Converting wireframes into websites",
    "MongoDB database design",
    "Python & Django",
    "UI/UX Design",
  ];

  const qualities = [
    "Attention to detail",
    "Clean design and high-quality performance",
    "Commitment to deadlines",
    "Efficient and professional workflow",
    "Clear communication",
    "Understanding client requirements",
  ];

  const services = [
    {
      id: 1,
      title: "Professional Website Development",
      description:
        "Custom, responsive websites built with modern frameworks like React and Next.js",
      price: 500,
      deliveryTime: "5 days",
      image: "https://i.imgur.com/thdopBi.jpeg",
      tags: ["Web Development", "React", "Responsive"],
      featured: true,
    },
    {
      id: 2,
      title: "UI/UX Design",
      description:
        "User-friendly interfaces with modern aesthetics and optimal user experience",
      price: 300,
      deliveryTime: "3 days",
      image: "https://i.imgur.com/thdopBi.jpeg",
      tags: ["Design", "UI/UX", "Wireframing"],
    },
    {
      id: 3,
      title: "SEO Optimization",
      description:
        "Improve website visibility and ranking on search engines with data-driven strategies",
      price: 200,
      deliveryTime: "4 days",
      image: "https://i.imgur.com/thdopBi.jpeg",
      tags: ["SEO", "Marketing", "Analytics"],
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      comment:
        "Ayman delivered an exceptional website that perfectly matched our brand identity. His attention to detail and responsive design skills are outstanding.",
      rating: 5,
      date: "March 15, 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "GrowthHub",
      comment:
        "Working with Ayman was a breeze. He understood our requirements quickly and delivered a beautiful, high-performance website ahead of schedule.",
      rating: 5,
      date: "February 8, 2024",
    },
    {
      id: 3,
      name: "Jessica Williams",
      company: "Creative Solutions",
      comment:
        "Great communication and exceptional work. The website Ayman built for us has significantly improved our conversion rates.",
      rating: 4,
      date: "January 20, 2024",
    },
  ];

  const renderStars = (rating) => (
    <div className="d-inline-flex align-items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <StarFill
          key={i}
          className={`me-1 ${i < Math.floor(rating) ? "text-warning" : "text-muted"}`}
          size={14}
        />
      ))}
      <span className="ms-2 text-muted small">{rating.toFixed(1)}</span>
    </div>
  );

  const ServiceCard = ({ service }) => (
    <Card className="h-100 service-card border-0 shadow-sm">
      {service.featured && (
        <div className="featured-badge">
          <LightningCharge className="me-1" /> Featured
        </div>
      )}
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={service.image}
          alt={service.title}
          className="service-img"
        />
        <div className="service-overlay">
          <Button variant="light" size="sm" className="me-2">
            <Heart className="text-danger" />
          </Button>
          <Button variant="light" size="sm">
            <Share />
          </Button>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="h5 fw-bold">{service.title}</Card.Title>
        <Card.Text className="text-muted mb-3">{service.description}</Card.Text>
        <div className="service-tags mb-3">
          {service.tags.map((tag, idx) => (
            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
              {tag}
            </Badge>
          ))}
        </div>
        <hr className="my-3" />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Clock className="text-muted me-1" size={14} />
            <small className="text-muted">{service.deliveryTime}</small>
          </div>
          <div className="text-end">
            <small className="text-muted d-block">Starting from</small>
            <h5 className="text-success mb-0 fw-bold">${service.price}</h5>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-0">
        <Button variant="primary" className="w-100">
          View Details
        </Button>
      </Card.Footer>
    </Card>
  );

  const TestimonialCard = ({ testimonial }) => (
    <Card className="h-100 testimonial-card border-0 shadow-sm">
      <Card.Body>
        <div className="mb-3">{renderStars(testimonial.rating)}</div>
        <Card.Text className="testimonial-text">
          "{testimonial.comment}"
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
            <small className="text-muted">{testimonial.company}</small>
          </div>
          <small className="text-muted">{testimonial.date}</small>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="bg-light min-vh-100">
      {/* Header with Profile Picture */}
      <div className="profile-header text-center">
        <Container>
          <div className="position-relative d-inline-block">
            <Image
              src="https://i.imgur.com/6AglEUF.jpeg"
              roundedCircle
              className="profile-avatar"
              alt="Profile Picture"
            />
            <span className="position-absolute profile-status-dot bg-success rounded-circle"></span>
          </div>
          <h2 className="mt-3 mb-1 fw-bold">{profileData.name}</h2>
          <div className="profile-title mb-2">{profileData.title}</div>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <GeoAlt className="me-1" />
            <span>{profileData.location}</span>
          </div>
          <div className="mt-2 mb-3">
            <span className="profile-badge d-inline-flex align-items-center">
              <Star className="me-1" /> {profileData.averageRating.toFixed(1)} (
              {profileData.numberOfReviews} reviews)
            </span>
            <span className="profile-badge d-inline-flex align-items-center">
              <Award className="me-1" /> {profileData.completionRate}% Completion
            </span>
            <span className="profile-badge d-inline-flex align-items-center">
              <Clock className="me-1" /> {profileData.averageResponse} response
            </span>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="light" className="me-2">
              <Heart className="me-1" /> Save
            </Button>
            <Button variant="light" className="me-2">
              <Share className="me-1" /> Share
            </Button>
            {isMyProfile&&<Button className="btn-success">
              <Pencil className="me-1" /> Edit Profile
            </Button>}

          </div>
        </Container>
      </div>

      {/* Navigation */}
      <Container className="mt-4">
        <Tabs
          activeKey={activeTab} // Bind active tab to state
          onSelect={(k) => setActiveTab(k)} // Update state when tab is clicked
          className="mb-4 custom-tab"
          justify
        >
          <Tab eventKey="services" title={<span><Briefcase className="me-2" /> Services</span>}>
            <Row xs={1} md={2} lg={3} className="g-4 mb-4">
              {services.map((service) => (
                <Col key={service.id}>
                  <ServiceCard service={service} />
                </Col>
              ))}
            </Row>
          </Tab>
          <Tab eventKey="about" title={<span><PersonFill className="me-2" /> About</span>}>
            <Row>
              {/* Left Column - About & Skills */}
              <Col md={8} className="mb-4">
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Header className="bg-white border-bottom-0 pt-4">
                    <h5 className="mb-0 fw-bold">About Me</h5>
                  </Card.Header>
                  <Card.Body>
                    <p className="mb-4">{profileData.description}</p>
                    <h6 className="section-title">Skills</h6>
                    <div className="mb-4">
                      {skills.map((skill, index) => (
                        <span key={index} className="skill-pill">
                          <CheckCircleFill className="text-success me-1" size={12} />
                          {skill}
                        </span>
                      ))}
                    </div>
                    <h6 className="section-title">Working Style</h6>
                    <Row xs={1} md={2} className="g-3 mb-4">
                      {qualities.map((quality, index) => (
                        <Col key={index}>
                          <div className="quality-item">
                            <div className="d-flex align-items-center">
                              <PatchCheck className="text-primary me-2" size={18} />
                              <span>{quality}</span>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <h6 className="section-title">Languages</h6>
                    <div>
                      {profileData.languages.map((language, index) => (
                        <Badge key={index} bg="light" text="dark" className="me-2 p-2 mb-2">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white border-bottom-0 pt-4">
                    <h5 className="mb-0 fw-bold">Recent Work</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row xs={1} md={2} className="g-3">
                      {[1, 2, 3, 4].map((item) => (
                        <Col key={item}>
                          <Card className="portfolio-item border-0 shadow-sm">
                            <Card.Img variant="top" src="https://i.imgur.com/thdopBi.jpeg" />
                            <Card.Body className="p-3">
                              <Card.Title className="h6">Project {item}</Card.Title>
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
                <Card className="border-0 shadow-sm mb-4 stats-card">
                  <Card.Header className="bg-white border-bottom-0 pt-4">
                    <h5 className="mb-0 fw-bold">Stats & Info</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row className="text-center">
                      <Col xs={4}>
                        <div className="stat-circle">
                          <h4 className="mb-0 fw-bold">{profileData.completionRate}%</h4>
                        </div>
                        <h6 className="font-weight-bold">Completion</h6>
                      </Col>
                      <Col xs={4}>
                        <div className="stat-circle">
                          <h4 className="mb-0 fw-bold">{profileData.publishedServices}</h4>
                        </div>
                        <h6 className="font-weight-bold">Services</h6>
                      </Col>
                      <Col xs={4}>
                        <div className="stat-circle">
                          <h4 className="mb-0 fw-bold">{profileData.averageRating.toFixed(1)}</h4>
                        </div>
                        <h6 className="font-weight-bold">Rating</h6>
                      </Col>
                    </Row>
                    <hr className="my-4" />
                    <ListGroup variant="flush" className="mb-3">
                      <ListGroup.Item className="px-0 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Calendar className="me-3 text-primary" />
                          <span>Member since</span>
                        </div>
                        <span className="fw-bold">{profileData.joinDate}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Clock className="me-3 text-info" />
                          <span>Response time</span>
                        </div>
                        <span className="fw-bold">{profileData.averageResponse}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <File className="me-3 text-secondary" />
                          <span>Last active</span>
                        </div>
                        <span className="fw-bold">{profileData.lastSeen}</span>
                      </ListGroup.Item>
                    </ListGroup>
                    <h6 className="section-title">Verifications</h6>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Phone className="me-3 text-success" />
                          <span>Phone</span>
                        </div>
                        <Badge bg="success" pill>
                          Verified
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Envelope className="me-3 text-primary" />
                          <span>Email</span>
                        </div>
                        <Badge bg="success" pill>
                          Verified
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Bookmark className="me-3 text-info" />
                          <span>ID</span>
                        </div>
                        <Badge bg="danger" pill>
                          Not Verified
                        </Badge>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
                <Button variant="primary" className="w-100 mb-3 contact-btn">
                  <ChatDots className="me-2" /> Contact Me
                </Button>
                <div className="d-flex justify-content-center mb-4">
                  <Button variant="outline-primary" size="sm" className="mx-1">
                    <Facebook />
                  </Button>
                  <Button variant="outline-danger" size="sm" className="mx-1">
                    <Instagram />
                  </Button>
                  <Button variant="outline-dark" size="sm" className="mx-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </Button>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="reviews" title={<span><Star className="me-2" /> Reviews</span>}>
            <Row>
              <Col md={8}>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Header className="bg-white border-bottom-0 pt-4 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Client Reviews</h5>
                    <div>
                      <span className="h4 text-warning me-2">{profileData.averageRating.toFixed(1)}</span>
                      {renderStars(profileData.averageRating)}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-4">
                      <h6 className="mb-3">Rating Breakdown</h6>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="d-flex align-items-center mb-2">
                          <div className="me-2" style={{ width: "30px" }}>
                            {rating} <Star size={12} className="text-warning" />
                          </div>
                          <ProgressBar
                            now={rating === 5 ? 80 : rating === 4 ? 15 : rating === 3 ? 5 : 0}
                            variant={rating >= 4 ? "success" : rating === 3 ? "info" : "danger"}
                            className="flex-grow-1 me-2"
                            style={{ height: "10px" }}
                          />
                          <div style={{ width: "40px" }}>
                            {rating === 5 ? "80%" : rating === 4 ? "15%" : rating === 3 ? "5%" : "0%"}
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr className="my-4" />
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="mb-4">
                        <TestimonialCard testimonial={testimonial} />
                      </div>
                    ))}
                  </Card.Body>
                  <Card.Footer className="bg-white text-center">
                    <Button variant="outline-primary">View All Reviews</Button>
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="border-0 shadow-sm mb-4 stats-card">
                  <Card.Header className="bg-white border-bottom-0 pt-4">
                    <h5 className="mb-0 fw-bold">Review Stats</h5>
                  </Card.Header>
                  <Card.Body className="text-center">
                    <div className="stat-circle">
                      <h3 className="mb-0 fw-bold">{profileData.numberOfReviews}</h3>
                    </div>
                    <h6 className="mb-4">Total Reviews</h6>
                    <div className="d-flex justify-content-around">
                      <div>
                        <div className="stat-circle" style={{ width: "60px", height: "60px" }}>
                          <h5 className="mb-0 fw-bold">24</h5>
                        </div>
                        <small>This Month</small>
                      </div>
                      <div>
                        <div className="stat-circle" style={{ width: "60px", height: "60px" }}>
                          <h5 className="mb-0 fw-bold">98%</h5>
                        </div>
                        <small>Positive</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white border-bottom-0 pt-4">
                    <h5 className="mb-0 fw-bold">Top Skills</h5>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {["React.js", "Website Design", "Responsive Design", "Python"].map((skill, idx) => (
                        <ListGroup.Item key={idx} className="px-0 d-flex justify-content-between align-items-center">
                          <span>{skill}</span>
                          <Badge bg="primary" pill>
                            {5 - idx}
                          </Badge>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default UserProfile;
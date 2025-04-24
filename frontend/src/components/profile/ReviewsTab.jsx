import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  ProgressBar, 
  Form,
  Alert,
  Badge
} from 'react-bootstrap';
import { 
  Star, 
  StarFill, 
  StarHalf, 
  ChatLeftText, 
  Award, 
  HandThumbsUp, 
  Calendar3,
  PersonCircle
} from 'react-bootstrap-icons';
import '../../styles/UserProfile.css';

// Rating Input Component
const RatingInput = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  
  const handleRatingClick = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };
  
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map(value => (
        <StarFill
          key={value}
          size={28}
          className={`rating-star me-2 ${value <= (hover || rating) ? 'filled' : ''}`}
          onClick={() => handleRatingClick(value)}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  // Render stars for ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarFill
          key={i}
          className={i < rating ? "text-warning" : "text-neutral-300"}
          size={16}
        />
      ));
  };

  return (
    <Card className="testimonial-card h-100 border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <div className="rounded-circle overflow-hidden me-3" style={{ width: '45px', height: '45px' }}>
              <img 
                src={testimonial.avatar || "https://i.imgur.com/6AglEUF.jpeg"} 
                alt={testimonial.name} 
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
              <small className="text-secondary">{testimonial.company || ''}</small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Calendar3 size={14} className="text-secondary me-1" />
            <small className="text-secondary">{testimonial.date}</small>
          </div>
        </div>
        <div className="mb-3 d-flex align-items-center">
          {renderStars(testimonial.rating)}
          <span className="ms-2 fw-medium">{testimonial.rating}.0</span>
        </div>
        <Card.Text className="testimonial-text mb-0">
          "{testimonial.comment}"
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const ReviewsTab = ({ 
  profileData, 
  testimonials, 
  isMyProfile, 
  isLoading, 
  onSubmitReview 
}) => {
  // Early return if profileData is not available
  if (!profileData) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading profile data...</p>
      </div>
    );
  }
  
  // Default values for missing properties
  const {
    averageRating = 0,
    numberOfReviews = 0
  } = profileData;
  const [newRating, setNewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newRating === 0) return;

    onSubmitReview({
      rating: newRating,
      comment: reviewComment
    });

    // Reset form
    setNewRating(0);
    setReviewComment('');
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading reviews...</p>
      </div>
    );
  }

  return (
    <Row className="fade-in-up">
      <Col md={8}>
        <Card className="border-0 shadow-sm mb-4 rounded-lg">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="section-title mb-0">Client Reviews</h5>
              <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2">
                <span className="h4 text-warning me-2 mb-0">{typeof averageRating === 'number' ? averageRating.toFixed(1) : '0.0'}</span>
                <div className="d-inline-flex align-items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarFill
                      key={i}
                      className={`me-1 ${i < Math.floor(averageRating || 0) ? "text-warning" : "text-neutral-300"}`}
                      size={16}
                    />
                  ))}
                </div>
                <span className="ms-1 text-secondary">({numberOfReviews})</span>
              </div>
            </div>
            <div className="mb-4 p-3 bg-light rounded-lg">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = testimonials ? testimonials.filter(t => Math.floor(t.rating) === star).length : 0;
                const percentage = testimonials && testimonials.length > 0 ? (count / testimonials.length) * 100 : 0;
                
                return (
                  <div key={star} className="d-flex align-items-center mb-2">
                    <div className="me-3" style={{ width: '60px' }}>
                      <div className="d-flex align-items-center">
                        <span className="me-1 fw-medium">{star}</span>
                        <StarFill className="text-warning" size={14} />
                      </div>
                    </div>
                    <div className="flex-grow-1 me-3 position-relative" style={{ height: '10px' }}>
                      <div className="position-absolute w-100 h-100 bg-white rounded-pill"></div>
                      <div 
                        className="position-absolute h-100 bg-warning rounded-pill" 
                        style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}
                      ></div>
                    </div>
                    <div style={{ width: '40px' }} className="text-end fw-medium">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {!isMyProfile && (
              <div className="mb-4 p-4 bg-light rounded-lg shadow-sm">
                <h5 className="mb-3 fw-bold">Leave a Review</h5>
                <Form onSubmit={handleSubmitReview}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Your Rating</Form.Label>
                    <div>
                      <RatingInput 
                        initialRating={newRating} 
                        onRatingChange={(value) => setNewRating(value)} 
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Your Review</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience working with this freelancer..."
                      className="border-0 shadow-sm"
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={newRating === 0}
                    className="px-4 py-2 shadow-sm"
                  >
                    Submit Review
                  </Button>
                </Form>
              </div>
            )}
            
            <h5 className="section-title mb-4">Recent Reviews</h5>
            
            {testimonials && testimonials.length > 0 ? (
              <Row xs={1} className="g-4">
                {testimonials.map((testimonial) => (
                  <Col key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Alert variant="info" className="border-0 shadow-sm">
                <div className="d-flex align-items-center">
                  <ChatLeftText size={24} className="me-3 text-primary" />
                  <span>{isMyProfile ? "You haven't received any reviews yet." : "This user hasn't received any reviews yet."}</span>
                </div>
              </Alert>
            )}
          </Card.Body>
          {testimonials && testimonials.length > 3 && (
            <Card.Footer className="bg-white text-center border-top-0 pb-4">
              <Button variant="outline-primary" className="px-4 py-2 rounded-pill shadow-sm">
                View All Reviews
              </Button>
            </Card.Footer>
          )}
        </Card>
      </Col>
      <Col md={4}>
        <Card className="border-0 shadow-sm mb-4 stats-card rounded-lg">
          <Card.Body className="p-4 text-center">
            <h5 className="section-title text-center">Review Stats</h5>
            <div className="stat-circle mx-auto">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <h3 className="mb-0 fw-bold">{numberOfReviews}</h3>
                <small className="text-secondary">Reviews</small>
              </div>
            </div>
            <p className="mb-4 text-secondary">Client Satisfaction</p>
            
            <Row className="g-3 mb-3">
              <Col xs={6}>
                <Card className="border-0 shadow-sm h-100 rounded-lg">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <ChatLeftText size={18} className="text-primary me-2" />
                      <span className="fw-medium">This Month</span>
                    </div>
                    <h4 className="mb-0 text-center fw-bold">24</h4>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="border-0 shadow-sm h-100 rounded-lg">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <HandThumbsUp size={18} className="text-success me-2" />
                      <span className="fw-medium">Positive</span>
                    </div>
                    <h4 className="mb-0 text-center fw-bold">98%</h4>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Badge bg="success" className="me-2 px-3 py-2 rounded-pill">
                <Award size={14} className="me-1" /> Top Rated
              </Badge>
              <Badge bg="primary" className="px-3 py-2 rounded-pill">
                <StarFill size={14} className="me-1" /> Rising Talent
              </Badge>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="border-0 shadow-sm rounded-lg">
          <Card.Body className="p-4">
            <h5 className="section-title">Top Skills</h5>
            <ul className="list-group list-group-flush">
              {["React.js", "Website Design", "Responsive Design", "Python"].map((skill, idx) => (
                <li key={idx} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center border-bottom">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                      <span className="fw-bold text-primary">{idx + 1}</span>
                    </div>
                    <span>{skill}</span>
                  </div>
                  <Badge bg="primary" className="rounded-pill px-3 py-2">
                    {5 - idx} <StarFill size={10} className="ms-1" />
                  </Badge>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ReviewsTab;

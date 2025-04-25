/** @format */

import React, { useState } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { StarFill, Star, PersonCircle } from "react-bootstrap-icons";
import '../../styles/components/ReviewsTab.css';

const ReviewsTab = ({ reviews = [], onSubmitReview, isMyProfile }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReview(newReview);
    setNewReview({ rating: 5, comment: "" });
  };

  // Calculate average rating
  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;

  return (
    <div className="reviews-tab">
      {/* Reviews Summary */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h2 className="mb-0">{averageRating}</h2>
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarFill
                    key={star}
                    className={`me-1 ${
                      star <= averageRating ? "text-warning" : "text-muted"
                    }`}
                  />
                ))}
                <span className="ms-2 text-muted">
                  ({reviews.length} reviews)
                </span>
              </div>
            </Col>
            <Col md={6} className="mt-3 mt-md-0">
              {!isMyProfile && (
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() =>
                    document.getElementById("reviewForm").scrollIntoView()
                  }>
                  Write a Review
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Reviews List */}
      <div className="reviews-list mb-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-0 shadow-sm mb-3">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <PersonCircle size={40} className="text-secondary me-3" />
                <div>
                  <h6 className="mb-0">{review.author}</h6>
                  <div className="d-flex align-items-center">
                    {[...Array(5)].map((_, index) => (
                      <StarFill
                        key={index}
                        className={`me-1 ${
                          index < review.rating ? "text-warning" : "text-muted"
                        }`}
                        size={12}
                      />
                    ))}
                    <small className="text-muted ms-2">{review.date}</small>
                  </div>
                </div>
              </div>
              <p className="mb-0">{review.comment}</p>
            </Card.Body>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <p className="mb-0 text-muted">No reviews yet.</p>
            </Card.Body>
          </Card>
        )}
      </div>

      {/* Review Form */}
      {!isMyProfile && (
        <Card id="reviewForm" className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <h5 className="mb-4">Write a Review</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`me-2 ${
                        star <= newReview.rating ? "text-warning" : "text-muted"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      size={24}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Share your experience..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Submit Review
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ReviewsTab;

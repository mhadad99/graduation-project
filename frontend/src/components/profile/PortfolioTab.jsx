/** @format */

import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Plus, Collection } from "react-bootstrap-icons";
import PortfolioCard from "../cards/PortfolioCard";
import AddProjectModal from "../modals/AddProjectModal";
import '../../styles/components/PortfolioTab.css';
const PortfolioTab = ({
  portfolioItems = [],
  isMyProfile ,
  isLoading,
  onAddItem,
  onDeleteItem,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    tags: "",
    category: "",
  });

  // Add category options
  const categories = [
    "Full Stack Development",
    "Web Application",
    "Cloud Solutions",
    "API Development",
    "DevOps",
    "AI/ML Integration",
  ];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Handle input change for new portfolio item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPortfolioItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new portfolio item
  const handleAddPortfolioItem = () => {
    // Convert tags string to array
    const tagsArray = newPortfolioItem.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const newItem = {
      ...newPortfolioItem,
      id: Date.now(), // temporary ID
      tags: tagsArray,
      createdAt: new Date().toISOString(),
    };

    onAddItem(newItem);

    // Reset form and close modal
    setNewPortfolioItem({
      title: "",
      description: "",
      image: "",
      link: "",
      tags: "",
      category: "",
    });
    setShowAddModal(false);
  };

  const sortedPortfolioItems = [...portfolioItems].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="portfolio-tab">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold mb-0">Portfolio</h4>
            {!isMyProfile && (
              <Button
                variant="primary"
                className="d-flex align-items-center"
                onClick={() => setShowAddModal(true)}>
                <Plus className="me-2" /> Add Project
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {portfolioItems.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {sortedPortfolioItems.map((item) => (
            <Col key={item.id}>
              <PortfolioCard
                item={item}
                isMyProfile={isMyProfile}
                onDelete={onDeleteItem}
                formatDate={formatDate}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <Collection size={48} className="empty-state-icon mb-3" />
            <h5 className="text-muted">No portfolio items yet</h5>
            {!isMyProfile ? (
              <div>
                <p className="text-muted mb-3">
                  Start showcasing your best work! Add your first project to
                  attract potential clients.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowAddModal(true)}
                  className="d-inline-flex align-items-center">
                  <Plus className="me-2" /> Add Your First Project
                </Button>
              </div>
            ) : (
              <p className="text-muted">
                This freelancer hasn't added any portfolio items yet.
              </p>
            )}
          </Card.Body>
        </Card>
      )}

      <AddProjectModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddPortfolioItem}
        formData={newPortfolioItem}
        onChange={handleInputChange}
        categories={categories}
      />
    </div>
  );
};

export default PortfolioTab;

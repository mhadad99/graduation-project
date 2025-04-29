/** @format */

import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Eye, Trash, Link45deg } from "react-bootstrap-icons";
import '../../styles/components/cards/PortfolioCard.css';

const PortfolioCard = ({ item, isMyProfile, onDelete, formatDate }) => {
  return (
    <Card className="portfolio-card">
      <div className="portfolio-img-wrapper">
        <Card.Img src={item.image} alt={item.title} className="portfolio-img" />
        <div className="portfolio-overlay">
          <Button
            variant="light"
            size="sm"
            href={item.link}
            target="_blank"
            className="rounded-circle p-2">
            <Eye size={20} />
          </Button>
        </div>
        {isMyProfile && (
          <Button
            variant="danger"
            size="sm"
            className="position-absolute top-0 end-0 m-2 rounded-circle"
            onClick={() => onDelete(item.id)}>
            <Trash size={14} />
          </Button>
        )}
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="portfolio-title">{item.title}</h5>
          <Badge className="category-badge">{item.category}</Badge>
        </div>
        <p className="portfolio-description">{item.description}</p>
        <div className="mb-3">
          {item.tags.map((tag, idx) => (
            <Badge key={idx} className="portfolio-tag me-2 mb-2">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {item.createdAt && formatDate(item.createdAt)}
          </small>
          <Button
            variant="outline-primary"
            size="sm"
            href={item.link}
            target="_blank"
            className="view-project-btn">
            <Link45deg className="me-1" /> View Project
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PortfolioCard;

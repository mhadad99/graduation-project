/** @format */

import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Calendar3, GeoAlt, Cash, People } from "react-bootstrap-icons";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    description,
    start_date,
    end_date,
    duration,
    progress,
    // Add more fields if your backend provides them
  } = project;

  const handleViewDetails = () => {
    navigate(`/project/${id}`);
  };

  return (
    <Card className="h-100 project-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="project-title">{name}</Card.Title>
          <Badge bg={progress === "not_started" ? "secondary" : "success"}>
            {progress}
          </Badge>
        </div>

        <Card.Text className="project-description text-truncate mb-3">
          {description}
        </Card.Text>

        <div className="project-meta text-muted mb-3">
          <div className="d-flex align-items-center mb-2">
            <Calendar3 className="me-2" />
            <small>
              {start_date} - {end_date} ({duration} days)
            </small>
          </div>
        </div>

        <Button variant="primary" onClick={handleViewDetails} className="w-100">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;

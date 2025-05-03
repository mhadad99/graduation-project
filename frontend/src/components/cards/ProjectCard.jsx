/** @format */

import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Calendar3, GeoAlt, Cash, People } from "react-bootstrap-icons";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    budget,
    location,
    postedDate,
    skills,
    status,
    proposals,
  } = project;

  const handleViewDetails = () => {
    navigate(`/project/${id}`);
  };

  return (
    <Card className="h-100 project-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="project-title">{title}</Card.Title>
          <Badge bg={status === "open" ? "success" : "secondary"}>
            {status}
          </Badge>
        </div>

        <Card.Text className="project-description text-truncate mb-3">
          {description}
        </Card.Text>

        <div className="project-meta text-muted mb-3">
          <div className="d-flex align-items-center mb-2">
            <Cash className="me-2" />
            <small>{budget}</small>
          </div>
          <div className="d-flex align-items-center mb-2">
            <GeoAlt className="me-2" />
            <small>{location}</small>
          </div>
          <div className="d-flex align-items-center mb-2">
            <Calendar3 className="me-2" />
            <small>Posted {postedDate}</small>
          </div>
          <div className="d-flex align-items-center">
            <People className="me-2" />
            <small>{proposals} proposals</small>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {skills.map((skill, index) => (
            <Badge key={index} bg="light" text="dark">
              {skill}
            </Badge>
          ))}
        </div>

        <Button variant="primary" onClick={handleViewDetails} className="w-100">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;

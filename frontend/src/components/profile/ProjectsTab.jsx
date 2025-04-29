/** @format */

import React from "react";
import { Row, Col, Button, Badge } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ProjectCard from "../cards/ProjectCard";
import "../../styles/components/ProjectsTab.css";

const ProjectsTab = ({ projects = [], isMyProfile }) => {
  return (
    <div className="projects-tab">
      {isMyProfile && (
        <div className="d-flex justify-content-end mb-4">
          <Button
            as={Link}
            to="/add"
            variant="primary"
            className="add-project-btn">
            <Plus className="me-2" />
            Add New Project
          </Button>
        </div>
      )}

      <Row xs={1} md={2} className="g-4">
        {projects.map((project) => (
          <Col key={project.id}>
            <ProjectCard project={project} isOwner={isMyProfile} />
          </Col>
        ))}

        {projects.length === 0 && (
          <Col xs={12}>
            <div className="text-center py-5">
              <h5 className="text-muted mb-3">No projects available</h5>
              {isMyProfile && (
                <Button as={Link} to="/add" variant="primary">
                  <Plus className="me-2" />
                  Post Your First Project
                </Button>
              )}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ProjectsTab;

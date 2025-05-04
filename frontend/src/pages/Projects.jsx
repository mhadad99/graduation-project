import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { Search, Funnel } from "react-bootstrap-icons";
import ProjectCard from "../components/cards/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import { mockProjects } from "../mock/projectsData";
import "../styles/pages/Projects.css";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: 10000,
    status: "all",
    type: "all",
    level: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  useEffect(() => {
    const filtered = mockProjects.filter((project) => {
      // Search filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Price range filter
      const projectBudget = parseInt(
        project.budget.replace(/[^\d-]/g, "").split("-")[0]
      );
      const matchesPrice = projectBudget <= filters.priceRange;

      // Status filter
      const matchesStatus =
        filters.status === "all" || project.status === filters.status;

      // Type filter
      const matchesType =
        filters.type === "all" || project.type === filters.type;

      // Level filter
      const matchesLevel =
        filters.level === "all" || project.level === filters.level;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesStatus &&
        matchesType &&
        matchesLevel
      );
    });

    setFilteredProjects(filtered);
  }, [filters, searchTerm]);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Available Projects</h1>
          <div className="d-flex gap-3">
            <InputGroup>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Button
              variant="outline-primary"
              onClick={() => setShowFilters(!showFilters)}>
              <Funnel className="me-2" />
              Filters {showFilters ? "Hide" : "Show"}
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {showFilters && (
          <Col md={3} className="mb-4">
            <ProjectFilters filters={filters} setFilters={setFilters} />
          </Col>
        )}

        <Col md={showFilters ? 9 : 12}>
          <div className="mb-3 text-muted">
            Found {filteredProjects.length} projects
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                No projects found matching your criteria.
              </p>
            </div>
          ) : (
            <Row xs={1} md={showFilters ? 2 : 3} className="g-4">
              {filteredProjects.map((project) => (
                <Col key={project.id}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Projects;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { Search, Funnel } from "react-bootstrap-icons";
import ProjectCard from "../components/cards/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectAction } from "../store/slices/projectSlice";
import "../styles/pages/Projects.css";

const Projects = () => {
  const dispatch = useDispatch();
  const { projectList, isLoading, error } = useSelector((state) => state.projectSlice);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: 10000,
    status: "all",
    type: "all",
    level: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Fetch projects from backend on mount
  useEffect(() => {
    dispatch(getAllProjectAction());
  }, [dispatch]);

  // Filter projects when projectList, filters, or searchTerm changes
  useEffect(() => {
    const filtered = (projectList || []).filter((project) => {
      // Search filter
      const matchesSearch =
        (project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchTerm.toLowerCase()));

      // You may want to adjust these filters based on your backend data
      // For now, only search is applied since backend data doesn't have price/type/level/status
      return matchesSearch;
    });

    setFilteredProjects(filtered);
  }, [projectList, filters, searchTerm]);

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
            {isLoading
              ? "Loading projects..."
              : `Found ${filteredProjects.length} projects`}
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <div className="text-danger text-center py-5">
              {error}
              Failed to load projects.
            </div>
          ) : filteredProjects.length === 0 ? (
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
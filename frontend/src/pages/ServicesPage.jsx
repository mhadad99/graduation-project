/** @format */

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Collapse,
} from "react-bootstrap";
import { Search, Filter, Grid, ChevronDown } from "react-bootstrap-icons";
import ServiceCard from "../components/cards/ServiceCard";
import { servicesData, categories } from "../mock/servicesData";
import "../styles/ServicesPage.css";

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState(servicesData);
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [deliveryTime, setDeliveryTime] = useState("any");

  useEffect(() => {
    const filtered = servicesData.filter((service) => {
      const matchesCategory =
        selectedCategory === "All Services" ||
        service.category === selectedCategory;
      const matchesSubcategory =
        !selectedSubcategory || service.subcategory === selectedSubcategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        service.price >= priceRange[0] && service.price <= priceRange[1];

      return (
        matchesCategory && matchesSubcategory && matchesSearch && matchesPrice
      );
    });
    setFilteredServices(filtered);
  }, [selectedCategory, selectedSubcategory, searchTerm, priceRange]);

  return (
    <div className="services-page">
      <Container fluid className="py-4">
        <Row>
          {/* Sidebar Filters */}
          <Col lg={3} className="filters-sidebar">
            <div className="filters-wrapper p-3">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Filters</h5>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setShowFilters(!showFilters)}>
                  <Filter />
                </Button>
              </div>

              <Collapse in={showFilters}>
                <div>
                  {/* Category Filter */}
                  <div className="filter-section mb-4">
                    <h6 className="filter-title mb-3">Categories</h6>
                    <div className="category-list">
                      {categories.map((category) => (
                        <div key={category.name} className="mb-2">
                          <Button
                            variant="link"
                            className={`category-btn ${
                              selectedCategory === category.name ? "active" : ""
                            }`}
                            onClick={() => setSelectedCategory(category.name)}>
                            {category.name}
                          </Button>
                          {category.subcategories &&
                            selectedCategory === category.name && (
                              <div className="subcategory-list ms-3">
                                {category.subcategories.map((sub) => (
                                  <Button
                                    key={sub}
                                    variant="link"
                                    className={`subcategory-btn ${
                                      selectedSubcategory === sub
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setSelectedSubcategory(sub)}>
                                    {sub}
                                  </Button>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="filter-section mb-4">
                    <h6 className="filter-title mb-3">Price Range</h6>
                    <Form.Range
                      value={priceRange[1]}
                      min={0}
                      max={1000}
                      onChange={(e) =>
                        setPriceRange([0, parseInt(e.target.value)])
                      }
                    />
                    <div className="d-flex justify-content-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </Col>

          {/* Services Grid */}
          <Col lg={9}>
            <div className="services-header mb-4">
              <Row className="align-items-center">
                <Col>
                  <h4 className="mb-0">
                    {selectedCategory}
                    {selectedSubcategory && ` > ${selectedSubcategory}`}
                  </h4>
                </Col>
                <Col xs="auto">
                  <InputGroup>
                    <InputGroup.Text className="bg-transparent border-end-0">
                      <Search className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-start-0"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredServices.map((service) => (
                <Col key={service.id}>
                  <ServiceCard service={service} />
                </Col>
              ))}
              {filteredServices.length === 0 && (
                <Col xs={12}>
                  <div className="text-center py-5">
                    <h5 className="text-muted">No services found</h5>
                    <p className="mb-0">Try adjusting your search or filters</p>
                  </div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServicesPage;

/** @format */

import React, { useState, useEffect, use } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { Search, Funnel } from "react-bootstrap-icons";
import ServiceCard from "../components/cards/ServiceCard";
import { servicesData, categories } from "../mock/servicesData";
import "../styles/ServicesPage.css";
import { useDispatch, useSelector } from "react-redux";
import { myStore } from "../store";
import { getAllServicesAction } from "../store/slices/serviceSlice";

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredServices, setFilteredServices] = useState(servicesData);

  const handleCategoryClick = (categoryName) => {
    if (categoryName === "All Services") {
      // Reset all filters
      setSelectedCategory("All Services");
      setSelectedSubcategory("");
      setPriceRange([0, 1000]);
      setSearchTerm("");
    } else {
      setSelectedCategory(categoryName);
    }
  };
  const {services, isLoading, error} = useSelector((myStore)  => myStore.serviceSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllServicesAction());
  },[])

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

  // useEffect(() => {
  //   const filtered = services.filter((service) => {
  //     const matchesCategory =
  //       selectedCategory === "All Services" ||
  //       service.category === selectedCategory;
  //     const matchesSubcategory =
  //       !selectedSubcategory || service.subcategory === selectedSubcategory;
  //     const matchesSearch =
  //       service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       service.description.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesPrice =
  //       service.price >= priceRange[0] && service.price <= priceRange[1];

  //     return (
  //       matchesCategory && matchesSubcategory && matchesSearch && matchesPrice
  //     );
  //   });
  //   setFilteredServices(filtered);
  // }, [selectedCategory, selectedSubcategory, searchTerm, priceRange]);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Available Services</h1>
          <div className="d-flex gap-3">
            <InputGroup>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search services..."
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
            <div className="filters-card p-3">
              <h5 className="mb-4">Filters</h5>

              {/* Category Filter */}
              <div className="mb-4">
                <h6 className="filter-title mb-3">Categories</h6>
                <div className="category-list">
                  <div className="mb-2">
                    <Button
                      variant="link"
                      className={`category-btn ${
                        selectedCategory === "All Services" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("All Services")}>
                      All Services
                    </Button>
                  </div>
                  {categories.map((category) => (
                    <div key={category.name} className="mb-2">
                      <Button
                        variant="link"
                        className={`category-btn ${
                          selectedCategory === category.name ? "active" : ""
                        }`}
                        onClick={() => handleCategoryClick(category.name)}>
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
                                  selectedSubcategory === sub ? "active" : ""
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
              <div className="mb-4">
                <h6 className="filter-title mb-3">Price Range</h6>
                <Form.Range
                  value={priceRange[1]}
                  min={0}
                  max={1000}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="custom-range"
                />
                <div className="d-flex justify-content-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </Col>
        )}

        <Col md={showFilters ? 9 : 12}>
          <div className="mb-3 text-muted">
            Found {filteredServices.length} services
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                No services found matching your criteria.
              </p>
            </div>
          ) : (
            <Row xs={1} md={showFilters ? 2 : 3} className="g-4">
              {filteredServices.map((service) => (
                <Col key={service.id}>
                  <ServiceCard service={service} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ServicesPage;

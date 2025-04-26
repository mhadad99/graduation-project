/** @format */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ServiceHeader from "../components/serviceDetails/ServiceHeader";
import PricingBox from "../components/serviceDetails/PricingBox";
import SellerInfo from "../components/serviceDetails/SellerInfo";
import FAQSection from "../components/serviceDetails/FAQSection";
import ReviewsSection from "../components/serviceDetails/ReviewsSection";
import PortfolioGallery from "../components/serviceDetails/PortfolioGallery";
import ServiceDetails from "../components/serviceDetails/ServiceDetails";
import "../styles/ServiceDetailsPage.css";

export function ServiceDetailsPage() {
  return (
    <div className="service-details-page">
      <Container className="py-4">
        <div className="details-section mb-4">
          <Row>
            <Col md={8}>
              <ServiceHeader />
            </Col>
            <Col md={4}>
              <PricingBox />
            </Col>
          </Row>
        </div>

        <Row>
          <Col md={8}>
            <div className="service-content">
              <ServiceDetails />
            </div>
            <div className="service-content">
              <SellerInfo />
            </div>
            <div className="service-content">
              <FAQSection />
            </div>
            <div className="reviews-section">
              <ReviewsSection />
            </div>
          </Col>
          <Col md={4}>
            <div
              className="portfolio-gallery sticky-top"
              style={{ top: "92px" }}>
              <PortfolioGallery />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import React from 'react'
import ServiceHeader from '../components/serviceDetails/ServiceHeader'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PricingBox from '../components/serviceDetails/PricingBox';
import SellerInfo from '../components/serviceDetails/SellerInfo';
import FAQSection from '../components/serviceDetails/FAQSection';
import ReviewsSection from '../components/serviceDetails/ReviewsSection';
import PortfolioGallery from '../components/serviceDetails/PortfolioGallery';
import ServiceDetails from '../components/serviceDetails/ServiceDetails';

export function ServiceDetailsPage() {
  return (
    <>
      <Container className="bg-light py-4" style={{ minHeight: '100vh' }}>
        <Row className="mb-4">
          <Col md={8}>
            <ServiceHeader />
          </Col>
          <Col md={4}>
            <PricingBox />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <ServiceDetails />
            <SellerInfo />
            <FAQSection />
            <ReviewsSection />
          </Col>
          <Col md={4}>
            <PortfolioGallery />
          </Col>
        </Row>
      </Container>  </>)
}


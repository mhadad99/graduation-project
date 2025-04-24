import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServiceById } from '../redux/slices/serviceSlice'
import { fetchUserProfile } from '../redux/slices/userSlice'
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
import { Alert, Spinner } from 'react-bootstrap';

export function ServiceDetailsPage() {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const { currentService, loading, error } = useSelector(state => state.service);
  const { currentUser } = useSelector(state => state.user);

  // Fetch service data when ID is available
  useEffect(() => {
    if (serviceId) {
      // Handle both numeric and string IDs
      const id = isNaN(parseInt(serviceId)) ? serviceId : parseInt(serviceId);
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, serviceId]);



  // Fetch seller data when service is loaded
  useEffect(() => {
    if (currentService && currentService.userId) {
      dispatch(fetchUserProfile(currentService.userId));
    }
  }, [dispatch, currentService]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error.message || 'Failed to load service details. Please try again later.'}
        </Alert>
      </Container>
    );
  }

  if (!currentService) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Service not found. The service may have been removed or is no longer available.
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container className="bg-light py-4" style={{ minHeight: '100vh' }}>
        <Row className="mb-4">
          <Col md={8}>
            <ServiceHeader service={currentService} />
          </Col>
          <Col md={4}>
            <PricingBox service={currentService} />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <ServiceDetails service={currentService} />
            <SellerInfo service={currentService} />
            <FAQSection service={currentService} />
            <ReviewsSection serviceId={currentService.id} />
          </Col>
          <Col md={4}>
            <PortfolioGallery userId={currentService.userId} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/SearchComponent.css';

export function HomeHero() {
  return (
            <div className="search-component">
            <Container>
                <Row className="align-items-center justify-content-center" style={{ height: '60vh' }}>
                    <Col md={6} className="text-center">
                        <h1>What do you want to achieve today?</h1>
                        <p>Complete your tasks easily and securely with prices starting from just $5.</p>
                        <Form className="d-flex">
                            <Form.Control type="text" placeholder="Search for a service" className="me-2" />
                            <Button variant="success">Search</Button>
                        </Form>
                        <div className="tags mt-4">
                            <span>Marketing Consultations</span>
                            <span>WordPress</span>
                            <span>Interior Design</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
  )
}

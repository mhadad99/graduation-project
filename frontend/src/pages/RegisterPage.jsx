import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import RegisterForm from '../components/registerPage/RegisterForm';
import '../styles/registerPage/RegisterPage.css';

export function RegisterPage() {

  return (
    <main className="signup-page py-5 flex-grow-1 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <RegisterForm  /> {/* Pass setIsClient */}
          </Col>
        </Row>
      </Container>
    </main>
  );
}
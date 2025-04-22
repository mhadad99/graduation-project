import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import RegisterForm from '../components/registerPage/RegisterForm';
import '../styles/registerPage/RegisterPage.css';

export function RegisterPage() {
  const [isClient, setIsClient] = useState(true); // State lifted to RegisterPage

  return (
    <main className="signup-page py-5 flex-grow-1 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold text-primary mb-3">
                {isClient ? "Sign up to find work you love" : "Sign up to find talent you need"}
              </h1>
            </div>
            <RegisterForm isClient={isClient} setIsClient={setIsClient} /> {/* Pass setIsClient */}
          </Col>
        </Row>
      </Container>
    </main>
  );
}
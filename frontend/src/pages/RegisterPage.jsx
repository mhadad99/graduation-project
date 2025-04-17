import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export function RegisterPage() {
    let isLoading = false
    return (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <h1 className="text-center">Register</h1> {/* Centered the heading */}
              {/* {error && <div className="alert alert-danger">{error}</div>} */}
    
              <Form>
                <Form.Group className="my-3">
                  <Form.Label> Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    // value={name}
                    // isValid={name && validateInput(name, "text")}
                    // isInvalid={name && !validateInput(name, "text")}
                    // onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    // isValid={email && validateInput(email, "email")}
                    // isInvalid={email && !validateInput(email, "email")}
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter UserName"
                    // isInvalid={username && !validateInput(username, "username")}
                    // isValid={username && validateInput(username, "username")}
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label>Password </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    // value={password}
                    // isInvalid={password && !validateInput(password, "password")}
                    // isValid={password && validateInput(password, "password")}
                    // onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  className="my-3 w-100" // Added w-100 to make the button full width
                  type="submit"
                //   disabled={isLoading || !password || !email || !name || !username}
                  variant="dark"
                >
                  {isLoading ? "Registering...." : "Register"}
                </Button>
                <p>
                  I have account <Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      );
}

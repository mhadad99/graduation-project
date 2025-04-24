import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Speedometer2, 
  People, 
  Briefcase, 
  ChatDots, 
  GearFill, 
  BoxArrowRight 
} from 'react-bootstrap-icons';

const AdminLayout = () => {
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="admin-layout">
      <div className="admin-header bg-dark text-white py-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">
              <Link to="/admin" className="text-white text-decoration-none">
                Tanfeez Admin
              </Link>
            </h3>
            <div className="d-flex align-items-center">
              <img 
                src={currentUser?.profileImage || "https://i.imgur.com/8MKXyDV.jpeg"} 
                alt="Admin" 
                className="rounded-circle me-2" 
                style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
              />
              <span>{currentUser?.name || 'Admin User'}</span>
            </div>
          </div>
        </Container>
      </div>

      <Container fluid className="py-4">
        <Row>
          <Col md={3} lg={2} className="mb-4">
            <div className="bg-white rounded shadow-sm p-3">
              <Nav className="flex-column">
                <Nav.Link 
                  as={Link} 
                  to="/admin" 
                  className={`mb-2 ${location.pathname === '/admin' ? 'active text-primary fw-bold' : 'text-dark'}`}
                >
                  <Speedometer2 className="me-2" /> Dashboard
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/users" 
                  className={`mb-2 ${location.pathname === '/admin/users' ? 'active text-primary fw-bold' : 'text-dark'}`}
                >
                  <People className="me-2" /> Users
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/services" 
                  className={`mb-2 ${location.pathname === '/admin/services' ? 'active text-primary fw-bold' : 'text-dark'}`}
                >
                  <Briefcase className="me-2" /> Services
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/messages" 
                  className={`mb-2 ${location.pathname === '/admin/messages' ? 'active text-primary fw-bold' : 'text-dark'}`}
                >
                  <ChatDots className="me-2" /> Messages
                </Nav.Link>
                <hr />
                <Nav.Link 
                  as={Link} 
                  to="/admin/settings" 
                  className={`mb-2 ${location.pathname === '/admin/settings' ? 'active text-primary fw-bold' : 'text-dark'}`}
                >
                  <GearFill className="me-2" /> Settings
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  className="text-dark mb-2"
                >
                  <BoxArrowRight className="me-2" /> Back to Site
                </Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col md={9} lg={10}>
            <div className="bg-white rounded shadow-sm p-4">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLayout;

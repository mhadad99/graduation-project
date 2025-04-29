import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Use react-router-dom for routing
import '../../styles/admin-dashboard/Sidebar.css'; // Optional custom styles

const Sidebar = () => {
  return (
    <Navbar expand="lg" className="flex-column sidebar">
      <Navbar.Brand href="/admin/dashboard" className="mx-3 mt-3">
        <strong>Freelancer Admin</strong>
      </Navbar.Brand>

      <Nav className="flex-column w-100 p-2">
        <Nav.Link as={Link} to="/admin/dashboard">📊 Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/admin/projects">📂 Projects</Nav.Link>
        <Nav.Link as={Link} to="/admin/freelancers">🧑‍💻 Freelancers</Nav.Link>
        <Nav.Link as={Link} to="/admin/clients">👨‍💼 Clients</Nav.Link>
        <Nav.Link as={Link} to="/admin/messages">💬 Messages</Nav.Link>
        <Nav.Link as={Link} to="/admin/settings">⚙️ Settings</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
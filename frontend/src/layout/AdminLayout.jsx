import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { 
  Grid3x3GapFill, 
  PeopleFill, 
  BriefcaseFill, 
  ChatLeftTextFill, 
  GearFill, 
  BoxArrowRight,
  ChevronLeft,
  List
} from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminServices from '../pages/admin/AdminServices';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Get current path to highlight active menu item
  const currentPath = location.pathname;
  const isActive = (path) => {
    if (path === '/admin' && currentPath === '/admin') {
      return true;
    }
    if (path !== '/admin' && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <div className={`admin-sidebar bg-dark text-white ${sidebarCollapsed ? 'collapsed' : ''}`} 
           style={{ 
             width: sidebarCollapsed ? '80px' : '250px', 
             minHeight: '100vh',
             transition: 'width 0.3s ease'
           }}>
        <div className="p-3 d-flex justify-content-between align-items-center">
          {!sidebarCollapsed && <h4 className="mb-0">Admin Panel</h4>}
          <Button 
            variant="link" 
            className="text-white p-0" 
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? <List size={24} /> : <ChevronLeft size={24} />}
          </Button>
        </div>
        
        <Nav className="flex-column mt-3">
          <Nav.Link 
            as={Link} 
            to="/admin" 
            className={`py-3 ${isActive('/admin') ? 'active bg-primary' : ''}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Grid3x3GapFill className="me-3" size={20} />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </Nav.Link>
          
          <Nav.Link 
            as={Link} 
            to="/admin/users" 
            className={`py-3 ${isActive('/admin/users') ? 'active bg-primary' : ''}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <PeopleFill className="me-3" size={20} />
            {!sidebarCollapsed && <span>Users</span>}
          </Nav.Link>
          
          <Nav.Link 
            as={Link} 
            to="/admin/services" 
            className={`py-3 ${isActive('/admin/services') ? 'active bg-primary' : ''}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <BriefcaseFill className="me-3" size={20} />
            {!sidebarCollapsed && <span>Services</span>}
          </Nav.Link>
          
          <Nav.Link 
            as={Link} 
            to="/admin/messages" 
            className={`py-3 ${isActive('/admin/messages') ? 'active bg-primary' : ''}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ChatLeftTextFill className="me-3" size={20} />
            {!sidebarCollapsed && <span>Messages</span>}
          </Nav.Link>
          
          <Nav.Link 
            as={Link} 
            to="/admin/settings" 
            className={`py-3 ${isActive('/admin/settings') ? 'active bg-primary' : ''}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <GearFill className="me-3" size={20} />
            {!sidebarCollapsed && <span>Settings</span>}
          </Nav.Link>
          
          <Nav.Link 
            onClick={handleLogout}
            className="py-3 mt-5 text-danger"
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <BoxArrowRight className="me-3" size={20} />
            {!sidebarCollapsed && <span>Logout</span>}
          </Nav.Link>
        </Nav>
      </div>
      
      {/* Main Content */}
      <div className="admin-content flex-grow-1" style={{ 
        marginLeft: sidebarCollapsed ? '80px' : '0', 
        transition: 'margin-left 0.3s ease',
        width: sidebarCollapsed ? 'calc(100% - 80px)' : `calc(100% - ${sidebarCollapsed ? '80px' : '250px'})`,
      }}>
        <Container fluid className="py-4">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="messages" element={<div className="p-5 text-center">Messages feature coming soon</div>} />
            <Route path="settings" element={<div className="p-5 text-center">Settings feature coming soon</div>} />
            <Route path="*" element={<div className="p-5 text-center">Page not found</div>} />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;

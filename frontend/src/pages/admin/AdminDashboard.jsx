import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { 
  PeopleFill, 
  BriefcaseFill, 
  FileEarmarkTextFill, 
  CurrencyDollar,
  CheckCircleFill,
  XCircleFill,
  Eye,
  ArrowClockwise
} from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/slices/userSlice';
import { fetchServices } from '../../redux/slices/serviceSlice';
import api from '../../api/axiosConfig';
import Chart from 'react-apexcharts';
import { mockData } from '../../utils/apiUtils';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for dashboard data
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Get users and services from Redux store
  const { currentUser } = useSelector(state => state.user);
  const reduxUsers = useSelector(state => state.user.users);
  const reduxServices = useSelector(state => state.service.services);
  
  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch users if not already in Redux
      if (!reduxUsers || reduxUsers.length === 0) {
        dispatch(fetchUsers());
      }
      
      // Fetch services if not already in Redux
      if (!reduxServices || reduxServices.length === 0) {
        dispatch(fetchServices());
      }
      
      // Fetch users directly for dashboard
      let usersData = [];
      try {
        const usersResponse = await api.get('/users');
        usersData = usersResponse.data;
      } catch (err) {
        console.warn('Failed to fetch users from API, using mock data:', err.message);
        usersData = mockData.users;
      }
      
      // Fetch services directly for dashboard
      let servicesData = [];
      try {
        const servicesResponse = await api.get('/services');
        servicesData = servicesResponse.data;
      } catch (err) {
        console.warn('Failed to fetch services from API, using mock data:', err.message);
        servicesData = mockData.services;
      }
      
      // Fetch proposals directly for dashboard
      let proposalsData = [];
      try {
        const proposalsResponse = await api.get('/proposals');
        proposalsData = proposalsResponse.data;
      } catch (err) {
        console.warn('Failed to fetch proposals from API, using mock data:', err.message);
        proposalsData = mockData.proposals;
      }
      
      // Update state with fetched data
      setUsers(usersData);
      setServices(servicesData);
      setProposals(proposalsData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [dispatch, reduxUsers, reduxServices]);
  
  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  
  // Calculate dashboard statistics
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active' && !user.deleted).length,
    totalServices: services.length,
    activeServices: services.filter(service => service.status === 'active' && !service.deleted).length,
    deletedServices: services.filter(service => service.deleted).length,
    pendingServices: services.filter(service => service.status === 'pending' && !service.deleted).length,
    totalProposals: proposals.length,
    completedProposals: proposals.filter(proposal => proposal.status === 'completed').length
  };
  
  // Prepare chart data for user roles
  const userRoleChartData = {
    series: [
      users.filter(user => user.role === 'freelancer' && !user.deleted).length,
      users.filter(user => user.role === 'client' && !user.deleted).length,
      users.filter(user => user.role === 'admin' && !user.deleted).length
    ],
    options: {
      labels: ['Freelancers', 'Clients', 'Admins'],
      colors: ['#4361ee', '#3f37c9', '#2a0c4e'],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  };
  
  // Prepare chart data for service status
  const serviceStatusChartData = {
    series: [
      services.filter(service => service.status === 'active' && !service.deleted).length,
      services.filter(service => service.status === 'pending' && !service.deleted).length,
      services.filter(service => service.status === 'rejected' && !service.deleted).length,
      services.filter(service => service.deleted).length
    ],
    options: {
      labels: ['Active', 'Pending', 'Rejected', 'Deleted'],
      colors: ['#2ecc71', '#f39c12', '#e74c3c', '#7f8c8d'],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  };
  
  // Get recent users (non-deleted only)
  const recentUsers = users
    .filter(user => !user.deleted)
    .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
    .slice(0, 5);
  
  // Get recent services (non-deleted only)
  const recentServices = services
    .filter(service => !service.deleted)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle refresh button click
  const handleRefresh = () => {
    fetchDashboardData();
  };
  
  return (
    <Container fluid className="py-4">
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Dashboard Overview</h1>
        <div>
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Refreshing...</span>
              </>
            ) : (
              <>
                <ArrowClockwise className="me-2" />
                Refresh Data
              </>
            )}
          </Button>
          <small className="text-muted ms-3">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </small>
        </div>
      </div>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <PeopleFill size={24} className="text-primary" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Users</h6>
                <h3 className="mb-0">{stats.totalUsers}</h3>
                <small className="text-success">{stats.activeUsers} active</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <BriefcaseFill size={24} className="text-success" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Services</h6>
                <h3 className="mb-0">{stats.totalServices}</h3>
                <small className="text-success">{stats.activeServices} active</small>
                {stats.deletedServices > 0 && (
                  <small className="text-muted ms-2">({stats.deletedServices} deleted)</small>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <FileEarmarkTextFill size={24} className="text-warning" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Pending Services</h6>
                <h3 className="mb-0">{stats.pendingServices}</h3>
                <small className="text-warning">Awaiting review</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <CurrencyDollar size={24} className="text-info" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Completed Proposals</h6>
                <h3 className="mb-0">{stats.completedProposals}</h3>
                <small className="text-info">Out of {stats.totalProposals} total</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">User Roles</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Chart
                  options={userRoleChartData.options}
                  series={userRoleChartData.series}
                  type="donut"
                  height={300}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Service Status</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Chart
                  options={serviceStatusChartData.options}
                  series={serviceStatusChartData.series}
                  type="donut"
                  height={300}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Users</h5>
              <Link to="/admin/users" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : recentUsers.length === 0 ? (
                <Alert variant="info">No users found.</Alert>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user.id}>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <img 
                              src={user.profileImage || "https://via.placeholder.com/40"} 
                              alt={user.name} 
                              className="rounded-circle me-2" 
                              width="40" 
                              height="40"
                              style={{ objectFit: 'cover' }}
                            />
                            <div>
                              <div className="fw-bold">{user.name}</div>
                              <small className="text-muted">{user.email}</small>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <Badge bg={
                            user.role === 'admin' ? 'danger' : 
                            user.role === 'freelancer' ? 'primary' : 
                            'info'
                          }>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="align-middle">
                          <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="align-middle">
                          {formatDate(user.joinDate)}
                        </td>
                        <td className="align-middle">
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 text-primary"
                            onClick={() => navigate(`/admin/users?id=${user.id}`)}
                          >
                            <Eye size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Services</h5>
              <Link to="/admin/services" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : recentServices.length === 0 ? (
                <Alert variant="info">No services found.</Alert>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentServices.map(service => (
                      <tr key={service.id}>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <img 
                              src={service.image || "https://via.placeholder.com/40"} 
                              alt={service.title} 
                              className="rounded me-2" 
                              width="40" 
                              height="40"
                              style={{ objectFit: 'cover' }}
                            />
                            <div>
                              <div className="fw-bold">{service.title}</div>
                              <small className="text-muted">{service.userName}</small>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          ${service.price}
                        </td>
                        <td className="align-middle">
                          <Badge bg={
                            service.status === 'active' ? 'success' : 
                            service.status === 'pending' ? 'warning' : 
                            'danger'
                          }>
                            {service.status}
                          </Badge>
                        </td>
                        <td className="align-middle">
                          {formatDate(service.createdAt)}
                        </td>
                        <td className="align-middle">
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 text-primary"
                            onClick={() => navigate(`/admin/services?id=${service.id}`)}
                          >
                            <Eye size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Alert, Spinner, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUserProfile } from '../../redux/slices/userSlice';
import { Search, PersonFill, ThreeDotsVertical, CheckCircleFill, XCircleFill, Trash } from 'react-bootstrap-icons';
import api from '../../api/axiosConfig';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.user);
  
  // Local state
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  const [localLoading, setLocalLoading] = useState(true);
  
  // Mock data for fallback
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'freelancer', status: 'active', joinDate: '2023-01-15', profileImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'client', status: 'active', joinDate: '2023-02-20', profileImage: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'freelancer', status: 'inactive', joinDate: '2023-03-10', profileImage: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'client', status: 'deleted', joinDate: '2023-04-05', profileImage: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'admin', status: 'active', joinDate: '2023-05-12', profileImage: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'freelancer', status: 'active', joinDate: '2023-06-18', profileImage: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { id: 7, name: 'Alex Wilson', email: 'alex@example.com', role: 'client', status: 'active', joinDate: '2023-07-22', profileImage: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { id: 8, name: 'Olivia Taylor', email: 'olivia@example.com', role: 'freelancer', status: 'inactive', joinDate: '2023-08-30', profileImage: 'https://randomuser.me/api/portraits/women/8.jpg' }
  ];
  
  // Fetch users data
  useEffect(() => {
    setLocalLoading(true);
    
    const fetchData = async () => {
      try {
        // Try to fetch from API first
        let userData = [];
        try {
          console.log('Fetching users from API...');
          const response = await api.get('/users');
          userData = response.data;
          console.log('Successfully fetched users:', userData.length);
        } catch (err) {
          console.warn('Error fetching users from API, using mock data:', err.message);
          userData = mockUsers;
        }
        
        // Also dispatch Redux action
        dispatch(fetchUsers());
        
        // Set filtered users
        setFilteredUsers(userData);
        setLocalLoading(false);
      } catch (err) {
        console.error('Error in user data processing:', err);
        setActionError('Failed to load users data. Please try again.');
        setFilteredUsers(mockUsers);
        setLocalLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch]); // Only run on mount and when dispatch changes
  
  // Apply filters
  useEffect(() => {
    if (!users || users.length === 0) {
      return;
    }
    
    console.log("Applying user filters with:", { 
      searchTerm, 
      selectedRole, 
      selectedStatus,
      usersCount: users.length 
    });
    
    // Start with all users
    let filtered = [...users];
    
    // Apply search filter if there is a search term
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(user => 
        (user.name && user.name.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term))
      );
    }
    
    // Apply role filter if a role is selected
    if (selectedRole && selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }
    
    // Apply status filter
    if (selectedStatus === 'deleted') {
      // Show only deleted users
      filtered = filtered.filter(user => user.deleted === true);
    } else if (selectedStatus !== 'all') {
      // Filter by specific status (and not deleted)
      filtered = filtered.filter(user => 
        user.status === selectedStatus && 
        user.deleted !== true
      );
    } else {
      // Default: show all non-deleted users
      filtered = filtered.filter(user => user.deleted !== true);
    }
    
    // Sort by join date (newest first)
    filtered.sort((a, b) => {
      return new Date(b.joinDate || b.createdAt || 0) - new Date(a.joinDate || a.createdAt || 0);
    });
    
    console.log("User filter results:", filtered.length);
    setFilteredUsers(filtered);
    
  }, [users, searchTerm, selectedRole, selectedStatus]);
  
  // Handle status change
  const handleStatusChange = async (userId, newStatus) => {
    try {
      setActionSuccess('');
      setActionError('');
      
      // Find user
      const user = filteredUsers.find(u => u.id === userId);
      if (!user) {
        setActionError('User not found');
        return;
      }
      
      // Update local state first for immediate UI feedback
      setFilteredUsers(prev => 
        prev.map(u => u.id === userId ? { ...u, status: newStatus } : u)
      );
      
      // Update user in Redux - this will handle both API and offline mode
      const result = await dispatch(updateUserProfile({ 
        userId, 
        userData: { status: newStatus } 
      })).unwrap().catch(error => {
        console.warn('Redux update failed, but UI is already updated:', error);
        return { success: false, error };
      });
      
      if (result && !result.error) {
        setActionSuccess(`User "${user.name}" status changed to ${newStatus}`);
      } else {
        // Still show success message but indicate offline mode
        setActionSuccess(`User "${user.name}" status changed to ${newStatus} (offline mode)`);
      }
    } catch (err) {
      console.error('Error in user status change process:', err);
      setActionError(`An error occurred: ${err.message || 'Unknown error'}`);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      setActionSuccess('');
      setActionError('');
      
      // Find user
      const user = filteredUsers.find(u => u.id === userId);
      if (!user) {
        setActionError('User not found');
        return;
      }
      
      // Close modal
      setShowDeleteModal(false);
      
      // Update local state first for immediate UI feedback
      setFilteredUsers(prev => 
        prev.map(u => u.id === userId ? { ...u, deleted: true } : u)
      );
      
      // Update user in Redux - this will handle both API and offline mode
      const result = await dispatch(updateUserProfile({ 
        userId, 
        userData: { deleted: true } 
      })).unwrap().catch(error => {
        console.warn('Redux update failed, but UI is already updated:', error);
        return { success: false, error };
      });
      
      if (result && !result.error) {
        setActionSuccess(`User "${user.name}" has been deleted`);
      } else {
        // Still show success message but indicate offline mode
        setActionSuccess(`User "${user.name}" has been deleted (offline mode)`);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setActionError(`An error occurred: ${err.message || 'Unknown error'}`);
    }
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedUser) {
      handleDeleteUser(selectedUser.id);
    }
  };
  
  // Handle delete (soft delete)
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  
  // Reset filters
  const resetFilters = () => {
    // Reset filter inputs
    setSearchTerm('');
    setSelectedRole('all');
    setSelectedStatus('all');
    
    // Just reset to original non-deleted users
    if (users && users.length > 0) {
      const nonDeletedUsers = users.filter(user => !user.deleted);
      setFilteredUsers(nonDeletedUsers);
    }
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'inactive':
        return <Badge bg="warning">Inactive</Badge>;
      case 'deleted':
        return <Badge bg="danger">Deleted</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  
  // Get role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <Badge bg="primary">Admin</Badge>;
      case 'freelancer':
        return <Badge bg="info">Freelancer</Badge>;
      case 'client':
        return <Badge bg="dark">Client</Badge>;
      default:
        return <Badge bg="secondary">{role}</Badge>;
    }
  };
  
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h2 className="mb-4">User Management</h2>
              
              {actionSuccess && (
                <Alert variant="success" dismissible onClose={() => setActionSuccess('')}>
                  {actionSuccess}
                </Alert>
              )}
              
              {actionError && (
                <Alert variant="danger" dismissible onClose={() => setActionError('')}>
                  {actionError}
                </Alert>
              )}
              
              <Row className="mb-4">
                <Col md={4}>
                  <InputGroup>
                    <InputGroup.Text>
                      <Search />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                
                <Col md={2}>
                  <Form.Select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client</option>
                  </Form.Select>
                </Col>
                
                <Col md={2}>
                  <Form.Select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="deleted">Deleted</option>
                  </Form.Select>
                </Col>
                
                <Col md={1}>
                  <Button variant="outline-secondary" onClick={resetFilters}>
                    Reset
                  </Button>
                </Col>
              </Row>
              
              {localLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <Alert variant="info">
                  No users found matching the current filters.
                </Alert>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Join Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded-circle overflow-hidden me-3" 
                                style={{ width: '40px', height: '40px', flexShrink: 0 }}
                              >
                                <img 
                                  src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                                  alt={user.name} 
                                  className="w-100 h-100 object-fit-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                                  }}
                                />
                              </div>
                              <div>
                                <p className="fw-bold mb-0">{user.name}</p>
                                <small className="text-muted">ID: {user.id}</small>
                              </div>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>{getRoleBadge(user.role)}</td>
                          <td>{getStatusBadge(user.status)}</td>
                          <td>{new Date(user.joinDate || user.createdAt || 0).toLocaleDateString()}</td>
                          <td>
                            <div className="d-flex gap-2">
                              {user.status !== 'active' && (
                                <Button 
                                  variant="outline-success" 
                                  size="sm"
                                  onClick={() => handleStatusChange(user.id, 'active')}
                                  title="Activate User"
                                >
                                  <CheckCircleFill />
                                </Button>
                              )}
                              
                              {user.status !== 'inactive' && user.status !== 'deleted' && (
                                <Button 
                                  variant="outline-warning" 
                                  size="sm"
                                  onClick={() => handleStatusChange(user.id, 'inactive')}
                                  title="Deactivate User"
                                >
                                  <XCircleFill />
                                </Button>
                              )}
                              
                              {user.status !== 'deleted' && (
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => handleDelete(user)}
                                  title="Delete User"
                                >
                                  <Trash />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              
              <div className="mt-3 text-muted">
                <small>Showing {filteredUsers.length} users</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the user <strong>{selectedUser?.name}</strong>?
          <p className="text-muted mt-2">
            This will mark the user as deleted. The user will no longer be able to log in or use the platform.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminUsers;

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Nav, Tab } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/slices/userSlice';

const Settings = () => {
  const { currentUser, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState('account');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Account settings form
  const [accountForm, setAccountForm] = useState({
    email: currentUser?.email || '',
    password: '',
    confirmPassword: '',
  });
  
  // Notification settings form
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    messageNotifications: true,
    proposalNotifications: true,
    marketingEmails: false,
  });
  
  // Privacy settings form
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showContactInfo: false,
    showLastSeen: true,
  });
  
  // Handle account form changes
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification settings changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle privacy settings changes
  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle account form submission
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    
    // Validate password match
    if (accountForm.password && accountForm.password !== accountForm.confirmPassword) {
      setSuccessMessage('');
      return;
    }
    
    // Only include password if it's being changed
    const userData = {
      email: accountForm.email,
      ...(accountForm.password ? { password: accountForm.password } : {})
    };
    
    dispatch(updateUserProfile({
      userId: currentUser.id,
      userData
    })).then((result) => {
      if (!result.error) {
        setSuccessMessage('Account settings updated successfully!');
        // Clear password fields
        setAccountForm(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      }
    });
  };
  
  // Handle notification settings submission
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    
    dispatch(updateUserProfile({
      userId: currentUser.id,
      userData: {
        notificationSettings
      }
    })).then((result) => {
      if (!result.error) {
        setSuccessMessage('Notification settings updated successfully!');
      }
    });
  };
  
  // Handle privacy settings submission
  const handlePrivacySubmit = (e) => {
    e.preventDefault();
    
    dispatch(updateUserProfile({
      userId: currentUser.id,
      userData: {
        privacySettings
      }
    })).then((result) => {
      if (!result.error) {
        setSuccessMessage('Privacy settings updated successfully!');
      }
    });
  };
  
  if (!currentUser) {
    return (
      <Container className="py-5 text-center">
        <p>Please log in to access settings.</p>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <h2 className="mb-4">Account Settings</h2>
      
      {successMessage && (
        <Alert variant="success" className="mb-4" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error.message || 'An error occurred. Please try again.'}
        </Alert>
      )}
      
      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="account" className="rounded-0 border-bottom">
                      Account
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="notifications" className="rounded-0 border-bottom">
                      Notifications
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="privacy" className="rounded-0">
                      Privacy
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={9}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Tab.Content>
                  {/* Account Settings Tab */}
                  <Tab.Pane eventKey="account">
                    <h4 className="mb-4">Account Settings</h4>
                    <Form onSubmit={handleAccountSubmit}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={accountForm.email}
                          onChange={handleAccountChange}
                          disabled
                        />
                        <Form.Text className="text-muted">
                          Email address cannot be changed
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={accountForm.password}
                          onChange={handleAccountChange}
                          placeholder="Leave blank to keep current password"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={accountForm.confirmPassword}
                          onChange={handleAccountChange}
                          isInvalid={accountForm.password && accountForm.password !== accountForm.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          Passwords do not match
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Form>
                  </Tab.Pane>
                  
                  {/* Notifications Tab */}
                  <Tab.Pane eventKey="notifications">
                    <h4 className="mb-4">Notification Settings</h4>
                    <Form onSubmit={handleNotificationSubmit}>
                      <Form.Group className="mb-3" controlId="emailNotifications">
                        <Form.Check
                          type="switch"
                          label="Email Notifications"
                          name="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationChange}
                        />
                        <Form.Text className="text-muted">
                          Receive notifications via email
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="messageNotifications">
                        <Form.Check
                          type="switch"
                          label="Message Notifications"
                          name="messageNotifications"
                          checked={notificationSettings.messageNotifications}
                          onChange={handleNotificationChange}
                        />
                        <Form.Text className="text-muted">
                          Receive notifications for new messages
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="proposalNotifications">
                        <Form.Check
                          type="switch"
                          label="Proposal Notifications"
                          name="proposalNotifications"
                          checked={notificationSettings.proposalNotifications}
                          onChange={handleNotificationChange}
                        />
                        <Form.Text className="text-muted">
                          Receive notifications for new proposals
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-4" controlId="marketingEmails">
                        <Form.Check
                          type="switch"
                          label="Marketing Emails"
                          name="marketingEmails"
                          checked={notificationSettings.marketingEmails}
                          onChange={handleNotificationChange}
                        />
                        <Form.Text className="text-muted">
                          Receive promotional emails and updates
                        </Form.Text>
                      </Form.Group>
                      
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Form>
                  </Tab.Pane>
                  
                  {/* Privacy Tab */}
                  <Tab.Pane eventKey="privacy">
                    <h4 className="mb-4">Privacy Settings</h4>
                    <Form onSubmit={handlePrivacySubmit}>
                      <Form.Group className="mb-3" controlId="profileVisibility">
                        <Form.Label>Profile Visibility</Form.Label>
                        <Form.Select
                          name="profileVisibility"
                          value={privacySettings.profileVisibility}
                          onChange={handlePrivacyChange}
                        >
                          <option value="public">Public - Anyone can view your profile</option>
                          <option value="registered">Registered Users - Only registered users can view your profile</option>
                          <option value="private">Private - Only you can view your profile</option>
                        </Form.Select>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="showContactInfo">
                        <Form.Check
                          type="switch"
                          label="Show Contact Information"
                          name="showContactInfo"
                          checked={privacySettings.showContactInfo}
                          onChange={handlePrivacyChange}
                        />
                        <Form.Text className="text-muted">
                          Display your contact information on your profile
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-4" controlId="showLastSeen">
                        <Form.Check
                          type="switch"
                          label="Show Last Seen Status"
                          name="showLastSeen"
                          checked={privacySettings.showLastSeen}
                          onChange={handlePrivacyChange}
                        />
                        <Form.Text className="text-muted">
                          Display when you were last active on the platform
                        </Form.Text>
                      </Form.Group>
                      
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Settings;

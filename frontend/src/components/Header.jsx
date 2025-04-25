/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
  Overlay,
  Popover,
  Badge,
  Image,
  Spinner,
} from "react-bootstrap";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaEnvelope,
  FaBell,
  FaTruck,
  FaBars,
  FaSignOutAlt,
  FaCog,
  FaBookmark,
  FaQuestionCircle,
  FaTachometerAlt,
  FaSun,
  FaMoon,
  FaPlus
} from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';
import { fetchServices } from '../redux/slices/serviceSlice';
import { fetchConversations } from '../redux/slices/chatSlice';
import { fetchNotifications } from '../redux/slices/notificationSlice';
import "../styles/header.css"; // Import your CSS file

function Header() {
  const { isAuthenticated, currentUser, userRole } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const { services, loading: servicesLoading } = useSelector(state => state.service);
  const { conversations } = useSelector(state => state.chat);
  const { notifications, unreadCount: notificationsCount } = useSelector(state => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // State for managing dropdowns with consolidated naming convention
  const [dropdowns, setDropdowns] = useState({
    categories: false,
    search: false,
    expandMenu: false,
    messages: false,
    notifications: false,
    profileMenu: false,
  });
  
  // State for categories
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Refs for handling click outside events
  const refs = {
    categories: useRef(null),
    search: useRef(null),
    expandMenu: useRef(null),
    messages: useRef(null),
    notifications: useRef(null),
    profileMenu: useRef(null),
  };

  // Toggle dropdown function - closes other dropdowns when opening one
  const toggleDropdown = (dropdown) => {
    const newState = { ...dropdowns };

    // Close all other dropdowns
    Object.keys(newState).forEach((key) => {
      newState[key] = key === dropdown ? !newState[key] : false;
    });

    setDropdowns(newState);
  };

  // Handle clicks outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(refs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to render notification badge
  const renderBadge = (count) => {
    return count > 0 ? (
      <Badge
        pill
        bg="danger"
        className="position-absolute top-0 end-0 translate-middle"
      >
        {count}
      </Badge>
    ) : null;
  };
  
  // Get unread messages count from conversations
  const unreadMessagesCount = conversations?.reduce((total, conv) => total + (conv.unreadCount || 0), 0) || 0;
  
  // Get unread notifications count from notification slice
  const unreadNotificationsCount = notificationsCount || 0;
  
  // Fetch data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser?.id) {
      // Fetch user's conversations for messages count
      dispatch(fetchConversations(currentUser.id));
      
      // Fetch notifications
      dispatch(fetchNotifications(currentUser.id));
      
      // Fetch services
      dispatch(fetchServices());
    }
  }, [isAuthenticated, currentUser, dispatch]);
  
  // Fetch categories from loaded services in Redux
  useEffect(() => {
    if (services && services.length > 0) {
      const uniqueCategories = [...new Set(services.map(s => s.category).filter(Boolean))];
      setCategories(uniqueCategories.map(cat => cat));
    } else {
      dispatch(fetchServices());
      setCategories([]);
    }
  }, [services, dispatch]);

  // Toggle theme function
  const handleToggleTheme = () => {
    dispatch({ type: 'theme/toggleTheme' });
  };

  return (
    <header className="header-component">
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
        <Container>
          {/* Left section: Logo and Categories */}
          <div className="d-flex align-items-center">
            {/* Logo */}
            <Navbar.Brand href="#home" className="me-4">
              <img
                src="10002.png"
                alt="Logo"
                height="36"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>

            {/* Categories Dropdown */}
            <div ref={refs.categories} className="me-3">
              <Button
                variant="outline-light"
                size="sm"
                className="rounded-pill py-1 px-3 category-btn shadow-sm"
                onClick={() => toggleDropdown("categories")}
                aria-expanded={dropdowns.categories}>
                Categories
              </Button>
            </div>

            {/* Add Service Button - Only show when logged in */}
            {isAuthenticated && userRole === 'freelancer' && (
              <Button
                variant="outline-light"
                size="sm"
                className="rounded-pill py-1 px-3 category-btn shadow-sm"
                onClick={() => navigate('/add/service')}
              >
                <FaPlus className="me-1" size={12} /> Add Service
              </Button>
            )}
          </div>

          {/* Responsive navbar toggle */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="ms-auto d-lg-none border-0 custom-toggler"
          />

          {/* Right section: Search, cart, notifications, etc. */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <Nav className="align-items-center nav-icons-container">
              {/* Theme Toggle Button */}
              <div className="me-3">
                <button
                  className="theme-toggle-btn"
                  onClick={handleToggleTheme}
                  aria-label="Toggle theme"
                  title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                  {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                </button>
              </div>

              {/* Search Button */}
              <div ref={refs.search} className="position-relative icon-wrapper">
                <Nav.Link
                  className="nav-icon"
                  onClick={() => toggleDropdown("search")}
                >
                  <FaSearch size={18} />
                </Nav.Link>
              </div>

              {/* Shopping Cart */}
              <div className="icon-wrapper">
                <Nav.Link
                  href="#cart"
                  className="nav-icon"
                  aria-label="Shopping Cart">
                  <FaShoppingCart />
                </Nav.Link>
              </div>

              {/* Login/Signup buttons for not logged in users */}
              {!isAuthenticated && (
                <div className="d-flex align-items-center auth-buttons">
                  <Link to="/login">
                    <Button
                      variant="outline-primary"
                      className="me-2 btn-sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" className="btn-sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Logged in user features */}
              {isAuthenticated && (
                <>
                  {/* Notifications Dropdown */}
                  <div
                    ref={refs.notifications}
                    className="position-relative icon-wrapper">
                    <Nav.Link
                      className="nav-icon"
                      onClick={() => toggleDropdown("notifications")}
                    >
                      <FaBell size={18} />
                      {renderBadge(unreadNotificationsCount)}
                    </Nav.Link>

                    <Overlay
                      show={dropdowns.notifications}
                      target={refs.notifications.current}
                      placement="bottom"
                      container={refs.notifications.current}
                      containerPadding={20}
                    >
                      <Popover id="popover-notifications" className="notifications-popover shadow-lg border-0">
                        <Popover.Header className="bg-white border-0 pb-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 fw-bold">Notifications</h6>
                            <Button 
                              variant="link" 
                              className="p-0 text-decoration-none small"
                              onClick={() => dispatch({ type: 'notification/markAllAsRead' })}
                            >
                              Mark all as read
                            </Button>
                          </div>
                        </Popover.Header>
                        <Popover.Body>
                          {notifications && notifications.length > 0 ? (
                            notifications.slice(0, 5).map(notification => {
                              // Format timestamp to relative time
                              const notifTime = new Date(notification.createdAt);
                              const now = new Date();
                              const diffMs = now - notifTime;
                              const diffMins = Math.floor(diffMs / 60000);
                              const diffHours = Math.floor(diffMins / 60);
                              const diffDays = Math.floor(diffHours / 24);
                              
                              let timeAgo;
                              if (diffDays > 0) {
                                timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                              } else if (diffHours > 0) {
                                timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                              } else if (diffMins > 0) {
                                timeAgo = `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
                              } else {
                                timeAgo = 'Just now';
                              }
                              
                              // Determine icon based on notification type
                              let icon;
                              let bgColor;
                              
                              if (notification.type === 'message') {
                                icon = <FaEnvelope size={14} />;
                                bgColor = 'bg-primary';
                              } else if (notification.type === 'proposal') {
                                icon = <FaShoppingCart size={14} />;
                                bgColor = 'bg-success';
                              } else {
                                icon = <FaBell size={14} />;
                                bgColor = 'bg-info';
                              }
                              
                              return (
                                <div 
                                  key={notification.id} 
                                  className={`notification-item d-flex p-2 border-bottom ${!notification.read ? 'bg-light' : ''}`}
                                  onClick={() => {
                                    if (notification.type === 'message') {
                                      navigate(`/chat/${notification.sourceId}`);
                                    } else if (notification.type === 'proposal') {
                                      navigate(`/proposals/${notification.sourceId}`);
                                    }
                                    dispatch({ type: 'notification/markAsRead', payload: notification.id });
                                    setDropdowns(prev => ({ ...prev, notifications: false }));
                                  }}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <div className={`notification-icon me-3 ${bgColor} text-white rounded-circle d-flex align-items-center justify-content-center`} style={{width: 36, height: 36}}>
                                    {icon}
                                  </div>
                                  <div>
                                    <p className="small mb-0">{notification.content}</p>
                                    <small className="text-muted">{timeAgo}</small>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center py-3">
                              <p className="mb-0">No notifications</p>
                              <small className="text-muted">You're all caught up!</small>
                            </div>
                          )}
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>

                  {/* Messages Dropdown */}
                  <div
                    ref={refs.messages}
                    className="position-relative icon-wrapper">
                    <Nav.Link
                      className="nav-icon"
                      onClick={() => toggleDropdown("messages")}
                    >
                      <FaEnvelope size={18} />
                      {renderBadge(unreadMessagesCount)}
                    </Nav.Link>

                    <Overlay
                      show={dropdowns.messages}
                      target={refs.messages.current}
                      placement="bottom"
                      container={refs.messages.current}
                      containerPadding={20}
                    >
                      <Popover id="popover-messages" className="messages-popover shadow-lg border-0">
                        <Popover.Header className="bg-white border-0 pb-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 fw-bold">Messages</h6>
                            <Link to="/chat" className="text-decoration-none small" onClick={() => setDropdowns(prev => ({ ...prev, messages: false }))}>View All</Link>
                          </div>
                        </Popover.Header>
                        <Popover.Body>
                          {conversations && conversations.length > 0 ? (
                            conversations.slice(0, 3).map(conversation => {
                              // Format timestamp to relative time
                              const messageTime = new Date(conversation.lastMessageTime);
                              const now = new Date();
                              const diffMs = now - messageTime;
                              const diffMins = Math.floor(diffMs / 60000);
                              const diffHours = Math.floor(diffMins / 60);
                              const diffDays = Math.floor(diffHours / 24);
                              
                              let timeAgo;
                              if (diffDays > 0) {
                                timeAgo = `${diffDays}d ago`;
                              } else if (diffHours > 0) {
                                timeAgo = `${diffHours}h ago`;
                              } else if (diffMins > 0) {
                                timeAgo = `${diffMins}m ago`;
                              } else {
                                timeAgo = 'Just now';
                              }
                              
                              return (
                                <div key={conversation.id} className="message-item d-flex p-2 border-bottom">
                                  <Image 
                                    src="https://i.imgur.com/JFHjdNZ.jpeg" 
                                    roundedCircle 
                                    width={40} 
                                    height={40} 
                                    className="me-2" 
                                  />
                                  <div>
                                    <div className="d-flex justify-content-between">
                                      <span className="fw-semibold">
                                        {conversation.participants && conversation.participants.length > 0 
                                          ? (conversation.participants[0] === currentUser?.id 
                                              ? 'User ' + conversation.participants[1]
                                              : 'User ' + conversation.participants[0])
                                          : 'Unknown User'}
                                      </span>
                                      <small className="text-muted">{timeAgo}</small>
                                    </div>
                                    <p className="small text-truncate mb-0">
                                      {conversation.lastMessage && conversation.lastMessage.length > 30
                                        ? conversation.lastMessage.substring(0, 30) + '...'
                                        : conversation.lastMessage || 'No message'}
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center py-3">
                              <p className="mb-0">No messages yet</p>
                              <small className="text-muted">Start a conversation with a freelancer</small>
                            </div>
                          )}
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>

                  {/* User Profile Dropdown */}
                  <div
                    ref={refs.profileMenu}
                    className="position-relative icon-wrapper">
                    <Nav.Link
                      onClick={() => toggleDropdown("profileMenu")}
                      className="p-0 profile-link"
                      aria-label="Profile">
                      <Image
                        src={currentUser?.profileImage || "https://i.imgur.com/JFHjdNZ.jpeg"}
                        roundedCircle
                        width={32}
                        height={32}
                        className="profile-pic"
                      />
                    </Nav.Link>

                    <Overlay
                      show={dropdowns.profileMenu}
                      target={refs.profileMenu.current}
                      placement="bottom-end"
                      container={refs.profileMenu.current}
                      containerPadding={20}>
                      <Popover
                        id="profile-menu-popover"
                        className="border-0 shadow-custom">
                        <Popover.Header className="bg-light d-flex align-items-center popup-header">
                          <Image
                            src={currentUser?.profileImage || "https://i.imgur.com/JFHjdNZ.jpeg"}
                            roundedCircle
                            width={40}
                            height={40}
                            className="me-2"
                          />
                          <div>
                            <h6 className="mb-0 fw-bold">{currentUser?.name || 'User'}</h6>
                            <small className="text-muted">{userRole && userRole.charAt(0).toUpperCase() + userRole.slice(1)}</small>
                          </div>
                        </Popover.Header>
                        <Popover.Body className="p-0">
                          <Nav className="flex-column">
                            <Link
                              to={`/profile/${currentUser?.id}`}
                              className="nav-link px-3 py-2 text-dark menu-item">
                              <span className="menu-icon me-2">
                                <FaUser />
                              </span>
                              Profile
                            </Link>
                            <Link
                              to="/dashboard"
                              className="nav-link px-3 py-2 text-dark menu-item">
                              <span className="menu-icon me-2">
                                <FaTachometerAlt />
                              </span>
                              Dashboard
                            </Link>
                            <Link
                              to="/saved-services"
                              className="nav-link px-3 py-2 text-dark menu-item">
                              <span className="menu-icon me-2">
                                <FaBookmark />
                              </span>
                              Saved Services
                            </Link>
                            <Link
                              to="/settings"
                              className="nav-link px-3 py-2 text-dark menu-item">
                              <span className="menu-icon me-2">
                                <FaCog />
                              </span>
                              Settings
                            </Link>
                            <Link
                              to="/help"
                              className="nav-link px-3 py-2 text-dark menu-item">
                              <span className="menu-icon me-2">
                                <FaQuestionCircle />
                              </span>
                              Help & Support
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="nav-link px-3 py-2 text-dark menu-item w-100 text-start border-0 bg-transparent">
                              <span className="menu-icon me-2">
                                <FaSignOutAlt />
                              </span>
                              Logout
                            </button>
                          </Nav>
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                </>
              )}

              {/* Expand Menu Button */}
              <div
                ref={refs.expandMenu}
                className="position-relative icon-wrapper">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="py-1 px-2 d-lg-none expand-menu-btn"
                  onClick={() => toggleDropdown("expandMenu")}
                  aria-expanded={dropdowns.expandMenu}>
                  <FaBars />
                </Button>

                <Overlay
                  show={dropdowns.expandMenu}
                  target={refs.expandMenu.current}
                  placement="bottom-end"
                  container={refs.expandMenu.current}
                  containerPadding={20}>
                  <Popover
                    id="expand-menu-popover"
                    className="border-0 shadow-custom expandable-menu">
                    <Popover.Body className="p-0">
                      <Nav className="flex-column">
                        <Link
                          to={`/profile/${currentUser?.id}`}
                          className="nav-link px-3 py-2 text-dark menu-item">
                          <span className="menu-icon me-2">
                            <FaUser />
                          </span>
                          Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          className="nav-link px-3 py-2 text-dark menu-item">
                          <span className="menu-icon me-2">
                            <FaTachometerAlt />
                          </span>
                          Dashboard
                        </Link>
                        <Link
                          to="/saved-services"
                          className="nav-link px-3 py-2 text-dark menu-item">
                          <span className="menu-icon me-2">
                            <FaBookmark />
                          </span>
                          Saved Services
                        </Link>
                        <Link
                          to="/settings"
                          className="nav-link px-3 py-2 text-dark menu-item">
                          <span className="menu-icon me-2">
                            <FaCog />
                          </span>
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="nav-link px-3 py-2 text-dark menu-item w-100 text-start border-0 bg-transparent">
                          <span className="menu-icon me-2">
                            <FaSignOutAlt />
                          </span>
                          Logout
                        </button>
                      </Nav>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Full-width Search Dropdown */}
      {dropdowns.search && (
        <div className="position-absolute w-100 bg-light shadow-sm py-3 search-dropdown">
          <Container>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search..."
                className="me-2 search-input"
                aria-label="Search"
                autoFocus
              />
              <Button variant="primary" className="search-btn">
                Search
              </Button>
            </Form>
          </Container>
        </div>
      )}

      {/* Categories Dropdown */}
      {dropdowns.categories && (
        <div className="position-absolute w-100 bg-white shadow-sm py-3 categories-dropdown">
          <Container>
            <div className="categories-dropdown-content" style={{ display: dropdowns.categories ? 'block' : 'none' }}>
              {categoriesLoading ? (
                <div className="py-5 text-center">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading categories...</p>
                </div>
              ) : (
                <div className="row py-4">
                  {/* Group categories into columns */}
                  {categories.length > 0 ? (
                    // Split categories into groups of 3-4 for columns
                    Array.from({ length: Math.ceil(categories.length / 4) }).map((_, colIndex) => {
                      const startIdx = colIndex * 4;
                      const colCategories = categories.slice(startIdx, startIdx + 4);
                      
                      return (
                        <div key={colIndex} className="col-6 col-md-4 col-lg-3 col-xl-2 mb-3 category-column">
                          <h6 className="fw-bold text-capitalize category-title">
                            {colCategories[0]}
                          </h6>
                          <ul className="list-unstyled small category-list">
                            {colCategories.map((category, idx) => (
                              <li key={idx} className="category-item">
                                <Link 
                                  to={`/services?category=${encodeURIComponent(category.toLowerCase().replace(/ /g, '-'))}`} 
                                  className="text-decoration-none text-dark d-block py-1 category-link"
                                  onClick={() => setDropdowns(prev => ({ ...prev, categories: false }))}
                                >
                                  {category}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-12 text-center py-4">
                      <p>No categories found</p>
                    </div>
                  )}
                </div>
              )}
              <div className="text-center mt-3">
                <Link to="/services" className="btn btn-outline-primary btn-sm">View All Categories</Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

export { Header };

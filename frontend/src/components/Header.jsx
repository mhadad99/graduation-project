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
} from "react-bootstrap";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaEnvelope,
  FaBell,
  FaTruck,
  FaBars,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { ChatDots } from "react-bootstrap-icons";
import "../styles/header.css"; // Import your CSS file
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

import { NavLink } from "react-router-dom";
import { getMyProfileAction } from "../store/slices/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((myStore) => myStore.authSlice);
  const { isLoading, user } = useSelector((state) => state.userSlice);

  // let isLoggedIn = false

  const navigate = useNavigate(); // Initialize navigate  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
    
    navigate("/login"); // Redirect to the login page
  };
  
  useEffect(() => {
    dispatch(getMyProfileAction());
  }, []);

  // Redux state for theme management
  const { theme } = useSelector((state) => state.themeSlice);
  // const { role } = useSelector((state) => state.authSlice);

  // Redux state for theme management
  // State for managing dropdowns with consolidated naming convention
  const [dropdowns, setDropdowns] = useState({
    categories: false,
    search: false,
    expandMenu: false,
    messages: false,
    notifications: false,
    profileMenu: false,
  });

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
  });

  const notifications = [
    {
      id: 1,
      content: "Your order has been shipped",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 2,
      content: "New comment on your service",
      time: "5 hours ago",
      unread: true,
    },
    { id: 3, content: "Payment received", time: "Yesterday", unread: false },
  ];

  const profileMenuOptions = [
    { icon: <FaUser />, text: "Profile" },
    { icon: <FaShoppingCart />, text: "Saved" },
    { icon: <FaEnvelope />, text: "Balance" },
    { icon: <FaBell />, text: "Settings" },
    { icon: <FaUser />, text: "Edit my account" },
    { icon: <FaTruck />, text: "Help" },
    { icon: <FaUser />, text: "Logout" },
  ];

  const expandMenuOptions = [
    { icon: <FaUser />, text: "My Profile" },
    { icon: <FaShoppingCart />, text: "My Services" },
    { icon: <FaEnvelope />, text: "Messages" },
    { icon: <FaBell />, text: "Notifications" },
    { icon: <FaUser />, text: "Settings" },
    { icon: <FaUser />, text: "Logout" },
  ];

  // Function to render notification badge
  const renderBadge = (items) => {
    const count = items.filter((item) => item.unread).length;
    return count > 0 ? (
      <Badge
        bg="danger"
        pill
        className="position-absolute top-0 end-0 notification-badge">
        {count}
      </Badge>
    ) : null;
  };

  // Toggle theme function
  const handleToggleTheme = () => {
    dispatch({ type: "theme/toggleTheme" });
  };

  const renderActionButton = () => {
    if (!isLoggedIn || !user) return null;

    return (
      <div className="action-button-wrapper ms-auto me-4">
        {user.user_type === "freelancer" ? (
          <Link to="/0/service" className="add-action-btn">
            <span className="btn-text">Add Service</span>
            <span className="btn-icon">+</span>
          </Link>
        ) : (
          <Link to="/add/project" className="add-action-btn">
            <span className="btn-text">Post a Project</span>
            <span className="btn-icon">+</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <header className="header-component">
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
        <Container>
          {/* Left section: Logo and Categories */}
          <div className="d-flex align-items-center">
            {/* Logo */}
            <Navbar.Brand href="/" className="me-4">
              <svg width="120" height="40" viewBox="0 0 120 40">
                <text
                  x="10"
                  y="30"
                  className="logo-text"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "24px",
                  }}>
                  <tspan fill="#ffffff">Tan</tspan>
                  <tspan fill="#0d6efd">feez</tspan>
                  <tspan fill="#20c997">.</tspan>
                </text>
              </svg>
            </Navbar.Brand>
          </div>

          <Nav className="me-auto main-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link nav-link-custom ${isActive ? "active" : ""}`
              }>
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `nav-link nav-link-custom ${isActive ? "active" : ""}`
              }>
              Projects
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `nav-link nav-link-custom ${isActive ? "active" : ""}`
              }>
              Services
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link nav-link-custom ${isActive ? "active" : ""}`
              }>
              About Us
            </NavLink>
          </Nav>

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
              {/* Login/Signup buttons for not logged in users */}
              {!isLoggedIn && (
                <div className="d-flex align-items-center auth-buttons">
                  <Link
                    to={"register"}
                    variant="outline-secondary"
                    size="sm"
                    className="me-2 text-white border-0 signup-btn">
                    <FaUser className="me-1" /> Register
                  </Link>
                  <Link
                    to={"/login"}
                    variant="outline-secondary"
                    size="sm"
                    className="text-white border-0 login-btn">
                    <FaUser className="me-1" /> Login
                  </Link>
                </div>
              )}

              {/* Logged in user features */}
              {isLoggedIn && (
                <>
                  {/* post prject or service  */}
                  {renderActionButton()}
                  {/* Notifications Dropdown */}
                  <div
                    ref={refs.notifications}
                    className="position-relative icon-wrapper">
                    <Nav.Link
                      onClick={() => toggleDropdown("notifications")}
                      className="nav-icon"
                      aria-label="Notifications">
                      <FaBell />
                      {renderBadge(notifications)}
                    </Nav.Link>

                    <Overlay
                      show={dropdowns.notifications}
                      target={refs.notifications.current}
                      placement="bottom-end"
                      container={refs.notifications.current}
                      containerPadding={20}>
                      <Popover
                        id="notifications-popover"
                        className="border-0 shadow-custom">
                        <Popover.Header className="bg-light d-flex justify-content-between align-items-center popup-header">
                          <span>Notifications</span>

                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 text-muted mark-read-btn">
                            Mark all as read
                          </Button>
                        </Popover.Header>
                        <Popover.Body className="p-0">
                          {notifications.length > 0 ? (
                            <div className="notification-list">
                              {notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`notification-item p-2 border-bottom ${
                                    notification.unread ? "bg-light" : ""
                                  }`}>
                                  <div className="d-flex justify-content-between">
                                    <span className="notification-content">
                                      {notification.content}
                                    </span>
                                    {notification.unread && (
                                      <span className="text-primary unread-indicator">
                                        •
                                      </span>
                                    )}
                                  </div>
                                  <small className="text-muted notification-time">
                                    {notification.time}
                                  </small>
                                </div>
                              ))}
                              <div className="text-center py-2">
                                <a
                                  href="#all-notifications"
                                  className="text-decoration-none see-all-link">
                                  See all notifications
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 text-center">
                              No notifications
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
                    <NavLink
                      // onClick={() => toggleDropdown("messages")}
                      className="nav-icon"
                      aria-label="Messages"
                      to={isLoggedIn ? "/chat" : "/chat"}>
                      <FaEnvelope />
                      {/* {renderBadge(messages)} */}
                    </NavLink>
                  </div>

                  {/* Incoming Requests - Hide on smaller screens */}
                  {/* <div className="icon-wrapper d-none d-lg-block">
                    <Nav.Link
                      href="#incoming"
                      className="nav-icon incoming-requests">
                      <span className="d-none d-xl-inline ms-1">
                        Incoming requests
                      </span>
                    </Nav.Link>
                  </div> */}

                  {/* Profile Picture with Dropdown */}
                  <div
                    ref={refs.profileMenu}
                    className="position-relative icon-wrapper">
                    <Nav.Link
                      onClick={() => toggleDropdown("profileMenu")}
                      className="p-0 profile-link"
                      aria-label="Profile">
                      <Image
                        src={!user.photo?'/avatar.png': user.photo}
                        roundedCircle
                        width="32"
                        height="32"
                        className="border border-2 border-light profile-image shadow"
                        alt="Profile"
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
                            src={user.photo == null?'/avatar.png': user.photo}
                            roundedCircle
                            width="40"
                            height="40"
                            className="border me-2"
                            alt="Profile"
                          />
                          <div>
                            <div className="fw-bold">{user.first_name} {user.second_name}</div>
                            <div className="small text-muted">
                              {user.email}
                            </div>
                          </div>
                        </Popover.Header>
                        <Popover.Body className="p-0">
                          <Nav className="flex-column">
                            {profileMenuOptions.map((option, idx) => (
                              <Nav.Link
                                key={idx}
                                onClick={option.text === 'Logout' ? handleLogout : undefined} // Call handleLogout for Logout
                                href={option.text !== 'Logout' ?(option.text === 'Profile' ? `/profile/${user.id}` :`/${option.text.toLowerCase().replace(/ /g, '-')}` ): undefined}
                                className="px-3 py-2 text-dark menu-item"
                              >
                                <span className="menu-icon me-2">{option.icon}</span>
                                {option.text}
                              </Nav.Link>
                            ))}
                          </Nav>
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                </>
              )}
              {/* Theme Toggle Button */}
              <div className="me-3">
                <button
                  className="theme-toggle-btn"
                  onClick={handleToggleTheme}
                  aria-label="Toggle theme"
                  title={
                    theme === "light"
                      ? "Switch to dark mode"
                      : "Switch to light mode"
                  }>
                  {theme === "light" ? (
                    <FaMoon size={26} />
                  ) : (
                    <FaSun size={26} />
                  )}
                </button>
              </div>
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
                        {expandMenuOptions.map((option, idx) => (
                          <Nav.Link
                            key={idx}
                            href={`#${option.text
                              .toLowerCase()
                              .replace(/ /g, "-")}`}
                            className="px-3 py-2 text-dark menu-item">
                            <span className="menu-icon me-2">
                              {option.icon}
                            </span>
                            {option.text}
                          </Nav.Link>
                        ))}
                      </Nav>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

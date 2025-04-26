/** @format */
import { useDispatch, useSelector } from "react-redux";
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
import { ChatDots } from "react-bootstrap-icons";
import "../styles/header.css"; // Import your CSS file

export const Header = ({ isLoggedIn = false }) => {
  // Redux state for theme management
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

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

  // Sample data for messages and notifications
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      content: "Hi, I'm interested in your service",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Jane Smith",
      content: "Thanks for your quick response",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      sender: "Mike Johnson",
      content: "When can we schedule a call?",
      time: "2 days ago",
      unread: true,
    },
  ];

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

  // Categories data structure
  const categories = [
    {
      title: "Programming and development",
      items: [
        "WordPress",
        "Website development",
        "Technical support",
        "Software development",
        "Create an online store",
        "Mobile application programming",
      ],
    },
    {
      title: "Digital marketing",
      items: [
        "Marketing plans",
        "Marketing Consulting",
        "Search Engine Optimization",
        "Social media ads",
        "Social media account management",
        "Social media marketing",
      ],
    },
    {
      title: "Writing and translation",
      items: [
        "Translation",
        "Creative writing",
        "Specialized content",
        "Website content",
        "Marketing content",
        "Academic and professional content",
      ],
    },
    {
      title: "Design",
      items: [
        "Edit and enhance photos",
        "Design advertising banners",
        "Social media designs",
        "Website and application design",
        "Logos and brand identities",
        "Marketing designs",
      ],
    },
    {
      title: "Audio",
      items: [
        "Singing",
        "Voiceover",
        "IVR",
        "Audiobook production",
        "Sound engineering",
        "Music production and composition",
      ],
    },
    {
      title: "Works",
      items: [
        "Business Administration",
        "Business Planning",
        "Business Consulting",
        "E-commerce",
        "Legal services",
        "Financial and accounting services",
      ],
    },
    {
      title: "Engineering and Architecture",
      items: [
        "Architecture",
        "Civil and Structural Engineering",
        "Mechanical Engineering",
        "Electronics Engineering",
        "Electrical Engineering",
        "Engineering Consultations",
      ],
    },
    {
      title: "Video and animation",
      items: [
        "Intro design",
        "Video editing",
        "Animation and motion graphics",
        "Marketing videos",
        "Social media videos",
      ],
    },
    {
      title: "Lifestyle",
      items: ["Personal consultations"],
    },
    {
      title: "Data",
      items: ["Data entry"],
    },
    {
      title: "Distance learning",
      items: ["Learn languages"],
    },
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

  return (
    <header className="header-component">
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
        <Container>
          {/* Left section: Logo and Categories */}
          <div className="d-flex align-items-center">
            {/* Logo */}
            <Navbar.Brand href="/" className="me-4">
              <img
                src="/logo/logo3.png"
                alt="Logo"
                height="60"
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
            {!isLoggedIn && (
              <Button
                variant="outline-light"
                size="sm"
                className="py-1 px-3 d-none d-md-block add-service-btn"
                href="/add/service">
                Add a service <span className="ms-1">+</span>
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
                  title={
                    theme === "light"
                      ? "Switch to dark mode"
                      : "Switch to light mode"
                  }>
                  {theme === "light" ? (
                    <FaMoon size={18} />
                  ) : (
                    <FaSun size={18} />
                  )}
                </button>
              </div>

              {/* Search Button */}
              <div ref={refs.search} className="position-relative icon-wrapper">
                <Nav.Link
                  onClick={() => toggleDropdown("search")}
                  className="nav-icon shadow-sm"
                  aria-label="Search">
                  <FaSearch />
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
              {isLoggedIn && (
                <div className="d-flex align-items-center auth-buttons">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-2 text-white border-0 signup-btn">
                    <FaUser className="me-1" /> New account
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="text-white border-0 login-btn">
                    <FaUser className="me-1" /> Login
                  </Button>
                </div>
              )}

              {/* Logged in user features */}
              {!isLoggedIn && (
                <>
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
                    <Nav.Link
                      onClick={() => toggleDropdown("messages")}
                      className="nav-icon"
                      aria-label="Messages">
                      <FaEnvelope />
                      {renderBadge(messages)}
                    </Nav.Link>

                    <Overlay
                      show={dropdowns.messages}
                      target={refs.messages.current}
                      placement="bottom-end"
                      container={refs.messages.current}
                      containerPadding={20}>
                      <Popover
                        id="messages-popover"
                        className="border-0 shadow-custom">
                        <Popover.Header className="bg-light popup-header">
                          Messages
                        </Popover.Header>
                        <Popover.Body className="p-0">
                          {messages.length > 0 ? (
                            <div className="message-list">
                              {messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`message-item p-2 border-bottom ${
                                    message.unread ? "bg-light" : ""
                                  }`}>
                                  <div className="d-flex justify-content-between">
                                    <strong className="message-sender">
                                      {message.sender}
                                    </strong>
                                    {message.unread && (
                                      <span className="text-primary unread-indicator">
                                        •
                                      </span>
                                    )}
                                  </div>
                                  <div className="message-content text-truncate">
                                    {message.content}
                                  </div>
                                  <small className="text-muted message-time">
                                    {message.time}
                                  </small>
                                </div>
                              ))}
                              <div className="text-center py-2">
                                <a
                                  href="#all-messages"
                                  className="text-decoration-none see-all-link">
                                  See all messages
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 text-center">No messages</div>
                          )}
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>

                  {/* Incoming Requests - Hide on smaller screens */}
                  <div className="icon-wrapper d-none d-lg-block">
                    <Nav.Link
                      href="#incoming"
                      className="nav-icon incoming-requests">
                      <FaTruck />{" "}
                      <span className="d-none d-xl-inline ms-1">
                        Incoming requests
                      </span>
                    </Nav.Link>
                  </div>

                  {/* Profile Picture with Dropdown */}
                  <div
                    ref={refs.profileMenu}
                    className="position-relative icon-wrapper">
                    <Nav.Link
                      onClick={() => toggleDropdown("profileMenu")}
                      className="p-0 profile-link"
                      aria-label="Profile">
                      <Image
                        src="https://i.imgur.com/6AglEUF.jpeg"
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
                            src="https://i.imgur.com/6AglEUF.jpeg"
                            roundedCircle
                            width="40"
                            height="40"
                            className="border me-2"
                            alt="Profile"
                          />
                          <div>
                            <div className="fw-bold">Ayman Samir</div>
                            <div className="small text-muted">
                              Ayman@gmail.com
                            </div>
                          </div>
                        </Popover.Header>
                        <Popover.Body className="p-0">
                          <Nav className="flex-column">
                            {profileMenuOptions.map((option, idx) => (
                              <Nav.Link
                                key={idx}
                                href={`/${option.text
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
            {isLoggedIn && (
              <Nav className="ms-auto">
                <Nav.Link
                  as={Link}
                  to="/chat"
                  className="d-flex align-items-center">
                  <ChatDots size={20} className="me-2" />
                  Messages
                  {unreadMessages > 0 && (
                    <Badge bg="danger" className="ms-2 rounded-circle">
                      {unreadMessages}
                    </Badge>
                  )}
                </Nav.Link>
              </Nav>
            )}
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
            <div className="categories-menu">
              <div className="row g-3">
                {categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="col-6 col-md-4 col-lg-3 col-xl-2 mb-3 category-column">
                    <h6 className="fw-bold text-capitalize category-title">
                      {category.title}
                    </h6>
                    <ul className="list-unstyled small category-list">
                      {category.items.map((item, i) => (
                        <li key={i} className="category-item">
                          <a
                            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                            className="text-decoration-none text-dark d-block py-1 category-link">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;

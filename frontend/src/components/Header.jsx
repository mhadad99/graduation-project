import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl, Overlay, Popover, Badge, Image } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaUser, FaEnvelope, FaBell, FaTruck, FaBars } from 'react-icons/fa';

export const Header = ({ isLoggedIn }) => {
  // State for managing various dropdown displays
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showExpandMenu, setShowExpandMenu] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Refs for handling click outside events
  const categoriesRef = useRef(null);
  const searchRef = useRef(null);
  const expandRef = useRef(null);
  const messagesRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  
  // Handle clicks outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (expandRef.current && !expandRef.current.contains(event.target)) {
        setShowExpandMenu(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sample data for messages and notifications
  const messages = [
    { id: 1, sender: "John Doe", content: "Hi, I'm interested in your service", time: "2 hours ago", unread: true },
    { id: 2, sender: "Jane Smith", content: "Thanks for your quick response", time: "Yesterday", unread: false },
    { id: 3, sender: "Mike Johnson", content: "When can we schedule a call?", time: "2 days ago", unread: true }
  ];
  
  const notifications = [
    { id: 1, content: "Your order has been shipped", time: "1 hour ago", unread: true },
    { id: 2, content: "New comment on your service", time: "5 hours ago", unread: true },
    { id: 3, content: "Payment received", time: "Yesterday", unread: false }
  ];

  // Categories data structure
  const categories = [
    {
      title: "Programming and development",
      items: ["WordPress", "Website development", "Technical support", 
              "Software development", "Create an online store", "Mobile application programming"]
    },
    {
      title: "digital marketing",
      items: ["Marketing plans", "Marketing Consulting", "Search Engine Optimization", 
              "Social media ads", "Social media account management", "Social media marketing"]
    },
    {
      title: "Writing and translation",
      items: ["translation", "Creative writing", "Specialized content", 
              "Website content", "Marketing content", "Academic and professional content"]
    },
    {
      title: "design",
      items: ["Edit and enhance photos", "Design advertising banners", "Social media designs", 
              "Website and application design", "Logos and brand identities", "Marketing designs"]
    },
    {
      title: "Audio",
      items: ["singing", "Voiceover", "IVR", "audiobook production", "Sound engineering", 
              "Music production and composition"]
    },
    {
      title: "works",
      items: ["Business Administration", "Business Planning", "Business Consulting", 
              "e-commerce", "Legal services", "Financial and accounting services"]
    },
    {
      title: "Engineering and Architecture",
      items: ["architecture", "Civil and Structural Engineering", "Mechanical Engineering", 
              "Electronics Engineering", "Electrical Engineering", "Engineering Consultations"]
    },
    {
      title: "Video and animation",
      items: ["Intro design", "video editing", "Animation and motion graphics", 
              "Marketing videos", "Social media videos"]
    },
    {
      title: "lifestyle",
      items: ["Personal consultations"]
    },
    {
      title: "Data",
      items: ["Data entry"]
    },
    {
      title: "Distance learning",
      items: ["Learn languages"]
    }
  ];

  const profileMenuOptions = [
    "Profile",
    "Saved",
    "Balance",
    "Settings", 
    "Edit my account",
    "Help",
    "Logout"
  ];

  const expandMenuOptions = [
    "My Profile",
    "My Services",
    "Messages",
    "Notifications",
    "Settings",
    "Logout"
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" className="py-1">
        <Container className="d-flex align-items-center">
          {/* Left section: Logo, Categories, Add Service */}
          <div className="d-flex align-items-center">
            {/* Logo */}
            <Navbar.Brand href="#home" className="me-3">
              <img 
                src="10002.png" 
                alt="Logo" 
                height="30" 
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            
            {/* Categories Dropdown - Now closer to logo */}
            <div ref={categoriesRef} className="me-3">
              <Button 
                variant="outline-light" 
                size="sm" 
                className="rounded-pill py-1 px-3"
                onClick={() => setShowCategories(!showCategories)}
              >
                Categories
              </Button>
            </div>
            
            {/* Add Service Button - Only when logged in, now closer to logo */}
            {!isLoggedIn && (
              <Button variant="outline-light" size="sm" className="py-1 px-3 d-none d-md-block">
                Add a service <span className="ms-1">+</span>
              </Button>
            )}
          </div>
          
          {/* Center/Right section: Interactive icons */}
          <Nav className="ms-auto d-flex align-items-center">
            {/* Search Button */}
            <div ref={searchRef} className="position-relative me-3">
              <Nav.Link onClick={() => setShowSearch(!showSearch)} className="nav-icon">
                <FaSearch />
              </Nav.Link>
            </div>
            
            {/* Shopping Cart */}
            <Nav.Link href="#cart" className="me-3 nav-icon">
              <FaShoppingCart />
            </Nav.Link>

            {isLoggedIn && (
              <div className="d-flex align-items-center">
                <Button variant="outline-secondary" size="sm" className="me-2 text-white border-0">
                  <FaUser className="me-1" /> New account
                </Button>
                <Button variant="outline-secondary" size="sm" className="text-white border-0">
                  <FaUser className="me-1" /> Login
                </Button>
              </div>
            )}

            {!isLoggedIn && (
              <>
                {/* Notifications Dropdown - Now grouped with other icons */}
                <div ref={notificationsRef} className="position-relative me-3">
                  <Nav.Link 
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowMessages(false);
                    }}
                    className="nav-icon"
                  >
                    <FaBell />
                    {notifications.filter(n => n.unread).length > 0 && (
                      <Badge bg="danger" pill className="position-absolute top-0 end-0 badge-sm">
                        {notifications.filter(n => n.unread).length}
                      </Badge>
                    )}
                  </Nav.Link>
                  
                  <Overlay
                    show={showNotifications}
                    target={notificationsRef.current}
                    placement="bottom-end"
                    container={notificationsRef.current}
                    containerPadding={20}
                  >
                    <Popover id="notifications-popover" className="border-0 shadow" style={{ width: "300px" }}>
                      <Popover.Header className="bg-light d-flex justify-content-between align-items-center">
                        <span>Notifications</span>
                        <Button variant="link" size="sm" className="p-0 text-muted">
                          Mark all as read
                        </Button>
                      </Popover.Header>
                      <Popover.Body className="p-0">
                        {notifications.length > 0 ? (
                          <div className="notification-list">
                            {notifications.map(notification => (
                              <div key={notification.id} className={`notification-item p-2 border-bottom ${notification.unread ? 'bg-light' : ''}`}>
                                <div className="d-flex justify-content-between">
                                  <span className="notification-content">{notification.content}</span>
                                  {notification.unread && <span className="text-primary">•</span>}
                                </div>
                                <small className="text-muted">{notification.time}</small>
                              </div>
                            ))}
                            <div className="text-center py-2">
                              <a href="#all-notifications" className="text-decoration-none">See all notifications</a>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 text-center">No notifications</div>
                        )}
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </div>
                
                {/* Messages Dropdown */}
                <div ref={messagesRef} className="position-relative me-3">
                  <Nav.Link 
                    onClick={() => {
                      setShowMessages(!showMessages);
                      setShowNotifications(false);
                    }}
                    className="nav-icon"
                  >
                    <FaEnvelope />
                    {messages.filter(m => m.unread).length > 0 && (
                      <Badge bg="danger" pill className="position-absolute top-0 end-0 badge-sm">
                        {messages.filter(m => m.unread).length}
                      </Badge>
                    )}
                  </Nav.Link>
                  
                  <Overlay
                    show={showMessages}
                    target={messagesRef.current}
                    placement="bottom-end"
                    container={messagesRef.current}
                    containerPadding={20}
                  >
                    <Popover id="messages-popover" className="border-0 shadow" style={{ width: "300px" }}>
                      <Popover.Header className="bg-light">Messages</Popover.Header>
                      <Popover.Body className="p-0">
                        {messages.length > 0 ? (
                          <div className="message-list">
                            {messages.map(message => (
                              <div key={message.id} className={`message-item p-2 border-bottom ${message.unread ? 'bg-light' : ''}`}>
                                <div className="d-flex justify-content-between">
                                  <strong>{message.sender}</strong>
                                  {message.unread && <span className="text-primary">•</span>}
                                </div>
                                <div className="message-content text-truncate">{message.content}</div>
                                <small className="text-muted">{message.time}</small>
                              </div>
                            ))}
                            <div className="text-center py-2">
                              <a href="#all-messages" className="text-decoration-none">See all messages</a>
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
                <Nav.Link href="#incoming" className="me-3 d-none d-lg-block nav-icon">
                  <FaTruck /> <span className="d-none d-xl-inline ms-1">Incoming requests</span>
                </Nav.Link>
                
                {/* Profile Picture with Dropdown - Only when logged in */}
                <div ref={profileRef} className="position-relative me-3">
                  <Nav.Link 
                    onClick={() => setShowProfileMenu(!showProfileMenu)} 
                    className="p-0"
                  >
                    <Image 
                      src="https://www.20i.com/blog/wp-content/uploads/2021/06/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash-1.jpg" 
                      roundedCircle 
                      width="32" 
                      height="32" 
                      className="border border-2 border-light" 
                      alt="Profile" 
                    />
                  </Nav.Link>
                  
                  <Overlay
                    show={showProfileMenu}
                    target={profileRef.current}
                    placement="bottom-end"
                    container={profileRef.current}
                    containerPadding={20}
                  >
                    <Popover id="profile-menu-popover" className="border-0 shadow">
                      <Popover.Header className="bg-light d-flex align-items-center">
                        <Image 
                          src="https://www.20i.com/blog/wp-content/uploads/2021/06/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash-1.jpg" 
                          roundedCircle 
                          width="40" 
                          height="40" 
                          className="border me-2" 
                          alt="Profile" 
                        />
                        <div>
                          <div className="fw-bold">Nada Hassan</div>
                          <div className="small text-muted">john@example.com</div>
                        </div>
                      </Popover.Header>
                      <Popover.Body className="p-0">
                        <Nav className="flex-column">
                          {profileMenuOptions.map((option, idx) => (
                            <Nav.Link key={idx} href={`#${option.toLowerCase().replace(/ /g, '-')}`} className="px-3 py-2 text-dark">
                              {option}
                            </Nav.Link>
                          ))}
                        </Nav>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </div>
              </>
            )}

            {/* Expand Menu Button - Always visible */}
            <div ref={expandRef} className="position-relative">
              <Button 
                variant="outline-light" 
                size="sm" 
                className="py-1 px-2"
                onClick={() => setShowExpandMenu(!showExpandMenu)}
              >
                <FaBars />
              </Button>
              
              <Overlay
                show={showExpandMenu}
                target={expandRef.current}
                placement="bottom-end"
                container={expandRef.current}
                containerPadding={20}
              >
                <Popover id="expand-menu-popover" className="border-0 shadow">
                  <Popover.Body className="p-0">
                    <Nav className="flex-column">
                      {expandMenuOptions.map((option, idx) => (
                        <Nav.Link key={idx} href={`#${option.toLowerCase().replace(/ /g, '-')}`} className="px-3 py-2 text-dark">
                          {option}
                        </Nav.Link>
                      ))}
                    </Nav>
                  </Popover.Body>
                </Popover>
              </Overlay>
            </div>
          </Nav>

        </Container>
      </Navbar>
            {/* Full-width Search Dropdown */}
      {showSearch && (
        <div className="position-absolute w-100 bg-light shadow-sm py-2 search-dropdown " style={{ zIndex: 1000, marginBottom: '600px' }}>
          <Container>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search..."
                className="me-2 "
                aria-label="Search"
                autoFocus
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Container>
        </div>
      )}
           {/* Centered Categories Dropdown */}
           {showCategories && (
        <div className="position-absolute w-100 bg-white shadow-sm py-3 categories-dropdown" style={{ zIndex: 1000 }}>
          <Container>
            <div className="mega-menu">
              <div className="row g-3 justify-content-center">
                {categories.map((category, idx) => (
                  <div key={idx} className="col-6 col-md-3 col-lg-2 mb-3">
                    <h6 className="fw-bold">{category.title}</h6>
                    <ul className="list-unstyled">
                      {category.items.map((item, i) => (
                        <li key={i}>
                          <a 
                            href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                            className="text-decoration-none text-dark d-block py-1"
                          >
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
    </>
  );
};


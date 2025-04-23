

import React from 'react';
import '../styles/footer.css'; // Custom CSS for Footer

const Footer = () => {
  return (
    <footer className="footer text-center text-md-start">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-3">
            <h5>About Us</h5>
            <p>We are dedicated to providing the best quality service.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          {/* Newsletter (optional) */}
          {/* <div className="col-md-3 newsletter">
            <h5>Newsletter</h5>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </div> */}
        </div>

        <hr className="my-4" />

        {/* Copyright */}
        <div className="text-center">
          <p>&copy; 2025 YourCompany. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

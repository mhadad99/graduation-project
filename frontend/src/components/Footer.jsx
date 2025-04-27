import React from 'react';
import '../styles/footer.css'; // custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer pt-5 pb-3">
      <div className="container">
        <div className="row g-4">

          {/* Company Info */}
          <div className="col-6 col-md-2">
            <h6>Company</h6>
            <ul className="list-unstyled small">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-6 col-md-2">
            <h6>Resources</h6>
            <ul className="list-unstyled small">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">Events</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-6 col-md-2">
            <h6>Services</h6>
            <ul className="list-unstyled small">
              <li><a href="#">Browse Projects</a></li>
              <li><a href="#">Find Freelancers</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Companies</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-6 col-md-2">
            <h6>Legal</h6>
            <ul className="list-unstyled small">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-12 col-md-4 text-center text-md-end">
            <h6>Follow Us</h6>
            <div className="social-icons d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a>
            </div>
          </div>

        </div>

        <hr className="my-4" />

        {/* Footer Bottom */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small">
          <p className="mb-2 mb-md-0">&copy; 2025 Tanfeez. All rights reserved.</p>
          <div className="text-center text-md-end">
            <a href="#" className="me-3">Privacy</a>
            <a href="#" className="me-3">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react'
import '../styles/HomeCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { 
  faStore, faMobileAlt, faVideo, faPalette,
  faHashtag, faLanguage, faSearch, faObjectGroup,
  faClock, faWallet, faLayerGroup, faUserTie,
  faLock, faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

export function HomeCategory() {
  const services = [
    'Digital Marketing',
    'Design & Programming',
    'Video & Motion',
    'Digital Strategy',
    'Objectives',
    'Activity',
    'AI Solutions',
    'Innovative Methods'
  ];
  const popular = [
    { name: 'E-Commerce Website', icon: faStore },
    { name: 'Mobile App Development', icon: faMobileAlt },
    { name: 'Video Editing', icon: faVideo },
    { name: 'Logo Design', icon: faPalette },
    { name: 'Social Media Management', icon: faHashtag },
    { name: 'Translation Services', icon: faLanguage },
    { name: 'SEO Optimization', icon: faSearch },
    { name: 'Graphic Design', icon: faObjectGroup }
  ];
  const features = [
    { icon: faClock, title: '24/7 Availability', description: 'Round-the-clock service for your business needs' },
    { icon: faWallet, title: 'Affordable Pricing', description: 'High-quality services starting at just $5' },
    { icon: faLayerGroup, title: '350+ Categories', description: 'Supporting thousands of services across all fields' },
    { icon: faUserTie, title: 'Professional Providers', description: 'Verified experts delivering top-notch services' },
    { icon: faLock, title: 'Secure Transactions', description: 'Safe and reliable payment processing' },
    { icon: faShieldAlt, title: 'Rights Protection', description: 'Guaranteed financial rights and work delivery' }
  ];

  return (
    <div className="hc-services-container py-5">
      <div className="container">
        <h2 className="hc-text-center hc-dev1 hc-section-title mb-5">Business Development Services</h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <Link to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} className="text-decoration-none text-dark">

              <div className="hc-service-card card h-100">
              <div className="hc-card-img-container position-relative">
              <img
                src={`/${service.toLowerCase().replace(/\s+/g, '-')}.jpg`} // adjust image path
                alt={service}
                className="w-100 h-100 object-fit-cover hc-service-img"
              />
              <div className="hc-card-overlay d-flex align-items-center justify-content-center">
                <h5 className="hc-card-title text-center">{service}</h5>
              </div>
              </div>
              </div>
                  </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="hc-services-section py-5">
        <div className="container">
          <h2 className="hc-section-title hc-dev1 text-center mb-5">Popular Services</h2>
          <div className="row g-4">
            {popular.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <Link to="/services" className="text-decoration-none text-dark">

                <div className="hc-service-card card h-100 border-0 text-center p-4">
                  <div className="hc-icon-container mb-3">
                    <FontAwesomeIcon icon={item.icon} size="2x" />
                  </div>
                  <h5 className="hc-service-title m-0">{item.name}</h5>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="hc-why-choose-us py-5">
        <div className="container">
          <h2 className="hc-section-title hc-dev1 text-center mb-5">Why Choose Us</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="hc-feature-card text-center p-4 h-100">
                  <div className="hc-icon-wrapper mb-3">
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <h4 className="hc-feature-title mb-3">{feature.title}</h4>
                  <p className="hc-feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

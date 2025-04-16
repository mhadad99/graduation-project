import React from 'react';

export default function About() {
  return (
    <div className="about-khamsat" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>About Khamsat Platform</h1>
        <div style={styles.underline}></div>
      </div>
      
      <div style={styles.content}>
        <p style={styles.paragraph}>
          Khamsat is the largest online marketplace for buying and selling services. It connects professional freelancers with business owners and companies to provide quick solutions they need at affordable prices without compromising on quality.
        </p>
        
        <div style={styles.highlightBox}>
          <p style={styles.highlightText}>
            We aim to empower individuals and businesses to access the best services and creative solutions they need to grow their businesses easily through a trusted platform.
          </p>
        </div>
        
        <p style={styles.paragraph}>
          Khamsat offers a wide range of services including programming and development, graphic design, digital marketing, video and audio production, writing and translation, social media management, and more. Whatever service you need, you'll find the right professional freelancer on Khamsat.
        </p>
        
        <div style={styles.servicesGrid}>
          <div style={styles.serviceCard}>Programming & Development</div>
          <div style={styles.serviceCard}>Graphic Design</div>
          <div style={styles.serviceCard}>Digital Marketing</div>
          <div style={styles.serviceCard}>Video & Audio</div>
          <div style={styles.serviceCard}>Writing & Translation</div>
          <div style={styles.serviceCard}>Social Media</div>
        </div>
        
        <p style={styles.note}>
          Khamsat is operated by Hsoub Limited, registered in the United Kingdom with company number 07571594.
        </p>
      </div>
      
      <div style={styles.hsoubSection}>
        <h2 style={styles.subtitle}>About Hsoub</h2>
        <div style={styles.underline}></div>
        <p style={styles.paragraph}>
          Hsoub aims to develop the Arab world by providing solutions and products that help ambitious youth to work and grow. Hsoub focuses its activities on the future of work and education, serving hundreds of thousands of users from various Arab countries.
        </p>
        
        <div style={styles.linkContainer}>
          <a 
            href="https://www.hsoub.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.link}
            aria-label="Visit Hsoub Company Website"
          >
            Visit Hsoub Company Website
            <span style={styles.linkIcon}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    lineHeight: '1.6',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  underline: {
    height: '4px',
    width: '80px',
    background: '#3498db',
    margin: '0 auto 1.5rem',
    borderRadius: '2px',
  },
  content: {
    marginBottom: '3rem',
  },
  paragraph: {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
  },
  highlightBox: {
    backgroundColor: '#f8f9fa',
    borderLeft: '4px solid #3498db',
    padding: '1.5rem',
    margin: '2rem 0',
    borderRadius: '0 4px 4px 0',
  },
  highlightText: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    margin: 0,
    fontStyle: 'italic',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
    margin: '2rem 0',
  },
  serviceCard: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '1rem',
    borderRadius: '4px',
    textAlign: 'center',
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'default',
    '&:hover': {
      transform: 'translateY(-2px)',
      cursor: 'pointer',
    },
  },
  note: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  hsoubSection: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: '1.5rem',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#3498db',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
  linkIcon: {
    marginLeft: '8px',
    transition: 'transform 0.3s ease',
    'a:hover &': {
      transform: 'translateX(3px)',
    },
  },
};

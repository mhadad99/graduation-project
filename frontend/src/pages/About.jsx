import React from 'react';

export default function About() {
  return (
    <div className="about-TANFEEZ" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>About TANFEEZ Platform</h1>
        <div style={styles.underline}></div>
      </div>
      
      <div style={styles.content}>
        <p style={styles.paragraph}>
          TANFEEZ is a large online marketplace for buying and selling services. It connects professional freelancers with business owners and companies to provide quick solutions they need at affordable prices without compromising on quality.
        </p>
        
        <div style={styles.highlightBox}>
          <p style={styles.highlightText}>
            We aim to empower individuals and businesses to access the best services and creative solutions they need to grow their businesses easily through a trusted platform.
          </p>
        </div>
        
        <p style={styles.paragraph}>
          TANFEEZ offers a wide range of services including programming and development, graphic design, digital marketing, video and audio production, writing and translation, social media management, and more. Whatever service you need, you'll find the right professional freelancer on Khamsat.
        </p>
        
        <div style={styles.servicesGrid}>
          <div style={styles.serviceCard}>Programming & Development</div>
          <div style={styles.serviceCard}>Graphic Design</div>
          <div style={styles.serviceCard}>Digital Marketing</div>
          <div style={styles.serviceCard}>Video & Audio</div>
          <div style={styles.serviceCard}>Writing & Translation</div>
          <div style={styles.serviceCard}>Social Media</div>
        </div>

        <div style={styles.hsoubSection}>
          <h2 style={styles.subtitle}>TANFEEZ</h2>
          <div style={styles.underline}></div>
          <p style={styles.paragraph}>
            TANFEEZ aims to develop the Arab world by providing solutions and products that help ambitious youth to work and grow. TANFEEZ focuses its activities on the future of work and education, serving hundreds of thousands of users from various countries.
          </p>
        </div>

        {/* Team Members */}
        <h2 style={styles.subtitl}>Operated By</h2>
        <div style={styles.underline}></div>
        <div style={styles.teamGrid}>
          {[
            { name: "Mohamed Hassan", img: "../logo/mhadad.jpeg" },
            { name: "Ayman Samir", img: "../logo/ayman.jpeg" },
            { name: "Saraa Talat Ali", img: "../logo/images (1).jpeg" },
            { name: "Mohamed Akram", img: "./logo/Tanfeez.png" },
            { name: "Mohamed Emad", img: "./logo/Tanfeez.png" },
            { name: "Mohamed Hosny", img: "./logo/Tanfeez.png" },
          ].map((person, index) => (
            <div key={index} style={styles.memberCard}>
              <img src={person.img} alt={person.name} style={styles.memberImage} />
              <p style={styles.memberName}>{person.name}</p>
            </div>
          ))}
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
  },
  hsoubSection: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginTop: '3rem',
    justifyItems: 'center',
    textAlign: 'center',
  },
  subtitl: {
    marginTop: '3rem',
    justifyItems: 'center',
    textAlign: 'center',
  },
  memberCard: {
    backgroundColor: '#f2f2f2',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '220px',
  },
  memberImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '0.8rem',
  },
  memberName: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#2c3e50',
  },
};

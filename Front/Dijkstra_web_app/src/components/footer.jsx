import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
    
        <div style={styles.column}>
          <h4 style={styles.subTitle}>Follow me</h4>
          <div style={styles.socialIcons}>
            <a href="https://github.com/Adem-Hassen" style={styles.icon}><i className="fab fa-github"></i></a>
            <a href="https://Linkedin.com" style={styles.icon}><i className="fab fa-linkedin"></i></a>
           
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <p style={styles.bottomText}>
          © {new Date().getFullYear()} Dijkstra Visualizer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '30px 20px',
    marginTop: '200px',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  column: {
    flex: '1',
    margin: '10px',
    minWidth: '200px',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '0.9rem',
    color: '#bdc3c7',
  },
  subTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  links: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'block',
    margin: '5px 0',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  icon: {
    fontSize: '1.5rem',
    color: '#3498db',
    textDecoration: 'none',
  },
  bottom: {
    borderTop: '1px solid #34495e',
    marginTop: '20px',
    paddingTop: '10px',
  },
  bottomText: {
    fontSize: '0.8rem',
    color: '#bdc3c7',
  },
};

export default Footer;

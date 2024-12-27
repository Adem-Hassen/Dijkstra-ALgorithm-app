import React from 'react'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const GetStarted=()=>{
    navigate("/visualizer")
    
  }
  return (
    
    <div style={styles.container}>
    <div style={styles.hero}>
      <h1 style={styles.title}>Welcome to Dijkstra Visualizer</h1>
      <p style={styles.subtitle}>
        Easily get the shortest paths in a graph with our interactive and intuitive tool.
      </p>
      <button style={styles.getStartedButton} onClick={GetStarted}>
        Get Started
      </button>
    </div>
    <div style={styles.features}>
      <div style={styles.featureCard}>
        <h3 style={styles.featureTitle}>Interactive Visualization</h3>
        <p style={styles.featureDescription}>
          Drag, drop, and explore your graph with ease.
        </p>
      </div>

      
      <div style={styles.featureCard}>
        <h3 style={styles.featureTitle}>Step-by-Step Algorithm</h3>
        <p style={styles.featureDescription}>
         Get the shortest path in your graph from source node to an end point and all the other nodes.
        </p>
      </div>
      <div style={styles.featureCard}>
        <h3 style={styles.featureTitle}>Custom Graphs</h3>
        <p style={styles.featureDescription}>
          Create your own graph  to solve problems.
        </p>
      </div>
    </div>
  </div>
);

        
  
}
const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      fontFamily: "'Arial', sans-serif",
    },
    hero: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '50px 20px',
      borderRadius: '10px',
      margin: '20px auto',
      maxWidth: '800px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '1.2rem',
      marginBottom: '20px',
    },
    getStartedButton: {
      padding: '10px 20px',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: 'rgb(12, 33, 34)',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    features: {
      display: 'flex',
      justifyContent: 'center',
      gap: '50px',
      marginTop: '80px',
      flexWrap: 'wrap',
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '250px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    featureTitle: {
      fontSize: '1.2rem',
      marginBottom: '10px',
    },
    featureDescription: {
      fontSize: '0.9rem',
      color: '#555',
    },
  };

export default Home
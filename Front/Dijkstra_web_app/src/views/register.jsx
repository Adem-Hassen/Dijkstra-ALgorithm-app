import React from 'react';

function Register() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <form style={styles.form}>
          <label style={styles.label}>Name</label>
          <input type="text" placeholder="Enter your name" style={styles.input} />

          <label style={styles.label}>Email</label>
          <input type="email" placeholder="Enter your email" style={styles.input} />

          <label style={styles.label}>Password</label>
          <input type="password" placeholder="Create a password" style={styles.input} />

          <label style={styles.label}>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" style={styles.input} />

          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.footerText}>
          Already have an account? <a href="/sign_in" style={styles.link}>Sign n</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    textAlign: 'left',
    marginBottom: '5px',
    fontSize: '0.9rem',
    color: '#34495e',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  footerText: {
    marginTop: '20px',
    fontSize: '0.9rem',
    color: '#7f8c8d',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
  },
};

export default Register;

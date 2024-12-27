import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function NavbarComponent() {
  
  
  return (
    <div  > 
       <Navbar  id="navbar" style={{backgroundColor:'#34495e'}} data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">Dijkstra Visualizer</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">

      <Button variant="outline-success"  href='/sign_in'>Sign in</Button>
      "      "
      <Button variant="outline-light" href='/register'>Register</Button>
      </Navbar.Collapse>
      
    </Container>
  </Navbar></div>
  
  );
}

export default NavbarComponent;
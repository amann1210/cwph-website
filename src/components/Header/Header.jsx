import "./Header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

const Header = () => {

  const [isAuth,setIsAuth] = useState(localStorage.getItem("isAuth"));
  
  const signUserOut = () =>{
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };


  return (
    //  Header
    <header className="background-header">
      <Navbar bg="default" expand="lg" style={{ backgroundColor: "white" }}>
        <Container fluid>
          <Navbar.Brand className="align-middle" href="/">
            <h2 style={{ cursor: "pointer" }}>CWPH</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ fontWeight: "bold" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/team" style={{ fontWeight: "bold" }}>
                Team
              </Nav.Link>
              <Nav.Link href="/activities" style={{ fontWeight: "bold" }}>
                Activities
              </Nav.Link>
              <Nav.Link href="/contact" style={{ fontWeight: "bold" }}>
                Contact Us
              </Nav.Link>
              <Nav.Link href="/about" style={{ fontWeight: "bold" }}>
                About Us
              </Nav.Link>

              <Nav.Link href="/discussion" style={{ fontWeight: "bold" }}>
                Discussion 
              </Nav.Link>

              
              {isAuth ? <Nav.Link href="/login" onClick={signUserOut} style={{ fontWeight: "bold" }}>
                Log out
              </Nav.Link> : <Nav.Link href="/login"  style={{ fontWeight: "bold" }}>
                Login
              </Nav.Link> }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

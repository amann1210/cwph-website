import "./Header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { getAuth,onAuthStateChanged } from "firebase/auth";

function Header(props) {

  // const auth = getAuth();
// const user = auth.currentUser;



const auth = getAuth();

 let [ui,setui] = useState(false)
onAuthStateChanged(auth, (user) => {
  console.log("State is changed")
  if(user){
    setui(true)
    // console.log(user)
    console.log(ui)
  }
  else{
    
    setui(false )
    console.log(ui)
  }
});



  
  const signUserOut = () => {
    signOut(auth).then(() => {
      props.SetIsAuth(false);
      // console.log(user)
      // ui = false;
      window.location.assign("/login");
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

               
               {/* {{ this.CheckStatus()}} */}
               
             

 { ui?
  <Nav.Link href="/login" onClick={signUserOut} style={{ fontWeight: "bold" }}>
  Logout
</Nav.Link>
:<Nav.Link href="/login" style={{ fontWeight: "bold" }}>
  Login
</Nav.Link>
}

  {/* if(uid){
    <Nav.Link href="/login" onClick={signUserOut} style={{ fontWeight: "bold" }}>
  Log out
</Nav.Link> 
  }
  else{
    <Nav.Link href="/login" onClick={signUserOut} style={{ fontWeight: "bold" }}>
    Logout
  </Nav.Link>
  } */}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

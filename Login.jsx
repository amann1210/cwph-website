import React from "react";
import { auth , provider } from '../../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Tab, Tabs, Fade } from "react-bootstrap";
import "./Login.css";

function Login({setIsAuth}) {
    

//   const navigate = useNavigate();
  const signInWithGoogle = () => {
      signInWithPopup(auth,provider).then((result) => {
          localStorage.setItem("isAuth",true);
          setIsAuth(true);
        //   navigate("/"); 
      });
  };
  
  return(
      <div className="page-heading header-text about-image">
          <h2>Sign In With Google to Continue</h2>
          <button className="login-with-google-btn" onClick={signInWithGoogle} >Sign in with Google</button>
      </div>
  )
}

export default Login;
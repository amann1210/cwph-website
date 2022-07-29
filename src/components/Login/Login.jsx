import React from "react";
import { auth , provider } from '../../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Tab, Tabs, Fade } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";

function Login({setIsAuth,isAuth}) {
    

//   const navigate = useNavigate();
  const signInWithGoogle = () => {
      signInWithPopup(auth,provider).then((result) => {
          localStorage.setItem("isAuth",true);
          setIsAuth(true);
          return <Redirect to = "/"/>
      });
  };

  useEffect(() =>{
    if (!isAuth){
      <Redirect to = "/"/>
    }
  },[])
  
  return(
      <div className="page-heading header-text about-image">
          <h2>Sign In With Google to Continue</h2>
          <button className="login-with-google-btn" onClick={signInWithGoogle} >Sign in with Google</button>
      </div>
  )
}

export default Login;
import React from "react";
import { auth , provider } from '../../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Tab, Tabs, Fade } from "react-bootstrap";
import "./Login.css";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { getAuth } from "firebase/auth";




function Login(props) {
  
  let history = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;

  

//   const navigate = useNavigate();
  const signInWithGoogle = () => {
      signInWithPopup(auth,provider).then((result) => {
          
          props.setIsAuth(true);
          //  console.log(prop)
          console.log(user)
          history.push("/");
          
      },
      
      // window.location.assign("/")
      );
       
  };

  function redirect() {
   <Redirect to="/" />;       

  }
  
  return(
      <div className="page-heading header-text about-image">
          <h2>Sign In With Google to Continue</h2>
           <button className="login-with-google-btn" onClick={() => {signInWithGoogle();redirect();}}> Sign in with Google</button>         
      </div>
  )
}

export default Login;
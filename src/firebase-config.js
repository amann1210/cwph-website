// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8hzpzq2iYiWNDedcjbEYy6IgxBZueKhk",
  authDomain: "cwph-e4b8f.firebaseapp.com",
  projectId: "cwph-e4b8f",
  storageBucket: "cwph-e4b8f.appspot.com",
  messagingSenderId: "454715987745",
  appId: "1:454715987745:web:12c74d37c4553be5541060",
  measurementId: "G-GWRR42EC1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

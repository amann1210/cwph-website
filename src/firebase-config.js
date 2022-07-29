import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyBiMNuxyVMcAaj_aMvKznCs19MS7X_DdjU",
  authDomain: "cwph-lnmiit.firebaseapp.com",
  projectId: "cwph-lnmiit",
  storageBucket: "cwph-lnmiit.appspot.com",
  messagingSenderId: "313567962778",
  appId: "1:313567962778:web:58925a37c7b725edcda123",
  measurementId: "G-69TP74R4HS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
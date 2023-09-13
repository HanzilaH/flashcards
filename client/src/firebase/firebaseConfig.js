// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlVo8_UtNXGpTdDP_CK1-AD223LlX9IEA",
  authDomain: "flashcard-d57b4.firebaseapp.com",
  projectId: "flashcard-d57b4",
  storageBucket: "flashcard-d57b4.appspot.com",
  messagingSenderId: "327596448441",
  appId: "1:327596448441:web:1289032d6c16f59cd7d968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClUBJM9LLIIkSljALglSbI8CW9rD6K2hw",
  authDomain: "chatbot-ai-f8823.firebaseapp.com",
  projectId: "chatbot-ai-f8823",
  storageBucket: "chatbot-ai-f8823.appspot.com",
  messagingSenderId: "323878013638",
  appId: "1:323878013638:web:424d375d472192ce3065c7",
  measurementId: "G-TZ2ECEYYV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);


export { app, auth, firestore };

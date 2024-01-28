// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6jcxF0ll45ICCBB8wEbbJk6_K2HE0XKk",
  authDomain: "chatapp-3cbc4.firebaseapp.com",
  projectId: "chatapp-3cbc4",
  storageBucket: "chatapp-3cbc4.appspot.com",
  messagingSenderId: "59429160113",
  appId: "1:59429160113:web:e80cd93c4e5843fe2a4e90",
  measurementId: "G-M3TCJZSWLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
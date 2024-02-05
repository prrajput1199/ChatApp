// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
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
export const app = initializeApp(firebaseConfig);
// auth.useDeviceLanguage();
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
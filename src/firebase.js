// Copied from the firebase website, all information needed is provided

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvPiA8peFyA7OaCyvdKOavERzFC7RBxHo",
  authDomain: "thirstproj.firebaseapp.com",
  projectId: "thirstproj",
  storageBucket: "thirstproj.appspot.com",
  messagingSenderId: "460856015831",
  appId: "1:460856015831:web:dcf47a7dd9e67e12bc6992",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Database
export const db = getFirestore(app);
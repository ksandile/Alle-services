// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASb3wPvq4cksVCM3OzLE_s74gzpwdPC1E",
  authDomain: "gggg-2164a.firebaseapp.com",
  databaseURL: "https://gggg-2164a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gggg-2164a",
  storageBucket: "gggg-2164a.appspot.com",
  messagingSenderId: "383686120816",
  appId: "1:383686120816:web:70c4d29740d9cc95322bb5",
  measurementId: "G-QL58FC4WP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth

// Export the initialized services
export { app, analytics, firestore, auth };

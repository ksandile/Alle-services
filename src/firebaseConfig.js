// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Import Firestore if you're planning to use it

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

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Optionally, initialize Realtime Database if you plan to use it
// import { getDatabase } from 'firebase/database';
// export const database = getDatabase(app);

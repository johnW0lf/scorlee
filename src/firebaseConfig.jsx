// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZXcdehZzbQU_yv0fkmJ765zIsp8zA_Oc",
  authDomain: "soccer-team-details.firebaseapp.com",
  databaseURL:
    "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "soccer-team-details",
  storageBucket: "soccer-team-details.firebasestorage.app",
  messagingSenderId: "533134581185",
  appId: "1:533134581185:web:fa5ae255b228bd486f6340",
  measurementId: "G-BRY9L3CGH9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, push, onValue, remove };

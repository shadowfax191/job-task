// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDis_fz7fMra-F9hOnizVRaDGbAl8c_mKE",
  authDomain: "employee-management-f76c3.firebaseapp.com",
  projectId: "employee-management-f76c3",
  storageBucket: "employee-management-f76c3.appspot.com",
  messagingSenderId: "667510492418",
  appId: "1:667510492418:web:6e3cb869b15e332530461b",
  measurementId: "G-5B3Z5YV3MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
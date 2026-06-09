// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOGGuQMmqqgYROd9cESOBFKebyd9fMWXM",
  authDomain: "ipuc-neiva-central-77b89.firebaseapp.com",
  projectId: "ipuc-neiva-central-77b89",
  storageBucket: "ipuc-neiva-central-77b89.firebasestorage.app",
  messagingSenderId: "448776719065",
  appId: "1:448776719065:web:8e474dfc26ec4db039ccc8",
  measurementId: "G-GQJBKKV856"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOGGuQMmqqgYROd9cESOBFKebyd9fMWXM",
  authDomain: "ipuc-neiva-central-77b89.firebaseapp.com",
  projectId: "ipuc-neiva-central-77b89",
  storageBucket: "ipuc-neiva-central-77b89.firebasestorage.app",
  messagingSenderId: "448776719065",
  appId: "1:448776719065:web:8e474dfc26ec4db039ccc8",
  measurementId: "G-GQJBKKV856"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios básicos de forma segura para ambientes estáticos
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics solo se ejecuta en el navegador del usuario, no durante el build
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) getAnalytics(app);
  });
}
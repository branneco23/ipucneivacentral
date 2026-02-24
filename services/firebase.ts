import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCHfN6WC3b6K71R8rvXVte7gtRlfMH87Cw",
  authDomain: "ipuc-neiva-central.firebaseapp.com",
  databaseURL: "https://ipuc-neiva-central-default-rtdb.firebaseio.com", 
  projectId: "ipuc-neiva-central",
  storageBucket: "ipuc-neiva-central.firebasestorage.app",
  messagingSenderId: "786546012378",
  appId: "1:786546012378:web:8163e2e055a09e7a5535e3",
  measurementId: "G-TVN7T2YSTE"
};

// Inicialización segura para Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// AQUÍ ESTÁ LO QUE TE FALTABA: Exportar estas constantes
export const auth = getAuth(app);
export const db = getDatabase(app);
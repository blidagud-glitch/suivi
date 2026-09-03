import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import firebaseConfigJson from "../../firebase-applet-config.json";

let firebaseConfig = firebaseConfigJson;

// Override with env var if available (for Vercel deployment)
try {
  if (typeof process !== 'undefined' && process.env.VITE_FIREBASE_CONFIG) {
    firebaseConfig = JSON.parse(process.env.VITE_FIREBASE_CONFIG);
  } else if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_CONFIG) {
    firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
  }
} catch (e) {
  console.warn("Failed to parse VITE_FIREBASE_CONFIG, falling back to local config", e);
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

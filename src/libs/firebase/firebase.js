import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "clone-2-656a5.firebaseapp.com",
  projectId: "clone-2-656a5",
  storageBucket: "clone-2-656a5.appspot.com",
  messagingSenderId: "658312207361",
  appId: "1:658312207361:web:8427157890e9622bd3f400",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { db };

import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "clone-3-2755d.firebaseapp.com",
  projectId: "clone-3-2755d",
  storageBucket: "clone-3-2755d.appspot.com",
  messagingSenderId: "724897053598",
  appId: "1:724897053598:web:a2d3fb2a64a2857b8eb48f",
};

// Initialize Firebase
const app = !getApp("client-app")
  ? initializeApp(firebaseConfig, "client-app")
  : getApp("client-app");
const db = getFirestore(app);

export { db };

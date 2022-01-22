import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "clone-b04cc.firebaseapp.com",
  projectId: "clone-b04cc",
  storageBucket: "clone-b04cc.appspot.com",
  messagingSenderId: "948003725849",
  appId: "1:948003725849:web:36123db12f59fd08998088",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

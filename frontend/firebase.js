import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-1c76d.firebaseapp.com",
  projectId: "vingo-1c76d",
  storageBucket: "vingo-1c76d.firebasestorage.app",
  messagingSenderId: "439595139985",
  appId: "1:439595139985:web:a3d19b75f60c5cafb3d030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export {app,auth}
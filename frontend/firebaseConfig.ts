import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//! REPLACE VALUES BELOW WITH YOUR OWN FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDlPQ4IWUdr7y1jpV5w6m2qC_QaYK3Gy4U",
  authDomain: "ambi-5084d.firebaseapp.com",
  projectId: "ambi-5084d",
  storageBucket: "ambi-5084d.appspot.com",
  messagingSenderId: "494105973488",
  appId: "1:494105973488:web:906e55e00a64ac9bca2835",
  measurementId: "G-8JKPGPQK9Z"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

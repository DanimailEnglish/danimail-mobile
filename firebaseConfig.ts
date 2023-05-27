import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAVhYg2SsHIXb4wxHi9gusMhE07zcVAZG8",
  authDomain: "danimail-debug.firebaseapp.com",
  projectId: "danimail-debug",
  storageBucket: "danimail-debug.appspot.com",
  messagingSenderId: "352555613248",
  appId: "1:352555613248:web:7022041d9c7333b3a5f3a5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

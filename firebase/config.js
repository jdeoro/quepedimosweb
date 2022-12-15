import { initializeApp } from "firebase/app";
import {} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8pMoQ3u1dhNs-PbzdIkE4Zup2Ej_T0_0",
  authDomain: "kiosco-64e11.firebaseapp.com",
  projectId: "kiosco-64e11",
  storageBucket: "kiosco-64e11.appspot.com",
  messagingSenderId: "545930226486",
  appId: "1:545930226486:web:d4cb2f6db7a363141e2197",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

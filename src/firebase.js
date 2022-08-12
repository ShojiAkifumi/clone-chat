import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBulJX_K-IrRWk_dLJyLDRXp0X6Zbq3uPE",
  authDomain: "clone-chat-app-d93d3.firebaseapp.com",
  projectId: "clone-chat-app-d93d3",
  storageBucket: "clone-chat-app-d93d3.appspot.com",
  messagingSenderId: "440553534595",
  appId: "1:440553534595:web:e5b6604cf4fc1b1ab817b6",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7jWjW3tFV7z-1Fh2Xb6q3JncTqRwkFlc",
  authDomain: "cs494-testing-final.firebaseapp.com",
  projectId: "cs494-testing-final",
  storageBucket: "cs494-testing-final.appspot.com",
  messagingSenderId: "25715902004",
  appId: "1:25715902004:web:a5ff1661e9f03521a06c61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);



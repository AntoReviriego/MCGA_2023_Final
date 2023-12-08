// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1nWRf4n7AVpr7tyeXRYOiTdkgk9R7ZSc",
  authDomain: "proyectofinal-d89b5.firebaseapp.com",
  projectId: "proyectofinal-d89b5",
  storageBucket: "proyectofinal-d89b5.appspot.com",
  messagingSenderId: "1032072169749",
  appId: "1:1032072169749:web:6e2421af91faf44193811c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
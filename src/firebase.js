import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-oauth.firebaseapp.com",
  projectId: "mern-blog-oauth",
  storageBucket: "mern-blog-oauth.appspot.com",
  messagingSenderId: "950085036475",
  appId: "1:950085036475:web:3447efd462288f380dbc9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
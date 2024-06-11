 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNkpq6DSDK_m4t3ga4AD2K2gB1BC-DzE0",
  authDomain: "shabuj-global-96e16.firebaseapp.com",
  projectId: "shabuj-global-96e16",
  storageBucket: "shabuj-global-96e16.appspot.com",
  messagingSenderId: "709745748100",
  appId: "1:709745748100:web:8955e7ac196c282ddf3ad1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
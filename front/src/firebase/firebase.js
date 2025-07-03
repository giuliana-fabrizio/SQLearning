import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBKobHiJY5j9uSns7VQhRgwXDLUuQNULY8",
    authDomain: "sqlearning-l12f10.firebaseapp.com",
    projectId: "sqlearning-l12f10",
    storageBucket: "sqlearning-l12f10.firebasestorage.app",
    messagingSenderId: "36485151645",
    appId: "1:36485151645:web:81875f3b54f59adcee0d74",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
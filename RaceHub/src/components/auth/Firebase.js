// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJQSufbJ82qFSV-K3BM-DRu5lCPEUAO8M",
    authDomain: "racehub-login-register.firebaseapp.com",
    projectId: "racehub-login-register",
    storageBucket: "racehub-login-register.firebasestorage.app",
    messagingSenderId: "485769892300",
    appId: "1:485769892300:web:cfe71d375df030e1240d69",
    measurementId: "G-FQLHR2B8N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
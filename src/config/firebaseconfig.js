// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZGfnSOwksUZFDweMT8IVjIs8uuoldQdw",
    authDomain: "slider-4ca42.firebaseapp.com",
    databaseURL: "https://slider-4ca42-default-rtdb.firebaseio.com",
    projectId: "slider-4ca42",
    storageBucket: "slider-4ca42.appspot.com",
    messagingSenderId: "158140034957",
    appId: "1:158140034957:web:b7be065c64298df05b17c4",
    measurementId: "G-89CPTBTL0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export default app;
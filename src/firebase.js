// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPreHs0ZXbxTSTk6oKfYLFcN10ldrDqcM",
    authDomain: "firedrive-15296.firebaseapp.com",
    projectId: "firedrive-15296",
    storageBucket: "firedrive-15296.appspot.com",
    messagingSenderId: "369947491705",
    appId: "1:369947491705:web:85f2ceeb9835c4921f43a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
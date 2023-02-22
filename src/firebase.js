import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkIIV36zafVU_4HWK6CbCnmMbw3uwwpws",
    authDomain: "fileuploaderapp-8657e.firebaseapp.com",
    projectId: "fileuploaderapp-8657e",
    storageBucket: "fileuploaderapp-8657e.appspot.com",
    messagingSenderId: "141768471502",
    appId: "1:141768471502:web:e3538f63705fbce411319f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
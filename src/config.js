import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getDatabase} from 'firebase/database';


//Firebase
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const storage = getStorage(app)


//App
export const defaultModalAnimateDuration = 100


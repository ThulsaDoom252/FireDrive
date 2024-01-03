import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const storage = getStorage(app)
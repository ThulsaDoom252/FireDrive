import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCrJ7N9i74PgAa1IZsmzo6L5AsjExGCgkI',
    projectId: 'firedrive3-d9717',
    storageBucket: 'firedrive3-d9717.appspot.com',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const storage = getStorage(app)
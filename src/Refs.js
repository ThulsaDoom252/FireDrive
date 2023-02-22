import {getDownloadURL, listAll, ref} from "firebase/storage";
import {storage} from "./firebase";

export const currentUser = 'ThulsaDoom'
export const imagesRef = 'images'
export const imageListRef = ref(storage, `${imagesRef}/${currentUser}/`)

export const listAllFunc = (setter) => listAll(imageListRef)
    .then(data => Promise.all(data.items.map(item => getDownloadURL(item))))
    .then(urls => setter(urls));
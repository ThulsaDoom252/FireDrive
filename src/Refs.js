import {getDownloadURL, listAll, ref} from "firebase/storage";
import {storage} from "./firebase";
export const currentUser = 'ThulsaDoom'
export const photoPageTitle = 'Your photos'
export const musicPageTitle = 'Your music'
export const videosPageTitle = 'Video list'
export const imagesRef = 'images'
export const videosRef = 'videos'
export const musicRef = 'music'
export const imageListRef = ref(storage, `${imagesRef}/${currentUser}/`)

export const listAllFunc = (setter) => listAll(imageListRef).then(data => data.items.forEach(item => getDownloadURL(item).then(src => setter((prev) => [...prev, src]))))
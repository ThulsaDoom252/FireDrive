import {saveAs} from "file-saver"
import {getStorage, ref, getDownloadURL} from "firebase/storage";


export async function download(videoUrl, name) {
    const storage = getStorage();
    const storageRef = ref(storage, videoUrl);

    getDownloadURL(storageRef)
        .then(async (url) => {
            debugger
            const response = await fetch(url);
            const blob = await response.blob();
            saveAs(blob, 'video.mp4');
        })
        .catch((error) => {
            // Обработка ошибок
        });
}
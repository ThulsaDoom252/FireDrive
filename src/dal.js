import {ref, getBytes, getStorage} from 'firebase/storage';
import {imagesRoute, videosRoute} from './common/common';

const storage = getStorage();

export const download = async (url, fileName, currentRoute) => {
    try {
        const fileRef = ref(storage, url); // Создаем ссылку на файл в Storage
        const fileBytes = await getBytes(fileRef); // Получаем байты файла

        // Создаем объект Blob с байтами файла и его типом MIME
        const blob = new Blob([fileBytes], {type: 'application/octet-stream'});

        // Создаем временную ссылку на файл
        const downloadUrl = URL.createObjectURL(blob);

        // Создаем элемент <a> для скачивания файла
        const link = document.createElement('a');
        link.href = downloadUrl;
        const extension = await handleFileExtension(currentRoute)
        link.download = `${fileName}.${extension}`; // Устанавливаем имя файла
        link.click();

        console.log(`Файл "${fileName}" успешно загружен`);
    } catch (error) {
        console.error(`Ошибка при загрузке файла "${fileName}":`, error);
    }
};


const handleFileExtension = (currentRoute) => {
    return new Promise((r) => {
        let extension = ''
        switch (currentRoute) {
            case imagesRoute:
                extension = 'jpg'
                break
            case  videosRoute :
                extension = 'mp4'
                break
            default:
                extension = 'mp3'
        }
        r(extension)
    })
}


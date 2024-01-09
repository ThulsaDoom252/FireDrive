import {ref,getBytes, getStorage} from 'firebase/storage';

export const download = async (url) => {
    const storage = getStorage();

    try {
        const fileRef = ref(storage, url); // Создаем ссылку на файл в Storage
        const fileBytes = await getBytes(fileRef); // Получаем байты файла

        // Далее вы можете использовать полученные байты файла по вашему усмотрению
        // Например, вы можете сохранить файл на устройстве пользователя с помощью FileSaver.js или другой библиотеки

        console.log("Файл успешно загружен:", fileBytes);
    } catch (error) {
        console.error("Ошибка при загрузке файла:", error);
    }
};

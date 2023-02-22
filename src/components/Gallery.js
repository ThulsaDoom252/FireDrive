import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";

function Gallery({ images, setImages }) {
    const handleDeleteImage = (url) => {
        const imageRef = ref(storage, url);
        deleteObject(imageRef)
            .then(() => {
                // Обновляем список изображений без удаленного изображения
                const updatedImages = images.filter((image) => image !== url);
                setImages(updatedImages);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <section className='gallery'>
            {images.map((url) => (
                <div key={url} className='image-wrapper'>
                    <img className='image' src={url} alt='image' onClick={() => handleDeleteImage(url)} />
                    <button className='delete-button' onClick={() => handleDeleteImage(url)}>
                        Delete
                    </button>
                </div>
            ))}
        </section>
    );
}

export default Gallery;
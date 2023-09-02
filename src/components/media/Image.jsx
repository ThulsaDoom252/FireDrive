import React, {useState} from 'react';
import {CircleLoader} from "react-spinners";

const Image = ({
                   url,
                   index,
                   isAbsolute,
                   imageIsHovered,
                   imageIsClickable = true,
                   handleInitialModalIndex,
                   height = 'h-300',
                   width = 'w-300',
                   scrollPos,

               }) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false)


    const handleLoadImage = () => {
        setImageIsLoaded(true)
    }

    const handleImageLick = () => {
        imageIsClickable ? handleInitialModalIndex({index}) : void 0
    }

    return (
        <>
            {!imageIsLoaded && <CircleLoader size={50} color={'white'}/>}
            <img
                onClick={handleImageLick}
                className={`
                object-cover 
                rounded 
                cursor-pointer 
                ${!imageIsLoaded && 'hidden'}
                ${imageIsHovered && 'hover:border-2 border-blue-300'}  
                ${height}
                ${width}        
                ${isAbsolute && 'absolute'}
                transition-all duration-100
                `}

                src={url}
                alt="image"
                onLoad={handleLoadImage}
            />
        </>

    );
};

export default Image;


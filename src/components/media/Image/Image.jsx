import React, {useState} from 'react';
import {Skeleton, Tooltip} from "@mui/material";

const Image = ({
                   url,
                   index,
                   handleInitialModalIndex,
                   imageIsHovered,
                   isAbsolute,
                   imageIsClickable = true,
                   height = 'h-full',
                   width = 'w-full',
                   skeletonHeight = 300,
                   skeletonWidth = 300,
                   setIsShowOptions,
               }) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false)

    const handleLoadImage = () => {
        setImageIsLoaded(true)
        setIsShowOptions && setIsShowOptions(true)
    }

    const handleImageLick = () => {
        imageIsClickable ? handleInitialModalIndex({index}) : void 0
    }

    return (
        <>
            {!imageIsLoaded &&
                <Tooltip title={'image loading'}>
                    <Skeleton variant="rectangular" width={skeletonWidth} height={skeletonHeight} animation="wave"/>
                </Tooltip>
            }
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
                onLoad={handleLoadImage}
                alt=''
            />
        </>

    );
};

export default Image;
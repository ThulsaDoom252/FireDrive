import React, {useState} from 'react';
import {Skeleton, Tooltip} from "@mui/material";

const Image = ({
                   url,
                   index,
                   imageIsHovered,
                   isAbsolute,
                   height = 'h-full',
                   width = 'w-full',
                   skeletonHeight = 100,
                   skeletonWidth = 300,
                   setIsShowOptions,
                   handleImageClick,
               }) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false)

    const handleLoadImage = () => {
        setImageIsLoaded(true)
        setIsShowOptions && setIsShowOptions(true)
    }

    return (
        <>
            {!imageIsLoaded &&
                <Tooltip title={'image loading'}>
                    <Skeleton variant="rectangular" width={skeletonWidth} height={skeletonHeight} animation="wave"/>
                </Tooltip>
            }
            <img
                onClick={() => handleImageClick ? handleImageClick(index) : void 0}
                className={`
                object-cover 
                rounded 
                cursor-pointer
                ${imageIsHovered && 'hover:border-2 border-blue-300'}  
                ${height}
                ${width}        
                ${isAbsolute && 'absolute'}
                transition-all duration-100
                ${imageIsLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                src={url}
                onLoad={handleLoadImage}
                alt=''
            />
        </>

    );
};

export default Image;
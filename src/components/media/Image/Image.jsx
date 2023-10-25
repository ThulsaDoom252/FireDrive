import React, {useState} from 'react';
import {Tooltip} from "@mui/material";
import {preventDefault} from "../../../common/common";
import {SkeletonOverlay, StyledImage} from '../../mui/styles';

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
                    <SkeletonOverlay variant={'rectangular'}/>
                </Tooltip>
            }
            <StyledImage
                onContextMenu={preventDefault}
                onClick={() => handleImageClick ? handleImageClick(index) : void 0}
                className={`
                rounded 
                cursor-pointer
                ${imageIsHovered && 'hover:border-2 border-blue-300'}    
                transition-all duration-100
                ${imageIsLoaded ? 'opacity-100' : 'opacity-0'} `}
                src={url}
                onLoad={handleLoadImage}
                alt='image'
            />
        </>

    );
};

export default Image;
import React, {useState} from 'react';
import {Fade, Tooltip} from "@mui/material";
import {preventDefault} from "../../../common/common";
import {ItemDeletingOverlay, SkeletonOverlay, StyledImage} from '../../mui/styles';

const Image = ({
                   url,
                   imageIsHovered,
                   isAbsolute,
                   height = 'h-full',
                   width = 'w-full',
                   skeletonHeight = 100,
                   skeletonWidth = 300,
                   setIsShowOptions,
                   isMediaDeleting,
                   handleImageClick,
                   index,
                   deletedItemUrl,
               }) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false)

    const handleLoadImage = () => {
        setImageIsLoaded(true)
        setIsShowOptions && setIsShowOptions(true)
    }

    const showDeletingOverlay = url === deletedItemUrl || isMediaDeleting

    return (
        <>
            {!imageIsLoaded  &&
                <Tooltip title={'image loading'}>
                    <SkeletonOverlay variant={'rectangular'}/>
                </Tooltip>
            }
            <Fade in={showDeletingOverlay}>
                <ItemDeletingOverlay/>
            </Fade>
            <StyledImage
                onClick={() => (!isMediaDeleting && imageIsLoaded) && handleImageClick(index)}
                onContextMenu={preventDefault}
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
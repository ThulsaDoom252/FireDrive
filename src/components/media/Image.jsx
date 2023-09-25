import React, {useState} from 'react';
import {Skeleton, Tooltip} from "@mui/material";
import OpacityTransition from "../common/MyCustomTransition";
import MediaOptions from "../options/ItemOptions";

const Image = ({
                   url,
                   index,
                   name,
                   oldName,
                   isAbsolute,
                   imageIsClickable = true,
                   handleInitialModalIndex,
                   height = 'h-300',
                   width = 'w-300',
                   setHoveredMediaIndex,
                   searchMode,
                   hoveredMediaIndex,
                   setItemOptionsHovered,
                   showOptions = true


               }) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false)

    const imageIsHovered = hoveredMediaIndex === index


    const handleLoadImage = () => {
        setImageIsLoaded(true)
    }

    const handleImageLick = () => {
        imageIsClickable ? handleInitialModalIndex({index}) : void 0
    }

    return (
        <div key={index}
             onMouseEnter={() => setHoveredMediaIndex(index)}
             onMouseLeave={() => setHoveredMediaIndex(null)}
             className={'flex justify-center max-w-200 max-h-200 relative'}>
            <OpacityTransition show={(imageIsHovered && imageIsLoaded)}>
                <div className={'absolute top-0 right-0'} hidden={!showOptions}>
                    <MediaOptions name={name}
                                  oldName={oldName}
                                  url={url}
                                  {...{
                                      index,
                                      searchMode,
                                      hoveredMediaIndex,
                                      setItemOptionsHovered,
                                  }}/></div>
            </OpacityTransition>
            {!imageIsLoaded &&
                <Tooltip title={'image loading'}>
                    <Skeleton variant="rectangular" width={300} height={300} animation="wave"/>
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
        </div>

    );
};

export default Image;


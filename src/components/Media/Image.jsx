import React, {useState} from 'react';
import MediaOptions from "../Options/mediaOptions";
import OpacityTransition from "../common/MyCustomTransition";
import {ClipLoader} from "react-spinners";

const Image = ({
                   url,
                   name,
                   oldName,
                   index,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   searchMode,
                   handleInitialModalIndex,

               }) => {
    const imageHovered = hoveredMediaIndex === index
    const [itemOptionsHovered, setItemOptionsHovered] = useState(false)
    const [imageIsLoaded, setImageIsLoaded] = useState(false)

    const handleLoadImage = () => {
        setImageIsLoaded(true)
    }

    return (
        <>
                <div onMouseEnter={() => setHoveredMediaIndex(index)}
                     onMouseLeave={() => setHoveredMediaIndex(null)}>
                    <OpacityTransition show={(imageHovered || itemOptionsHovered)}>
                        <div className={'absolute top-0 right-0'}>
                            <MediaOptions {...{
                                name,
                                oldName,
                                url,
                                index,
                                searchMode,
                                itemOptionsHovered,
                                setItemOptionsHovered,
                            }}/></div>
                    </OpacityTransition>
                    <img
                        onClick={() => handleInitialModalIndex({index})}
                        className={`
                w-300 
                h-300 
                object-cover 
                rounded 
                cursor-pointer 
                ${imageHovered && 'hover:border-2 border-blue-300'}          
                transition-all duration-100
                `}

                        src={imageIsLoaded ? url : 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif'}
                        alt="image"
                        onLoad={handleLoadImage}
                    />
                </div>

        </>

    );
};

export default Image;


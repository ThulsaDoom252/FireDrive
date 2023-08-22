import React, {useState} from 'react';
import MediaOptions from "../Options/mediaOptions";
import OpacityTransition from "../common/MyCustomTransition";

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
                ${imageHovered && 'border-2 border-blue-300'}
                `}

                    src={url}
                    alt="image"/>
            </div>

        </>

    );
};

export default Image;


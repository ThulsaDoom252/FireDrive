import React, {useState} from 'react';
import OpacityTransition from "../../common/MyCustomTransition";
import MediaOptions from "../../options/ItemOptions";
import Image from "./Image";

const ImageBlock = ({
                        url,
                        index,
                        name,
                        oldName,
                        handleInitialModalIndex,
                        setHoveredMediaIndex,
                        searchMode,
                        hoveredMediaIndex,
                        setItemOptionsHovered,
                        confirm,


                    }) => {
    const imageIsHovered = hoveredMediaIndex === index
    const [showOptions, setIsShowOptions] = useState(false)


    return (
        <div key={index}
             onMouseEnter={() => setHoveredMediaIndex(index)}
             onMouseLeave={() => setHoveredMediaIndex(null)}
             className={'flex justify-center max-w-200 max-h-200 relative'}>
            <OpacityTransition show={(imageIsHovered && showOptions)}>
                <div className={'absolute top-0 right-0'}>
                    <MediaOptions name={name}
                                  oldName={oldName}
                                  url={url}
                                  {...{
                                      index,
                                      searchMode,
                                      hoveredMediaIndex,
                                      setItemOptionsHovered,
                                      confirm,
                                  }}/></div>
            </OpacityTransition>
            <Image  {...{
                url,
                setIsShowOptions,
                index,
                handleInitialModalIndex,
                imageIsHovered,
            }}/>
        </div>

    );
};

export default ImageBlock;


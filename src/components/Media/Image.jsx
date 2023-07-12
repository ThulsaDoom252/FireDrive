import React from 'react';
import MediaOptions from "../common/mediaOptions";
import MediaName from "./MediaName";

const Image = ({
                   url,
                   name,
                   oldName,
                   index,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   searchMode,
               }) => {
    const imageHovered = hoveredMediaIndex === index
    return (
        <>
            <div className={'absolute top-0 right-0'}><MediaOptions {...{name, url, index, searchMode}}/></div>
            <img
                className={`w-300 h-300 object-cover rounded  ${imageHovered &&
                'border-solid border-2 border-indigo-600'}`}
                onMouseEnter={() => setHoveredMediaIndex(index)}
                onMouseLeave={() => setHoveredMediaIndex(null)}
                src={url}
                alt="image"/>
            <MediaName {...{name, oldName}}/>

        </>

    );
};

export default Image;


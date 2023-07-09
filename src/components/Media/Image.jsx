import React from 'react';
import {truncate} from "../../common/commonData";

const Image = ({url, name, index, hoveredMediaIndex, setHoveredMediaIndex}) => {
    const imageHovered = hoveredMediaIndex === index
    return (
        <>
            <img
                className={`w-300 h-300 object-cover rounded  ${imageHovered &&
                'border-solid border-2 border-indigo-600'}`}
                onMouseEnter={() => setHoveredMediaIndex(index)}
                onMouseLeave={() => setHoveredMediaIndex(null)}
                src={url}
                alt="image"/>
            <p>{truncate(name, 15)}</p>
        </>

    );
};

export default Image;
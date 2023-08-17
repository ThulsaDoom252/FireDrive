import React from 'react';
import MediaOptions from "../Options/mediaOptions";
import {useDispatch} from 'react-redux'
import MediaName from "./MediaName";
import {handleInitialModalItemUrl} from "../../redux/appSlice";

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
    const dispatch = useDispatch()
    return (
        <>
            <div className={'absolute top-0 right-0'}><MediaOptions {...{name, oldName, url, index, searchMode}}/></div>
            <img
                onClick={() => dispatch(handleInitialModalItemUrl({index}))}
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


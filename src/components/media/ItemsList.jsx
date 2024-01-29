import React from 'react'
import {FixedSizeList} from 'react-window';
import Audio from "../media/Audio"
import {Grid} from '@mui/material';

const ListComponent = ({
                           mediaToShow,
                           hoveredMediaIndex,
                           setHoveredMediaIndex,
                           isMediaDeleting,
                           deletedItemUrl,
                           searchMode,
                           smallScreen,
                           confirm,
                           handleModal,
                       }) => {

    const Row = ({index}) => (
        <Audio
            audioIndex={mediaToShow[index].index}
            url={mediaToShow[index].url}
            name={mediaToShow[index].name}
            oldName={mediaToShow[index].oldName}
            size={mediaToShow[index].size}
            index={index}
            {...{
                hoveredMediaIndex,
                setHoveredMediaIndex,
                isMediaDeleting,
                deletedItemUrl,
                index,
                searchMode,
                smallScreen,
                confirm,
                handleModal,
            }}
        />
    );

    return (
        <FixedSizeList
            height={window.innerHeight}
            width={window.innerWidth}
            itemCount={mediaToShow.length}
            itemSize={50}
        >
            {Row}
        </FixedSizeList>
    );
};

export default ListComponent;
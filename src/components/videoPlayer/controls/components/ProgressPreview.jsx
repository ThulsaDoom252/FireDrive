import React from 'react';
import ReactPlayer from "react-player";
import {dividedValue, formatTime} from "../../../../common/commonData";

const ProgressPreview = ({mouseX, previewTime, url, previewRef}) => {

    const formattedValue = dividedValue(mouseX)

    const previewStyle = {
        bottom: '50px',
        left: `${formattedValue}px`
    }

    return (
        <div className={`
        absolute 
        h-28 
        w-60 
        flex 
        flex-col
        justify-start 
        items-center
        bg-transparent
        `} style={previewStyle}>
            <ReactPlayer url={url}
                         ref={previewRef}
                         height={'100%'}
                         width={'100%'}
                         muted={true}
                         playing={false}/>
            <div className={'relative bottom-2'}>{formatTime(previewTime)}</div>
        </div>
    );
};

export default ProgressPreview;
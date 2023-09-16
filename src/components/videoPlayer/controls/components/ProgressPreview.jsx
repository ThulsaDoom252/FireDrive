import React from 'react';
import ReactPlayer from "react-player";
import {formatTime} from "../../../../common/commonData";

const ProgressPreview = ({mouseX, previewTime, url, previewRef}) => {


    // const formattedValue = dividedValue(mouseX);

    const previewStyle = {
        position: 'absolute',
        bottom: '50px',
        transform: `translateX(${mouseX}px)`,
        left: '-250px',
    };


    return (
        <div
            className={`
                absolute 
                h-28 
                w-60 
                flex 
                flex-col
                justify-start
                items-center
                bg-transparent
            `}
            style={previewStyle}
        >
            <ReactPlayer
                url={url}
                ref={previewRef}
                height={'100%'}
                width={'100%'}
                muted={true}
                playing={false}
            />
            <div className={'relative bottom-2'}>{formatTime(previewTime)}</div>
        </div>
    );
};

export default ProgressPreview;

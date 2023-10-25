import React from 'react';
import ReactPlayer from "react-player";
import {formatTime} from "../../../../common/common";

const Preview = ({mouseX, previewTime, url, previewRef, smallScreenMode, touchX}) => {

    const previewStyle = {
        position: 'absolute',
        bottom: '50px',
        transform: smallScreenMode ? `translateX(${touchX}px)` : `translateX(${mouseX}px)`,
        left: `${smallScreenMode ? '-50px' : '-250px'}`,
    };

    return (
        <div
            className={`
        absolute
        flex
        flex-col
        justify-start
        items-center
        bg-transparent
            ${smallScreenMode ? 'h-20 w-40' : 'h-28 w-60'}
        `
            }
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

export default Preview;

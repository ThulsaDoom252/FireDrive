import React, {useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {formatTime} from "../../common/commonData";

const ModalVideoItem = ({
                            item,
                            index,
                            onClick,
                            currentModalItemUrl,
                            info,
                            column = false
                        }) => {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [totalTime, setTotalTime] = useState(0)

    const handleMouseEnter = () => {
        setIsPlaying(true);
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        videoRef.current.seekTo(0);
    };

    const formatCurrentPlayerTime = () => {
        setTotalTime(formatTime(videoRef.current.getDuration()))
    }

    return (
        <div key={index} className={`
        w-80% 
        h-32 
        mt-3 
        mb-3  
        rounded 
        flex 
        justify-center 
        ${info === 'center' ? 'items-center' : 'items-start'}
        ${column && 'flex-col'}
        `}>
            <div
                onClick={() => onClick(index)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={` relative w-full h-full  bg-black rounded ${item.url === currentModalItemUrl && 'border-4 border-amber-300'} flex items-center justify-center cursor-pointer`}>
                <ReactPlayer onReady={formatCurrentPlayerTime}
                             volume={0}
                             playing={isPlaying}
                             ref={videoRef} url={item?.url || ''} height={'98%'}
                             width={'98%'}/>
                <div
                    className='absolute bottom-0 left-2 text-white'>{totalTime}</div>
            </div>
            <div className={`
            text-white
            w-full 
            text-center
            ${info !== 'center' && 'mt-3'}
            
            `}>{item?.name || ''}</div>
        </div>
    );
};

export default ModalVideoItem;
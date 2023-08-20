import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {formatTime} from "../../common/commonData";
import {ClipLoader} from "react-spinners";

const ModalVideoItem = ({item, index, onClick, currentModalItemUrl}) => {
    const videoRef = useRef(null)
    const [isPlayerReady, setIsPlayerReady] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0)
    const current = videoRef.current


    // useEffect(() => {
    //     isPlayerReady && setTotalTime(videoRef.current.getDuration())
    // }, [isPlayerReady])

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
        <div key={index} className='w-80% h-32 mt-5 mb-4  rounded flex flex-col justify-center items-center'>
            <div
                onClick={() => onClick(index)}
                className={` relative w-full h-full  bg-black rounded ${item.url === currentModalItemUrl && 'border-4 border-amber-300'} flex items-center justify-center cursor-pointer`}>
                <ReactPlayer onReady={formatCurrentPlayerTime} ref={videoRef} url={item?.url || ''} height={'98%'}
                             width={'98%'}/>
                <div
                    className='absolute bottom-0 left-2 text-white'>{totalTime}</div>
            </div>
            <div className={'text-black w-full text-center'}>{item?.name || ''}</div>
        </div>
    );
};

export default ModalVideoItem;
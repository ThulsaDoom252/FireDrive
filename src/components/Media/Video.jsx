import React, {useState, useRef} from 'react';
import ReactPlayer from "react-player";
import MediaOptions from "../Options/mediaOptions";
import {formatTime} from "../../common/commonData";
import MyCustomTransition from "../common/MyCustomTransition";
import {BiSolidVolume, BiVolumeMute} from "react-icons/bi";

const Video = ({
                   url,
                   name,
                   oldName,
                   searchMode,
                   index,
                   handleInitialModalIndex,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   itemOptionsHovered,
                   setItemOptionsHovered,
                   noOpenModal,
               }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(0)
    const playerRef = useRef(null);

    const isVideoHovered = hoveredMediaIndex === index

    const handleMouseEnter = () => {
        setIsPlaying(true);
        setHoveredMediaIndex(index)
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        setHoveredMediaIndex(null)
        playerRef.current.seekTo(0);
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };

    const handleVolume = e => {
        e.stopPropagation()
        setCurrentVolume(prevState => {
            if (prevState === 0) {
                setCurrentVolume(1)
            } else {
                setCurrentVolume(0)
            }
        })
    }
    return (
        <>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={'relative'}>
                <MyCustomTransition show={isVideoHovered && noOpenModal}>
                    <div className={'absolute top-0 right-0 z-50'}><MediaOptions {...{
                        name,
                        oldName,
                        url,
                        index,
                        searchMode,
                        itemOptionsHovered,
                        setItemOptionsHovered
                    }} />
                    </div>
                </MyCustomTransition>
                <div
                    className={`player-container h-200 bg-black 
                    ${!isVideoHovered && 'rounded-t-lg'} overflow-hidden cursor-pointer`}
                    onClick={() => handleInitialModalIndex({index, modalType: 'video'})}
                >
                    <ReactPlayer
                        ref={playerRef}
                        url={url}
                        width="100%"
                        height="100%"
                        playing={isPlaying}
                        volume={currentVolume}
                        onEnded={() => setIsPlaying(false)}
                        onProgress={handleProgress}
                    />
                    <div className="absolute bottom-2 text-white left-2 flex justify-between w-full">
                        <div className={'flex'}>
                            <MyCustomTransition show={isPlaying}>
                                {formatTime(currentTime)}
                                {' / '}
                            </MyCustomTransition>
                            {playerRef.current && formatTime(playerRef.current.getDuration())}
                        </div>
                        <MyCustomTransition show={isPlaying}>
                            <div className={`
                            absolute 
                            flex
                            justify-center
                            items-center
                            w-14
                            h-5
                            right-1
                            bottom-0.4
                            transition-all duration-300
                            hover:text-white
                            text-gray-400`}
                                 onClick={handleVolume}
                            >
                                {currentVolume === 0 ? <BiVolumeMute/> : <BiSolidVolume/>}
                            </div>
                        </MyCustomTransition>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Video;
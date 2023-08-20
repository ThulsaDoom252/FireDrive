import React, {useState, useRef} from 'react';
import ReactPlayer from "react-player";
import MediaOptions from "../Options/mediaOptions";
import MediaName from "./MediaName";
import {formatTime} from "../../common/commonData";
import MyCustomTransition from "../common/MyCustomTransition";

const Video = ({
                   url,
                   name,
                   oldName,
                   searchMode,
                   index,
                   handleInitialModalIndex,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   itemOptionsHovered, setItemOptionsHovered,
               }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
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

    return (
        <>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <MyCustomTransition show={isVideoHovered}>
                    <div className={'absolute top-0 right-0 z-50'}><MediaOptions {...{
                        name,
                        url,
                        index,
                        searchMode,
                        itemOptionsHovered,
                        setItemOptionsHovered
                    }} />
                    </div>
                </MyCustomTransition>
                <div
                    className={`player-container h-200 bg-black ${!isVideoHovered && 'rounded'}-lg overflow-hidden cursor-pointer`}
                    onClick={() => handleInitialModalIndex({index, modalType: 'video'})}
                >
                    <ReactPlayer
                        ref={playerRef}
                        url={url}
                        width="100%"
                        height="100%"
                        playing={isPlaying}
                        volume={0}
                        onEnded={() => setIsPlaying(false)}
                        onProgress={handleProgress}
                    />
                    <div className="absolute bottom-5 text-white left-2 flex">
                        <MyCustomTransition show={isPlaying}>
                            {formatTime(currentTime)}
                            {' / '}
                        </MyCustomTransition>
                        {playerRef.current && formatTime(playerRef.current.getDuration())}
                    </div>
                </div>
                <MediaName {...{name, oldName}} />

            </div>
        </>
    );
};

export default Video;
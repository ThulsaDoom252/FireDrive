import React, {useState, useRef} from 'react';
import ReactPlayer from "react-player";
import MediaOptions from "../Options/mediaOptions";
import MediaName from "./MediaName";
import {formatTime} from "../../common/commonData";
import {Transition} from "@headlessui/react";
import OpacityTransition from "../common/OpacityTransition";
import {useDispatch} from "react-redux";
import {handleInitialModalIndex} from "../../redux/appSlice";

const Video = ({url, name, oldName, searchMode, index}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const playerRef = useRef(null);

    const handleMouseEnter = () => {
        setIsPlaying(true);
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        playerRef.current.seekTo(0);
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };

    const dispatch = useDispatch()

    return (
        <>
            <div className={'absolute top-0 right-0 z-50'}><MediaOptions {...{name, url, index, searchMode}} /></div>
            <div className="player-container h-200 bg-black rounded-lg overflow-hidden cursor-pointer"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 onClick={() => dispatch(handleInitialModalIndex({index, modalType: 'video'}))}
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
                <div className="absolute bottom-5 text-white left-2">
                    <OpacityTransition isOpen={isPlaying}>
                        {formatTime(currentTime)}
                        {' / '}
                        {playerRef.current && formatTime(playerRef.current.getDuration())}
                    </OpacityTransition>
                </div>
            </div>
            <MediaName {...{name, oldName}} />
        </>
    );
};

export default Video;
import React, {useRef} from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import MediaOptions from "../Options/mediaOptions";
import MediaName from "./MediaName";
import {formatTime} from "../../common/commonData";
import {ClipLoader} from "react-spinners";

const Audio = ({
                   name,
                   oldName,
                   url,
                   searchMode,
                   audioIndex = 0,
                   index = 0,
                   hoveredMediaIndex,
                   setHoveredMediaIndex
               }) => {

    const audioContext = useContext(AudioPlayerContext)
    const audioRef = useRef(url)

    const {
        currentTrackName,
        currentDuration,
        handleSetCurrentAudioIndex,
        isCurrentTrackPlaying,
    } = audioContext

    const isTrackFromTheListPlaying = isCurrentTrackPlaying && currentTrackName === name

    const currentTrackPlaying = currentTrackName === name
    const currentTrackHovered = hoveredMediaIndex === audioIndex

    const isDurationIsNan = isNaN(audioRef?.current?.duration)

    return (
        <>
            <audio hidden={true} src={url || ''} ref={audioRef}></audio>
            <div
                className={`${currentTrackPlaying || currentTrackHovered ? 'bg-yellow-600' : 'bg-blue-500'} -full  h-40  text-white flex items-center mb-5  relative rounded flex`}
                onMouseEnter={() => setHoveredMediaIndex(audioIndex)}
                onMouseLeave={() => setHoveredMediaIndex(null)}
            >
                <div>
                    <div className={'w-10 text-xl h-full flex justify-center items-center hover:cursor-pointer'}
                         onClick={() => handleSetCurrentAudioIndex({index: audioIndex})}>
                        {isTrackFromTheListPlaying ? <AiFillPauseCircle/> : <AiFillPlayCircle/>}
                    </div>
                </div>
                <MediaName textColor={'black'} {...{name, oldName}}/>
                {(currentTrackName === name || hoveredMediaIndex === index) &&
                    <div className={'absolute top-1/2 transform -translate-y-1/2 right-0 z-50 mr-40 '}>
                        <MediaOptions {...{name, url, index, searchMode}}/>
                    </div>}

                <div className={'flex mr-5 '}>
                    <div>{currentTrackName === name && `${formatTime(currentDuration)}/`}</div>
                    <div>{!isDurationIsNan ? formatTime(audioRef.current.duration) :
                        <ClipLoader color={'orange'} size={20}/>}</div>
                </div>


            </div>
        </>

    );
};

export default Audio;
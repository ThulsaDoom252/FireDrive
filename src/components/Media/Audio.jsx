import React, {useEffect, useRef, useState} from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import MediaOptions from "../Options/mediaOptions";
import {formatTime} from "../../common/commonData";
import {ClipLoader} from "react-spinners";
import {dayPrimary} from "../../common/themes";
import {truncate} from "../../common/commonData";

const Audio = ({
                   name,
                   url,
                   searchMode,
                   audioIndex = 0,
                   index = 0,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   smallScreen,
                   currentTheme,
               }) => {

    const audioContext = useContext(AudioPlayerContext)
    const audioRef = useRef(url)
    const itemHovered = hoveredMediaIndex === index && !smallScreen
    const [totalDuration, setTotalDuration] = useState(0)

    const formattedTotalTime = () => {
        const formattedDuration = formatTime(audioRef.current.duration)
        setTotalDuration(formattedDuration)
    }

    const {
        currentTrackName,
        currentDuration,
        handleSetCurrentAudioIndex,
        isCurrentTrackPlaying,
    } = audioContext

    const isTrackFromTheListPlaying = isCurrentTrackPlaying && currentTrackName === name

    const currentTrackPlaying = currentTrackName === name
    const currentTrackHovered = hoveredMediaIndex === audioIndex

    return (
        <>
            <audio onCanPlay={formattedTotalTime} hidden={true} src={url || ''} ref={audioRef}></audio>
            <div
                onClick={() => handleSetCurrentAudioIndex({index: audioIndex})}
                className={` 
                h-45  
                text-white 
                flex 
                justify-between
                items-center 
                mb-3  
                relative 
                rounded 
                border-b-2
                cursor-pointer
                ${(currentTrackPlaying || currentTrackHovered) ? 'bg-opacity-100' : 'bg-opacity-80'}
                 ${(currentTrackPlaying || currentTrackHovered) ? currentTheme.primeBg : currentTheme.secBg}  
                
                `}
                onMouseEnter={() => setHoveredMediaIndex(audioIndex)}
                onMouseLeave={() => setHoveredMediaIndex(null)}
            >
                <div>
                    <div className={'w-10 text-xl h-full flex justify-center items-center hover:cursor-pointer'}
                    >
                        {isTrackFromTheListPlaying ? <AiFillPauseCircle
                                size={25}
                                color={currentTheme.color === dayPrimary && 'black'}/>
                            : (<AiFillPlayCircle size={25} color={currentTheme.color === dayPrimary && 'black'}/>)}
                    </div>
                </div>
                <div
                    className={`w-full absolute left-10  ${currentTheme.color}`}>{smallScreen ? truncate(name, 20) : truncate(name, 50)}</div>
                <div className={'absolute top-1/2 transform -translate-y-1/2 right-0 z-50 mr-40'}>
                    <MediaOptions initialMode={'show'} itemOptionsHovered={itemHovered} {...{
                        name,
                        url,
                        hoveredMediaIndex,
                        index,
                        searchMode
                    }}/>
                </div>
                <div
                    className={'flex mr-5 '}>
                    <div
                        className={`${currentTheme.color}`}>{currentTrackName === name && `${formatTime(currentDuration)}/`}</div>
                    <div className={`${currentTheme.color}`}>{totalDuration === 0 ?
                        <ClipLoader size={25}/> : totalDuration}</div>
                </div>


            </div>
        </>

    );
};

export default Audio;
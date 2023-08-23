import React, {useEffect, useRef, useState} from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import MediaOptions from "../Options/mediaOptions";
import {formatTime} from "../../common/commonData";
import {ClipLoader} from "react-spinners";
import {dayPrimary} from "../../common/themes";
import toast from "react-hot-toast";

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
                onClick={() => handleSetCurrentAudioIndex({index: audioIndex})}
                className={`
                ${(currentTrackPlaying || currentTrackHovered) ? currentTheme.primeBg : currentTheme.secBg}   
                h-40  
                text-white 
                flex 
                items-center 
                mb-5  
                relative 
                rounded 
                cursor-pointer
                
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
                    className={`w-full  ${currentTheme.color}`}>{name}</div>
                <div className={'absolute top-1/2 transform -translate-y-1/2 right-0 z-50 mr-40'}>
                    <MediaOptions initialMode={'show'} itemOptionsHovered={itemHovered} {...{
                        name,
                        url,
                        index,
                        searchMode
                    }}/>
                </div>
                <div
                    className={'flex mr-5'}>
                    <div
                        className={`${currentTheme.color}`}>{currentTrackName === name && `${formatTime(currentDuration)}/`}</div>
                    <div className={`${currentTheme.color}`}>{!isDurationIsNan ? formatTime(audioRef.current.duration) :
                        <ClipLoader color={'orange'} size={20}/>}</div>
                </div>


            </div>
        </>

    );
};

export default Audio;
import React, {useRef, useState} from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import ItemOptions from "../options/ItemOptions";
import {formatTime} from "../../common/commonData";
import {ClipLoader} from "react-spinners";
import {dayPrimary} from "../../common/themes";
import {truncate} from "../../common/commonData";
import {Fade} from "@mui/material";
import {Skeleton, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {customBtns} from "../mui/styles";

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
                   skeletonWidth = 40,
                   skeletonHeight = 40,
               }) => {

    const audioContext = useContext(AudioPlayerContext)
    const audioRef = useRef(url)
    const isAudioHovered = (hoveredMediaIndex === index) && !smallScreen
    const [totalDuration, setTotalDuration] = useState(0)
    const [isAudioLoaded, setIsAudioLoaded] = useState(false)

    const formatTotalTime = () => {
        const formattedDuration = formatTime(audioRef.current.duration)
        setTotalDuration(formattedDuration)
    }


    const handleLoadAudio = () => {
        formatTotalTime()
        setIsAudioLoaded(true)
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
            <audio onCanPlay={handleLoadAudio} hidden={true} src={url || ''} ref={audioRef}></audio>
            <div
                onClick={() => handleSetCurrentAudioIndex({index: audioIndex})}
                className={` 
                transition-all
                duration-200
                h-45  
                text-white 
                flex 
                justify-between
                items-center 
                mb-3  
                relative 
                rounded 
                cursor-pointer
                ${!isAudioLoaded ? 'bg-opacity-0' : 'border-b-2'}
                ${(currentTrackPlaying || currentTrackHovered) ? 'bg-opacity-100' : 'bg-opacity-80'}
                 ${(currentTrackPlaying || currentTrackHovered) ? currentTheme.primeBg : currentTheme.secBg}  
                
                `}
                onMouseEnter={() => setHoveredMediaIndex(audioIndex)}
                onMouseLeave={() => setHoveredMediaIndex(null)}
            >
                {isAudioLoaded ?
                    <>
                        <div>
                            <Button
                                className={`relative right-3`}
                                sx={customBtns.autdioTrackBtn}
                                // className={'w-10 text-xl h-full flex justify-center items-center hover:cursor-pointer'}
                            >
                                {isTrackFromTheListPlaying ? <AiFillPauseCircle
                                        size={25}
                                        color={currentTheme.color === dayPrimary && 'black'}/>
                                    : (<AiFillPlayCircle size={25}
                                                         color={currentTheme.color === dayPrimary && 'black'}/>)}
                            </Button>
                        </div>
                        <div
                            className={`w-full absolute left-10  ${currentTheme.color}`}>{smallScreen ? truncate(name, 20) : truncate(name, 50)}</div>
                        <Fade in={isAudioHovered} timeout={100}>
                            <div className={'absolute top-1/2 transform -translate-y-1/2 right-0 z-50 mr-40'}>
                                <ItemOptions
                                    initialMode={'show'}
                                    itemOptionsHovered={isAudioHovered} {...{
                                    name,
                                    url,
                                    hoveredMediaIndex,
                                    index,
                                    searchMode
                                }}/>


                            </div>
                        </Fade>
                        <div
                            className={'flex mr-5 '}>
                            <div
                                className={`${currentTheme.color}`}>{currentTrackName === name && `${formatTime(currentDuration)}/`}</div>
                            <div className={`${currentTheme.color}`}>{totalDuration === 0 ?
                                <ClipLoader size={25}/> : totalDuration}</div>
                        </div>
                    </> : <Tooltip title={'audio loading'}>
                        <Skeleton variant="rectangular" width={skeletonWidth} height={skeletonHeight} animation="wave"
                                  style={{width: '100%', height: '100%'}}/>
                    </Tooltip>}


            </div>
        </>

    );
};

export default Audio;
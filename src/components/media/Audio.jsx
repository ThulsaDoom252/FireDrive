import React, {useRef, useState} from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import ItemOptions from "../options/ItemOptions";
import {formatTime} from "../../common/commonData";
import {ClipLoader} from "react-spinners";
import {Fade} from "@mui/material";
import {Skeleton, Tooltip} from "@mui/material";
import FittedThemeBtn from "../common/theme/FittedThemeBtn";
import AudioThemeContainer from "../common/theme/AudioThemeContainer";

const Audio = ({
                   name,
                   url,
                   searchMode,
                   audioIndex = 0,
                   index = 0,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   smallScreen,
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
            <AudioThemeContainer onClick={() => handleSetCurrentAudioIndex({index: audioIndex})}
                                 className={`
                                  transition-all
                duration-100
                h-45  
                flex 
                justify-between
                items-center 
                mb-3  
                relative 
                rounded 
                cursor-pointer`}
                                 isAudioLoaded
                                 primeBgCondition={currentTrackPlaying || currentTrackHovered}
                                 onMouseEnter={() => setHoveredMediaIndex(audioIndex)}
                                 onMouseLeave={() => setHoveredMediaIndex(null)}
            >
                {isAudioLoaded ?
                    <>
                        <div>
                            <FittedThemeBtn
                                optionalClasses={{position: 'relative', right: 3}}
                            >
                                {isTrackFromTheListPlaying ? <AiFillPauseCircle
                                        size={25}/>
                                    : <AiFillPlayCircle size={25}/>}
                            </FittedThemeBtn>
                        </div>
                        <div className={`w-full absolute left-10 truncate`}>{name}</div>
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
                            <div>{currentTrackName === name && `${formatTime(currentDuration)}/`}</div>
                            <div>{totalDuration === 0 ?
                                <ClipLoader size={25}/> : totalDuration}</div>
                        </div>
                    </> : <Tooltip title={'audio loading'}>
                        <Skeleton variant="rectangular" width={skeletonWidth} height={skeletonHeight} animation="wave"
                                  style={{width: '100%', height: '100%'}}/>
                    </Tooltip>}


            </AudioThemeContainer>
        </>

    );
};

export default Audio;
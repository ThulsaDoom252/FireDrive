import React, {useCallback, useMemo, useRef, useState} from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import ItemOptions from "../common/ItemOptions/ItemOptions";
import {formatTime, showItemOptionsTime} from "../../common/common";
import {ClipLoader} from "react-spinners";
import {Fade} from "@mui/material";
import {Skeleton, Tooltip} from "@mui/material";
import FittedThemeBtn from "../common/theme/FittedThemeBtn";
import AudioThemeContainer from "../common/theme/AudioThemeContainer";
import {ItemDeletingOverlay} from '../mui/styles';

const Audio = ({
                   name,
                   oldName,
                   url,
                   searchMode,
                   audioIndex = 0,
                   index = 0,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   smallScreen,
                   skeletonWidth = 40,
                   skeletonHeight = 40,
                   isMediaDeleting,
                   deletedItemUrl,
                   confirm,
                   handleModal,
               }) => {

    const audioContext = useContext(AudioPlayerContext)
    const audioRef = useRef(url)
    const isAudioHovered = useMemo(() => hoveredMediaIndex === index && !smallScreen, [hoveredMediaIndex, index, smallScreen])
    const [totalDuration, setTotalDuration] = useState(0)
    const [isAudioLoaded, setIsAudioLoaded] = useState(false)

    const showDeletingOverlay = useMemo(() => {
        return isMediaDeleting || deletedItemUrl === url;
    }, [isMediaDeleting, deletedItemUrl, url]);

    const formatTotalTime = useCallback(() => {
        const formattedDuration = formatTime(audioRef.current.duration);
        setTotalDuration(formattedDuration);
    }, [audioRef.current?.duration])

    const handleLoadAudio = useCallback(() => {
        formatTotalTime()
        setIsAudioLoaded(true)
    }, [isAudioLoaded])

    const {
        currentTrackName,
        currentDuration,
        handleSetCurrentAudioIndex,
        isCurrentTrackPlaying,
    } = audioContext

    const isTrackFromTheListPlaying = isCurrentTrackPlaying && currentTrackName === name

    const currentTrackPlaying = useMemo(() => {
        return currentTrackName === name
    }, [currentTrackName, name])

    const isCurrentTrackHovered = useMemo(() => {
        return hoveredMediaIndex === audioIndex
    }, [hoveredMediaIndex, audioIndex])

    const itemOptionsMarkUp = useMemo(() => {
        return (
            <ItemOptions
                initialMode={'show'}
                itemOptionsHovered={isAudioHovered} {...{
                name,
                oldName,
                url,
                hoveredMediaIndex,
                index,
                searchMode,
                confirm,
                handleModal,
            }}/>
        )
    }, [isAudioHovered, showDeletingOverlay, index, hoveredMediaIndex])


    const testFunction = useMemo(() => {
        return (
            <div>Hello fucking world!</div>
        )
    }, [])

    return (
        <>
            <audio onCanPlay={handleLoadAudio} hidden={true} src={url || ''} ref={audioRef}></audio>
            <AudioThemeContainer

                onClick={() => handleSetCurrentAudioIndex({index: audioIndex})}
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
                primeBgCondition={currentTrackPlaying || isCurrentTrackHovered}
                onMouseEnter={() => setHoveredMediaIndex(audioIndex)}
                onMouseLeave={() => setHoveredMediaIndex(null)}
            >
                {showDeletingOverlay && <ItemDeletingOverlay/>}
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
                        <div className={`w-60% absolute left-10 truncate`}>{name}</div>

                        <div
                            className={'flex mr-5 '}>
                            <div>{currentTrackName === name && `${formatTime(currentDuration)}/`}</div>
                            <div>{totalDuration === 0 ?
                                <ClipLoader size={25}/> : totalDuration}</div>
                        </div>
                        <div>
                            {testFunction}
                        </div>
                    </> : <Tooltip title={'audio loading'}>
                        <React.Fragment>
                            <Skeleton variant="rectangular" width={skeletonWidth} height={skeletonHeight}
                                      animation="wave"
                                      style={{width: '100%', height: '100%'}}/>
                            <Fade in={isAudioHovered} timeout={showItemOptionsTime}>
                                <div hidden={showDeletingOverlay}
                                     className={'absolute top-1/2 transform -translate-y-1/2 right-0 z-50 mr-40'}>
                                    {itemOptionsMarkUp}
                                </div>
                            </Fade>

                        </React.Fragment>
                    </Tooltip>}
            </AudioThemeContainer>
        </>

    );
};

export default Audio;
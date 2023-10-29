import React, {useState, useRef, useEffect, useCallback} from 'react';
import ReactPlayer from "react-player";
import ItemOptions from "../options/ItemOptions";
import {delay, formatTime, preventDefault} from "../../common/common";
import {BiSolidVolume, BiVolumeMute} from "react-icons/bi";
import {Box, Tooltip} from "@mui/material";
import {Fade} from "@mui/material";
import VideoItemThemeContainer from "../common/theme/VideoItemThemeContainer";
import {videoContainerStyle} from "../../common/styles";
import {ItemDeletingOverlay, SkeletonOverlay} from '../mui/styles';

const Video = ({
                   url,
                   name,
                   oldName,
                   searchMode,
                   index,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   itemOptionsHovered,
                   setItemOptionsHovered,
                   noOpenModal,
                   smallScreen,
                   handleVideoClick,
                   handleModal,
                   confirm,
                   deletedItemUrl,
                   isMediaDeleting,
               }) => {
    const [videoState, setVideoState] = useState({
        isVideoReady: false,
        isPlaying: false,
        currentTime: 0,
        currentVolume: 0,
        totalDuration: null,
        previewVideoDuration: null,
    });

    const showDeletingOverlay = isMediaDeleting || url === deletedItemUrl

    const {
        isVideoReady, isPlaying, previewVideoDuration, currentVolume,
        currentTime, totalDuration
    } = videoState
    const playerRef = useRef(null);
    const [isVideoOptionsAnimated, animateOptions] = useState(false)

    const handleRewindVideo = useCallback(() => {
        const totalDurationValue = playerRef.current.getDuration();
        const previewTimeValue = totalDurationValue / 10;
        setVideoState(prevState => ({
            ...prevState,
            totalDuration: totalDurationValue,
            previewVideoDuration: previewTimeValue,
        }))
        playerRef.current.seekTo(previewTimeValue);
    }, [playerRef]);

    useEffect(() => {
        if (isVideoReady) {
            handleRewindVideo();
        }
    }, [isVideoReady, handleRewindVideo]);

    const toggleOptionsAnimation = async (shouldAnimate) => {
        await delay(100)
        animateOptions(shouldAnimate)
    }

    const isVideoHovered = hoveredMediaIndex === index
    const mountVideoItemOptions = isVideoHovered && noOpenModal

    useEffect(() => {
        if (mountVideoItemOptions) {
            !isVideoOptionsAnimated && toggleOptionsAnimation(true)
        } else {
            isVideoOptionsAnimated && toggleOptionsAnimation(false)
        }

        // eslint-disable-next-line
    }, [hoveredMediaIndex])


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (hoveredMediaIndex === index) {
                setVideoState(prevState => ({
                    ...prevState, currentTime: 0
                }))
                playerRef.current.seekTo(0);
                handlePlayVideo(true)
            }
        }, 800);

        if (hoveredMediaIndex !== index) {
            if (isPlaying) {
                playerRef.current.seekTo(previewVideoDuration)
                handlePlayVideo(false)
            }
        }

        return () => {
            clearTimeout(timeoutId);
        };

        // eslint-disable-next-line
    }, [hoveredMediaIndex]);

    const handleMouseEnter = async () => {
        setHoveredMediaIndex(index)
    };

    const handleMouseLeave = () => {
        setHoveredMediaIndex(null)
    };

    const handleProgress = (progress) => {
        setVideoState(prevValue => ({
            ...prevValue,
            currentTime: progress.playedSeconds
        }))
    };

    const handleVolume = e => {
        e.stopPropagation();
        setVideoState(prevState => ({
            ...prevState,
            currentVolume: prevState.currentVolume === 0 ? 1 : 0,
        }));
    };

    const handlePlayVideo = (shouldVideoPlay) => {
        setVideoState(prevState => ({
            ...prevState,
            isPlaying: shouldVideoPlay
        }))
    }

    const handleVideoReady = () => {
        setVideoState(prevState => ({
            ...prevState,
            isVideoReady: true
        }))
    }

    const playerStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: isVideoReady ? 'block' : 'none',
    }


    return (
        <>
            <Box
                style={videoContainerStyle}
                onContextMenu={preventDefault}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={` 
                overflow-hidden
                     cursor-pointer
                      ${!isVideoHovered && 'rounded-t-lg'} 
                      ${isVideoReady && 'bg-black'}
                     `}
                onClick={() => handleVideoClick(index)}>
                {!isVideoReady && <Tooltip title={'video loading'}>
                    <SkeletonOverlay variant="rectangular"/>
                </Tooltip>}
                {mountVideoItemOptions && !deletedItemUrl &&
                    <Fade in={isVideoOptionsAnimated}>
                        <div className={'absolute top-0 right-0 z-50'}><ItemOptions {...{
                            name,
                            oldName,
                            url,
                            index,
                            searchMode,
                            itemOptionsHovered,
                            setItemOptionsHovered,
                            hoveredMediaIndex,
                            handleModal,
                            confirm,
                        }} />
                        </div>
                    </Fade>}
                <Fade in={showDeletingOverlay}>
                    <ItemDeletingOverlay/>
                </Fade>
                <ReactPlayer
                    style={playerStyles}
                    ref={playerRef}
                    url={url}
                    width="100%"
                    height="100%"
                    onReady={handleVideoReady}
                    playing={isPlaying}
                    volume={currentVolume}
                    onEnded={() => handlePlayVideo(true)}
                    onProgress={handleProgress}
                />
                <div
                    className={`absolute bottom-2 text-white flex justify-between w-full left-1 ${isPlaying && 'left-2'}`}>

                    <div className={'flex'}>
                        <div
                            className={`transition-all duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 absolute'}`}>{formatTime(currentTime)}
                            {' / '}</div>
                        {playerRef.current && formatTime(totalDuration)}
                    </div>
                    <Fade in={isPlaying}>
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
                    </Fade>
                </div>
            </Box>
            {
                (!smallScreen && isVideoReady) && <VideoItemThemeContainer
                    opacityCondition={hoveredMediaIndex === index}
                    className={`                             
                                p-1
                                 m-0 
                                 text-center
                                 truncate
                                 overflow-x-hidden
                                `}>{name}</VideoItemThemeContainer>
            }
        </>
    )
        ;
};

export default Video;
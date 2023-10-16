import React, {useContext, useEffect, useRef, useState} from 'react';
import {ItemsModalContext} from "../../../context/ItemsModalContext";
import {formatTime, videoModal} from "../../../common/commonData";
import VideoModal from "./VideoModal";
import {VideoControlsContext} from "../../../context/VideoControlsContext";
import {AudioPlayerContext} from "../../../context/AudioPlayerContext";

const VideoModalContainer = ({animateModal, toggleModal, confirm, handleCurrentModal}) => {

    const CustomControlsContext = useContext(VideoControlsContext)
    const audioPlayerContext = useContext(AudioPlayerContext)
    const ModalContext = useContext(ItemsModalContext);

    const [isVideoReady, setIsVideoReady] = useState(false);

    // listed video in modal ref and state
    const listedVideoInModalRef = useRef(null)
    const [listedVideoHoveredIndex, setListedVideoHoveredIndex] = useState(null)
    const [listedVideoTotalTime, setListedVideoTotalTime] = useState(0)
    const [isListedVideoReady, setIsListedVideoReady] = useState(false)

    const {isCurrentTrackPlaying, toggleCurrentTrackPlaying} = audioPlayerContext

    const {
        controlBtnAnimation,
        topBtnClass,
        isSliderHovered,
        isFullScreen,
        mouseX,
        touchX,
        playerRef,
        playBackValues,
        currentSpeedValue,
        currentScaleValue,
        isScaleSubMenuOpen,
        isSpeedSubMenuOpen,
        isVideoMenuOpen,
        handleMainClick,
        handleVideoMenu,
        handleScaleSubMenu,
        handleSpeedSubMenu,
        handleClearSubMenu,
        requestFullScreen,
        handlePlaySpeed,
        handleMouseMove,
        handleTouchMove,
        changeVideoScale,
        handleVideoVolumeChange,
        handleMouseEnterSlider,
        handleMouseLeaveSlider,
        handleChangeDuration,
        previewRef,
        handlePiP,
        totalVideoDuration,
        previewTime,
        currentVideoVolume,
        isMobileFullScreen,
        currentSubMenu,
        handlePlay,
        handleMuteVideoVolume,
        isVideoPlaying,
        setIsVideoPlaying,
        currentVideoTime,
        setCurrentVideoTime,
        videoBlockContainerRef,
        setIsMobileFullScreen,
        videoContainerRef,
        handleVideoControlsVisibility,
        isControlsVisible,
    } = CustomControlsContext


    const {
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        currentModalItemName,
        currentModalItemOldName,
        handleCurrentModalItemIndex,
        smallScreen,
        toggleVideoMobileSettings,
    } = ModalContext;

    const customControlsProps = [
        controlBtnAnimation,
        topBtnClass,
        isSliderHovered,
        isFullScreen,
        mouseX,
        touchX,
        playBackValues,
        currentSpeedValue,
        currentScaleValue,
        isScaleSubMenuOpen,
        isSpeedSubMenuOpen,
        isVideoMenuOpen,
        handleMainClick,
        handleVideoMenu,
        handleScaleSubMenu,
        handleSpeedSubMenu,
        handleClearSubMenu,
        requestFullScreen,
        handlePlaySpeed,
        handleMouseMove,
        handleTouchMove,
        changeVideoScale,
        handleVideoVolumeChange,
        handleMouseEnterSlider,
        handleMouseLeaveSlider,
        handleChangeDuration,
        handlePiP,
        previewRef,
        totalVideoDuration,
        previewTime,
        currentVideoVolume,
        isMobileFullScreen,
        currentSubMenu,
        handlePlay,
        handleMuteVideoVolume,
        confirm,
    ]

    //Stops audio if video starts to play
    useEffect(() => {
        (isCurrentTrackPlaying && isVideoPlaying) && toggleCurrentTrackPlaying(false)
        //eslint-disable-next-line
    }, [isVideoPlaying])


    //Handle videoContainer style in fullScreen
    useEffect(() => {
        const videoBlockContainer = videoBlockContainerRef?.current
        const videoContainer = videoContainerRef?.current
        const fullscreenChangeHandler = () => {
            if (document.fullscreenElement) {
                videoBlockContainer.style.marginTop = '0'
                videoBlockContainer.style.width = '100%'
                videoBlockContainer.style.height = '100%'
                videoContainer.style.width = '100vw'
                videoContainer.style.height = '100vh'
                smallScreen && setIsMobileFullScreen(true)
            } else {
                if (isMobileFullScreen) {
                    videoBlockContainer.style.width = '100%'
                    videoBlockContainer.style.height = '45%'
                    videoBlockContainer.style.marginTop = '1.25rem'
                    setIsMobileFullScreen(false)
                } else {
                    videoBlockContainer.style.width = '80%'
                    videoBlockContainer.style.height = '90%'
                }
                videoContainer.style.width = '100%'
                videoContainer.style.height = '90%'
            }
        };

        document.addEventListener('fullscreenchange', fullscreenChangeHandler);

        return () => {
            document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
        };
    }, [isFullScreen, isMobileFullScreen]);


    // Enter fullscreen if  landscape mode turned on
    useEffect(() => {
        const handleLandScapeMode = () => {
            if (window.innerWidth > window.innerHeight) {
                if (!isFullScreen) {
                    if (!document.fullscreenElement)
                        document.documentElement.requestFullscreen().then(() => void 0)
                }
            }
        };

        if (smallScreen) {
            window.addEventListener('resize', handleLandScapeMode)
        } else {
            window.removeEventListener('resize', handleLandScapeMode)
        }

        return () => {
            window.removeEventListener('resize', handleLandScapeMode)
        }
        //eslint-disable-next-line
    }, [smallScreen]);


    //Video modal handlers
    const handleVideoIsReady = () => {
        setIsVideoReady(true)
    }

    const handleClose = () => {
        handleCurrentModal(videoModal)
        setIsVideoReady(false);
    };

    const handleProgress = (progress) => {
        setCurrentVideoTime(progress.playedSeconds);
    };

// Listed videos in modal handlers
    const handleListedVideoMouseEnter = (index) => {
        setListedVideoHoveredIndex(index);
    };

    const handleListedVideoMouseLeave = () => {
        setListedVideoHoveredIndex(null);
        listedVideoInModalRef.current.seekTo(0);
    };


    const handleReadyListedVideo = () => {
        setListedVideoTotalTime(formatTime(listedVideoInModalRef.current.getDuration()))
        setIsListedVideoReady(true)
    }

    const handleVideoFromListClick = (index) => {
        handleCurrentModalItemIndex(index)
        setIsVideoReady(false)
        setIsVideoPlaying(false)
    }

    const listedVideoProps = [
        listedVideoInModalRef,
        listedVideoHoveredIndex,
        listedVideoTotalTime,
        isListedVideoReady,
        handleListedVideoMouseEnter,
        handleListedVideoMouseLeave,
        handleReadyListedVideo,
        listedVideoHoveredIndex,
    ]

    return <VideoModal {...{
        animateModal,
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        currentModalItemName,
        currentModalItemOldName,
        smallScreen,
        toggleVideoMobileSettings,
        playerRef,
        currentVideoTime,
        setCurrentVideoTime,
        isControlsVisible,
        isVideoReady,
        isVideoPlaying,
        handleVisibility: handleVideoControlsVisibility,
        handleVideoIsReady,
        handleVideoFromListClick,
        handleClose,
        handleProgress,
        customControlsProps,
        videoBlockContainerRef,
        videoContainerRef,
        listedVideoProps,
        isFullScreen,
    }}/>
};

export default VideoModalContainer;
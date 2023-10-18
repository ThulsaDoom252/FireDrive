import React, {useContext, useRef, useState} from 'react';
import {ItemsModalContext} from "../../../context/ItemsModalContext";
import {formatTime, videoItemModal} from "../../../common/commonData";
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
        currentSubMenu,
        handlePlay,
        handleMuteVideoVolume,
        isVideoPlaying,
        setIsVideoPlaying,
        currentVideoTime,
        setCurrentVideoTime,
        videoBlockContainerRef,
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
        fullScreen,
        handleFullScreen,
    } = ModalContext;

    const customControlsProps = [
        controlBtnAnimation,
        topBtnClass,
        isSliderHovered,
        fullScreen,
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
        handleFullScreen,
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
        currentSubMenu,
        handlePlay,
        handleMuteVideoVolume,
        confirm,
    ]

    //Video modal handlers
    const handleVideoIsReady = () => {
        setIsVideoReady(true)
    }

    const handleClose = () => {
        if (fullScreen) {
            handleFullScreen()
            return
        }

        handleCurrentModal(videoItemModal)
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
        fullScreen,
    }}/>
};

export default VideoModalContainer;
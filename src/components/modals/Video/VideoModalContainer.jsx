import React, {useContext, useEffect, useState} from 'react';
import {ItemsModalContext} from "../../../context/ItemsModalContext";
import {videoItemModal} from "../../../common/common";
import VideoModal from "./VideoModal";
import {VideoControlsContext} from "../../../context/VideoControlsContext";

const VideoModalContainer = ({animateModal, toggleModal, confirm, handleCurrentModal}) => {

    const CustomControlsContext = useContext(VideoControlsContext)
    const ModalContext = useContext(ItemsModalContext);
    const [isVideoReady, setIsVideoReady] = useState(false);

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
    const handleVideoFromListClick = (index) => {
        handleCurrentModalItemIndex(index)
        setIsVideoReady(false)
        setIsVideoPlaying(false)
    }

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
        fullScreen,
    }}/>
};

export default VideoModalContainer;
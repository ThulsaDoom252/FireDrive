import React, {useContext, useEffect, useState} from 'react';
import {ItemsModalContext} from "../../../context/ItemsModalContext";
import VideoModal from "./VideoModal";
import {VideoControlsContext} from "../../../context/VideoControlsContext";
import {AudioPlayerContext} from '../../../context/AudioPlayerContext';

const VideoModalContainer = ({toggleModal, confirm, handleCurrentItemModal}) => {

    const CustomControlsContext = useContext(VideoControlsContext)
    const ModalContext = useContext(ItemsModalContext);
    const AudioContext = useContext(AudioPlayerContext)
    const [isVideoReady, setIsVideoReady] = useState(false);

    const {isCurrentTrackPlaying, toggleCurrentTrackPlaying} = AudioContext

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
        videoOptions,
        isVideoOptionsWidthExpanded,
        handleVideoOptions,
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
        handleVideoPlay,
        handleMuteVideoVolume,
        confirm,
        toggleModal,
        videoOptions,
        isVideoOptionsWidthExpanded,
        handleVideoOptions,
    ]

    function handleVideoPlay({isMainBtnClicked}) {
        debugger
        isCurrentTrackPlaying && toggleCurrentTrackPlaying(false)
        if (isMainBtnClicked) {
            handleMainClick()
            debugger
            return
        }
        handlePlay()
    }

    useEffect(() => {
        currentMediaSet.length === 0 && handleClose()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMediaSet.length]);

    //Video modal handlers
    const handleVideoIsReady = () => {
        setIsVideoReady(true)
    }

    const [closeByBtn, setCloseByBtn] = useState(false)

    function handleClose(closeByBtn) {
        fullScreen && handleFullScreen()

        if (closeByBtn) {
            setCloseByBtn(true)
            return
        }

        handleCurrentItemModal()
        setIsVideoReady(false);
    }

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
        closeByBtn,
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
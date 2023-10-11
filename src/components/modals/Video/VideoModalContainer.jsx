import React, {useContext, useEffect, useRef, useState} from 'react';
import {ItemsModalContext} from "../../../context/ItemsModalContext";
import {formatTime, videoModal} from "../../../common/commonData";
import {makeStyles} from "@material-ui/core/styles";
import VideoModal from "./VideoModal";
import {VideoControlsContext} from "../../../context/VideoControlsContext";



//Modal mui styles
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'transparent',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const VideoModalContainer = ({animateModal, toggleModal, confirm, handleCurrentModal}) => {

    const CustomControlsContext = useContext(VideoControlsContext)
    const ModalContext = useContext(ItemsModalContext);

    const [isVideoReady, setIsVideoReady] = useState(false);
    const classes = useStyles();


    // listed video in modal ref and state
    const listedVideoInModalRef = useRef(null)
    const [listedVideoHoveredIndex, setListedVideoHoveredIndex] = useState(null)
    const [listedVideoTotalTime, setListedVideoTotalTime] = useState(0)
    const [isListedVideoReady, setIsListedVideoReady] = useState(false)

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
            } else {
                if (isMobileFullScreen) {
                    videoBlockContainer.style.width = '100%'
                    videoBlockContainer.style.height = '45%'
                    videoBlockContainer.style.marginTop = '1.25rem'
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
    }, [isFullScreen]);

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
        classes,
        handleVisibility: handleVideoControlsVisibility,
        handleVideoIsReady,
        handleVideoFromListClick,
        handleClose,
        handleProgress,
        customControlsProps,
        videoBlockContainerRef,
        videoContainerRef,
        listedVideoProps,
    }}/>
};

export default VideoModalContainer;
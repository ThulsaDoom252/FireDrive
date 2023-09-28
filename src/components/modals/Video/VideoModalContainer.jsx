import React, {useContext, useRef, useState} from 'react';
import {ItemsModalContext} from "../../../context/ItemsModalContext";
import {formatTime, noModal} from "../../../common/commonData";
import {makeStyles} from "@material-ui/core/styles";
import VideoModal from "./VideoModal";
import {VideoControlsContext} from "../../../context/VideoControlsContext";


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

const VideoModalContainer = ({showModal, toggleModal}) => {
    const CustomControlsContext = useContext(VideoControlsContext)
    const ModalContext = useContext(ItemsModalContext);

    const [isVideoReady, setIsVideoReady] = useState(false);
    const classes = useStyles();

    const [isControlsVisible, setIsControlsVisible] = useState(false)
    const [controlInitialVisibilityValue, setControlInitialVisibilityValue] = useState(10000)



    // listed video in modal ref and state
    const listedVideoInModalRef = useRef(null)
    const [isListedVideoPlaying, setIsListedVideoPlaying] = useState(false)
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
    } = CustomControlsContext


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
    ]

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


    const handleVisibility = () => {
        setControlInitialVisibilityValue(prevValue => prevValue + 5000)
        if (!isControlsVisible) {
            setIsControlsVisible(true)
            setTimeout(() => {
                setIsControlsVisible(false)
                setControlInitialVisibilityValue(10000)
            }, [controlInitialVisibilityValue])
        }
    }

    const handleVideoIsReady = () => {
        setIsVideoReady(true)
    }

    const handleVideoFromListClick = (index) => {
        handleCurrentModalItemIndex(index)
        setIsVideoReady(false)
        setIsVideoPlaying(false)
    }

    const handleClose = () => {
        toggleModal(noModal);
        setIsVideoReady(false);
    };

    const handleProgress = (progress) => {
        setCurrentVideoTime(progress.playedSeconds);
    };



// Listed videos in modal handlers
    const handleListedVideoMouseEnter = () => {
        setIsListedVideoPlaying(true);
    };

    const handleListedVideoMouseLeave = () => {
        setIsListedVideoPlaying(false);
        listedVideoInModalRef.current.seekTo(0);
    };


    const handleReadyListedVideo = () => {
        setListedVideoTotalTime(formatTime(listedVideoInModalRef.current.getDuration()))
        setIsListedVideoReady(true)
    }

    const listedVideoProps = [
        listedVideoInModalRef,
        isListedVideoPlaying,
        listedVideoTotalTime,
        isListedVideoReady,
        handleListedVideoMouseEnter,
        handleListedVideoMouseLeave,
        handleReadyListedVideo,
    ]

    return <VideoModal {...{
        showModal,
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
        handleVisibility,
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
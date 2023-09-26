import React, {useContext, useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import {IoClose} from 'react-icons/io5';
import {ItemsModalContext} from '../../context/ItemsModalContext';
import ModalVideoItem from '../media/ModalVideoItem';
import Overlay from '../common/Overlay';
import {noModal, stopPropagation} from '../../common/commonData';
import CustomControls from '../videoPlayer/controls/CustomControls';
import {makeStyles} from '@material-ui/core/styles';
import {Backdrop, Fade, Modal} from '@material-ui/core';
import {ClipLoader} from "react-spinners";

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

const VideoModal = ({
                        showModal,
                        toggleModal,
                        showOverlay = true,
                        overlayColor = 'bg-gray-900',
                        overlayOpacity = 'opacity-95',
                        zIndex = 'z-2',
                        animated = true,
                        closeIconSize = 30,
                    }) => {
    const ModalContext = useContext(ItemsModalContext);
    const playerRef = useRef(null);
    const [currentVideoTime, setCurrentVideoTime] = useState('0:00');
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const classes = useStyles();

    const [isControlsVisible, setIsControlsVisible] = useState(false)
    const [controlInitialVisibilityValue, setControlInitialVisibilityValue] = useState(10000)

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


    return (
        <Modal
            open={showModal}
            onClose={handleClose}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={showModal}>
                <div
                    className={`
            w-screen
            h-screen
            absolute
            ${showModal && zIndex}
          `}
                >
                    {showOverlay && <Overlay bg={overlayColor} opacity={overlayOpacity}/>}
                    <button
                        className={`
              absolute
              text-gray-400
              hover:text-white z-1
              left-5 top-3
            `}
                        onClick={handleClose}
                    >
                        <IoClose size={closeIconSize}/>
                    </button>
                    <div
                        onClick={stopPropagation}
                        className={`
              flex
              relative
              rounded
              w-100%
              h-100%
              ${smallScreen ? 'flex-col justify-start ' : ' justify-center items-center'}
            `}
                    >
                        <div
                            id="video-block-container"
                            className={`
                ${smallScreen ? 'w-100% h-45% flex justify-center items-center' : 'w-80% h-90%'}
              `}
                        >
                            <div
                                id="video-container"
                                className={`w-100% h-90% relative overflow-hidden bg-black relative `}
                                onContextMenu={(e) => e.preventDefault()}
                                onMouseMove={handleVisibility}
                                onClick={handleVisibility}
                            >
                                {!isVideoReady && <div className={'absolute inset-0 flex items-center justify-center'}>
                                    <ClipLoader size={150} color={'white'}/>
                                </div>}
                                <ReactPlayer
                                    ref={playerRef}
                                    height={'100%'}
                                    width={'100%'}
                                    onReady={handleVideoIsReady}
                                    playing={isVideoPlaying}
                                    onProgress={handleProgress}
                                    className={'object-cover'}
                                    controls={false}
                                    url={currentModalItemUrl || ''}
                                />
                                {isVideoReady && isControlsVisible &&
                                    <CustomControls
                                        playerRef={playerRef}
                                        setCurrentVideoTime={setCurrentVideoTime}
                                        isVideoReady={isVideoReady}
                                        smallScreenMode={smallScreen}
                                        isVideoPlaying={isVideoPlaying}
                                        setIsVideoPlaying={setIsVideoPlaying}
                                        url={currentModalItemUrl}
                                        name={currentModalItemName}
                                        isVisible={isControlsVisible}
                                        oldName={currentModalItemOldName}
                                        toggleVideoMobileSettings={toggleVideoMobileSettings}
                                        index={currentModalItemIndex}
                                        currentVideoTime={currentVideoTime}
                                        color={!smallScreen ? 'text-white' : 'text-white'}
                                    />}
                                {smallScreen && <hr className={'bg-white h-0.5 rounded-full relative bottom-4'}/>}
                            </div>
                            <div
                                hidden={smallScreen}
                                className={`
                  w-full
                  h-10%
                  bottom-0
                  r-5 pl-5
                  flex
                  justify-between
                  items-center
                  bg-white
                  rounded-b-2xl
                  border-r-2
                  border-black
                  text-base
                `}
                            >
                                <div className="text-center text-lg">{currentModalItemName}</div>
                            </div>
                        </div>
                        <div
                            hidden={smallScreen}
                            className={`
                flex
                h-90%
                flex-col
                justify-start
                items-center
                overflow-y-scroll
              `}
                        >
                            {currentMediaSet.map((video, index) => (
                                <ModalVideoItem
                                    item={video}
                                    onClick={handleVideoFromListClick}
                                    index={index}
                                    currentModalItemUrl={currentModalItemUrl}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default VideoModal;

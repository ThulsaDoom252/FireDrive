import React from 'react';
import ReactPlayer from 'react-player';
import {IoClose} from 'react-icons/io5';
import ModalVideoItem from '../../media/ModalVideoItem';
import Overlay from '../../common/Overlay';
import {stopPropagation} from '../../../common/commonData';
import CustomControls from '../../videoPlayer/controls/CustomControls';
import {ClipLoader} from "react-spinners";
import {Fade} from "@mui/material";
import Button from "@mui/material/Button";

const VideoModal = ({
                        animateModal,
                        showOverlay = true,
                        overlayColor = 'bg-gray-900',
                        overlayOpacity = 'opacity-95',
                        zIndex = 'z-2',
                        animated = true,
                        closeIconSize = 30,
                        currentMediaSet,
                        currentModalItemUrl,
                        currentModalItemIndex,
                        currentModalItemName,
                        currentModalItemOldName,
                        smallScreen,
                        toggleVideoMobileSettings,
                        playerRef,
                        isControlsVisible,
                        setCurrentVideoTime,
                        currentVideoTime,
                        isVideoReady,
                        isVideoPlaying,
                        handleVisibility,
                        handleVideoIsReady,
                        handleVideoFromListClick,
                        handleClose,
                        handleProgress,
                        customControlsProps,
                        listedVideoProps,
                        videoBlockContainerRef,
                        videoContainerRef,
                        isFullScreen,
                    }) => {

    return (
        <Fade in={animateModal}>
            <div
                className={`
            inset-0
            absolute
            ${animateModal && zIndex}
          `}
            >
                {showOverlay && <Overlay bg={overlayColor} opacity={overlayOpacity}/>}
                {(!smallScreen && !isFullScreen || !smallScreen && isControlsVisible || isControlsVisible) &&
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
                    </button>}
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
                        ref={videoBlockContainerRef}
                        className={`
                ${smallScreen ? 'w-100% h-45%  flex flex-col justify-center items-center' : 'w-80% h-90%'}
              `}
                    >
                        <div
                            ref={videoContainerRef}
                            className={`w-100% h-90% relative overflow-hidden bg-black`}
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
                                    url={currentModalItemUrl}
                                    name={currentModalItemName}
                                    isVisible={isControlsVisible}
                                    oldName={currentModalItemOldName}
                                    toggleVideoMobileSettings={toggleVideoMobileSettings}
                                    index={currentModalItemIndex}
                                    currentVideoTime={currentVideoTime}
                                    color={!smallScreen ? 'text-white' : 'text-white'}
                                    {...{customControlsProps}}
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
                        className={`
                flex
                h-90%
                flex-col
                justify-start
                items-center
                overflow-y-scroll
                overflow-x-hidden
                ${smallScreen && 'pb-14'}
              `}
                    >
                        {currentMediaSet.map((video, index) =>
                            (
                                <ModalVideoItem
                                    column={smallScreen}
                                    item={video}
                                    currentModalItemIndex={currentModalItemIndex}
                                    onClick={handleVideoFromListClick}
                                    index={index}
                                    smallScreen={smallScreen}
                                    currentModalItemUrl={currentModalItemUrl}
                                    {...{listedVideoProps}}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default VideoModal;
import React from 'react';
import ReactPlayer from 'react-player';
import {IoClose} from 'react-icons/io5';
import ModalVideoItem from '../../media/ModalVideoItem';
import {stopPropagation} from '../../../common/common';
import CustomControls from '../../videoPlayer/controls/CustomControls';
import {ClipLoader} from "react-spinners";
import {Scrollbars} from "react-custom-scrollbars";
import AnimatedContainer from '../../../common/AnimatedContainer';

const VideoModal = ({
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
                        videoBlockContainerRef,
                        videoContainerRef,
                        fullScreen,
                        closeByBtn,
                    }) => {

    return (
        <AnimatedContainer onCLick={handleClose} shouldClose={closeByBtn}>
            <div
                className={`inset-0 absolute`}
            >
                {(!smallScreen && !fullScreen || !smallScreen && isControlsVisible || isControlsVisible) &&
                    <button
                        onClick={() => handleClose(true)}
                        className={`
              absolute
              text-gray-400
              hover:text-white z-1
              left-5 top-3
            `}>
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
                        ${fullScreen ? 'w-screen h-screen' : `${smallScreen ? 'w-100% h-70%' : 'w-80% h-90%'}`}
                flex flex-col justify-center items-center
              `}
                    >
                        <div
                            ref={videoContainerRef}
                            className={`${fullScreen ? 'h-100%' : 'h-90%'} w-100% relative overflow-hidden bg-black`}
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
                            {/*{smallScreen && */}
                            {/*    <hr className={'bg-white h-0.5 rounded-full relative bottom-4'}/>}*/}
                        </div>
                        {(!smallScreen && !fullScreen) &&
                            <div
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
                            </div>}
                    </div>

                    {!fullScreen &&
                        <div
                            className={`
                flex
                h-90%
                flex-col
                justify-start
                items-center
                overflow-y-hidden              
                overflow-x-hidden
                ${smallScreen ? 'pb-20 w-full' : 'p-2 w-1/5'}
              `}>
                            <Scrollbars>
                                <>
                                    {currentMediaSet.map((video, index) =>
                                        (
                                            <React.Fragment key={index}>
                                                <ModalVideoItem
                                                    column={smallScreen}
                                                    item={video}
                                                    currentModalItemIndex={currentModalItemIndex}
                                                    onClick={handleVideoFromListClick}
                                                    index={index}
                                                    smallScreen={smallScreen}
                                                    currentModalItemUrl={currentModalItemUrl}
                                                />
                                            </React.Fragment>

                                        ))}
                                </>
                            </Scrollbars>
                        </div>}
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default VideoModal;
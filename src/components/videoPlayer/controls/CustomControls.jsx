import React from 'react';
import ControlBar from "./components/ControlBar";
import CentralPlayBtn from "./components/CentralBlayBtn";
import TopBlock from "./components/TopBlock";

const CustomControls = ({
                            color = 'text-white',
                            smallScreenMode,
                            playBtnSize = smallScreenMode ? 60 : 30,
                            currentVideoTime,
                            disablePreview,
                            toggleVideoMobileSettings,
                            index,
                            name,
                            oldName,
                            url,
                            isVideoPlaying,
                            isVisible,
                            customControlsProps,
                        },
) => {

    const [
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
        currentSubMenu,
        handlePlay,
        handleMuteVideoVolume,
        confirm,
        toggleModal,
        videoOptions,
        isVideoOptionsWidthExpanded,
        handleVideoOptions,
    ] = customControlsProps


    return (
        // Menu Container
        <div
            style={{visibility: isVisible ? "visible" : "hidden"}}
            className={`
        w-full 
        h-full 
        flex
        flex-col
        justify-between
        absolute
        bottom-0
           ${color} 
           ${(!smallScreenMode && !isFullScreen) && 'pr-10 pl-10'}
        `}
            onClick={() => handlePlay({isMainBtnClicked: true})}
        >
            {/*Top menu block*/}
            <TopBlock
                url={url}
                name={name}
                oldName={oldName}
                index={index}
                topBtnClass={topBtnClass}
                toggleVideoMobileSettings={toggleVideoMobileSettings}
                smallScreenMode={smallScreenMode}
                confirm={confirm}
                toggleModal={toggleModal}
                {...{
                    videoOptions,
                    isVideoOptionsWidthExpanded,
                    handleVideoOptions
                }}
            />

            {/*//Center Player Btn*/}
            {!isVideoPlaying && !videoOptions &&
                <CentralPlayBtn/>
            }
            {/*Control Bar*/}
            <ControlBar {...{
                isVideoPlaying,
                smallScreenMode,
                isSliderHovered,
                disablePreview,
                url,
                previewRef,
                totalVideoDuration,
                previewTime,
                mouseX,
                touchX,
                currentVideoTime,
                currentVideoVolume,
                isFullScreen,
                controlBtnAnimation,
                isVideoMenuOpen,
                currentSubMenu,
                currentScaleValue,
                currentSpeedValue,
                isScaleSubMenuOpen,
                isSpeedSubMenuOpen,
                changeVideoScale,
                playBackValues,
                handlePlay,
                handleSpeedSubMenu,
                handlePlayBackRate: handlePlaySpeed,
                handleClearSubMenu,
                handleScaleSubMenu,
                handleVideoMenu,
                handleFullScreen: requestFullScreen,
                handleMuteVideoVolume,
                handleTouchMove,
                handleMouseLeaveSlider,
                handleMouseEnterSlider,
                handleMouseMove,
                handlePiP,
                handleVideoVolumeChange,
                handleChangeDuration,
            }}/>

        </div>
    );
};

export default CustomControls
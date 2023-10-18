import React from 'react';
import {formatTime, stopPropagation} from "../../../../common/commonData";
import {FiPause, FiPlay} from "react-icons/fi";
import Preview from "./Preview";
import Progress from "./Progress";
import {CiVolume, CiVolumeMute} from "react-icons/ci";
import BottomButtonsContainer from "./BottomButtonsContainer";
import ThemedVolumeBar from "../../../common/theme/ThemedVolumeBar";

const ControlBar = ({
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
                        handlePlayBackRate,
                        handleClearSubMenu,
                        handleScaleSubMenu,
                        handleTouchMove,
                        handleVideoMenu,
                        handleFullScreen,
                        handleMuteVideoVolume,
                        handleMouseLeaveSlider,
                        handleMouseEnterSlider,
                        handleMouseMove,
                        handlePiP,
                        handleVideoVolumeChange,
                        handleChangeDuration,
                    }) => {

    const videoVolumeMarks = [
        {
            value: 0.2,
        },
        {
            value: 0.4,
        },
        {
            value: 0.6,
        },
        {
            value: 0.8,
        },
        {
            value: 1,
        },
    ];

    return (
        <>
            {smallScreenMode  ?
                <div className='
        w-full
        flex
        flex-col
        h-12
        z-10
        justify-center
        pb-2
        bg-gray-800
        bg-opacity-80'
                     onClick={stopPropagation}
                >
                    {/*//Mobile Progress */}
                    <div className={'w-full h-4 relative bottom-3.5'}>
                        {isSliderHovered && !disablePreview &&
                            <Preview
                                smallScreenMode={smallScreenMode}
                                url={url}
                                touchX={touchX}
                                previewRef={previewRef}
                                previewTime={previewTime}
                                mouseX={mouseX}/>}
                        <Progress
                            handleTouchMove={handleTouchMove}
                            smallScreenMode={smallScreenMode}
                            value={currentVideoTime}
                            maxValue={totalVideoDuration}
                            handleChange={handleChangeDuration}
                            handleMouseLeaveSlider={handleMouseLeaveSlider}
                            handleMouseEnterSlider={handleMouseEnterSlider}
                            handleMouseMove={handleMouseMove}/>

                    </div>
                    {/*//Mobile control bar*/}
                    <div className={'w-full  flex justify-between items-center pl-3 pr-3 relative bottom-2'}>
                        {/*//Play btn and time block*/}
                        <div className={'w-50 flex'}>
                            <div className={'mr-2'} onClick={handlePlay}>
                                {isVideoPlaying ? <FiPause size={25}/> : <FiPlay size={25}/>}
                            </div>
                            <div>
                                {`${formatTime(currentVideoTime)} / ${formatTime(totalVideoDuration)}`}
                            </div>
                        </div>
                        {/*//Volume and settings block*/}
                        <div className={'w-40 flex items-center'}>
                            {/*//Volume block*/}
                            <div className={'flex items-center mr-3  hover:cursor-pointer'}>
                                {/*Volume icon*/}
                                <div onClick={handleMuteVideoVolume}
                                >{currentVideoVolume !== 0 ? <CiVolume/> : <CiVolumeMute/>}
                                </div>
                                {/*Volume bar block*/}
                                <div className={'w-10 ml-2 relative top-1'}>
                                    {/*Volume bar*/}
                                    <ThemedVolumeBar barWidth={5} value={currentVideoVolume} customMarks={videoVolumeMarks} handleChange={handleVideoVolumeChange}/>
                                </div>
                            </div>
                            <BottomButtonsContainer
                                controlBtnAnimation={controlBtnAnimation}
                                handlePiP={handlePiP}
                                handleVideoMenu={handleVideoMenu}
                                handleFullScreen={handleFullScreen}
                                isFullScreen={isFullScreen}
                                handleScaleSubMenu={handleScaleSubMenu}
                                currentScaleValue={currentScaleValue}
                                handleSpeedSubMenu={handleSpeedSubMenu}
                                currentSpeedValue={currentSpeedValue}
                                handleClearSubMenu={handleClearSubMenu}
                                changeVideoScale={changeVideoScale}
                                playBackValues={playBackValues}
                                handlePlayBackRate={handlePlayBackRate}
                                currentSubMenu={currentSubMenu}
                                isScaleSubMenuOpen={isScaleSubMenuOpen}
                                isVideoMenuOpen={isVideoMenuOpen}
                                isSpeedSubMenuOpen={isSpeedSubMenuOpen}
                            />
                        </div>
                    </div>

                </div>
                :
                //Desktop layout
                //Main container
                <div className='
        w-full
        flex
        justify-between
        relative
        items-center
        h-10
        z-10
        bg-gray-800
        bg-opacity-80
         self-end'
                     onClick={stopPropagation}>
                    <div
                        className={`flex 
                        justify-between 
                        w-full
                        items-center 
                        h-full 
                        pr-2 
                        pl-2
                        `}
                    >
                        {/*/Play btn*/}
                        <div className={`
                flex 
                justify-center 
                items-center 
                mr-2
                w-20 
                h-full
                hover:bg-blue-400
                hover:cursor-pointer
                transition-all duration-200
                `}
                             onClick={handlePlay}>
                            {isVideoPlaying ? <FiPause size={30}/> : <FiPlay size={30}/>}
                        </div>
                        {/*//Progress*/}
                        <div
                            className={`                        
                            rounded 
                            relative
                            top-1
                            h-fit
                            self-center
                            hover:cursor-pointer
                            w-75%  
                            `}>

                            {/*Preview*/}
                            {isSliderHovered && !disablePreview &&
                                <Preview
                                    smallScreenMode={smallScreenMode}
                                    url={url}
                                    previewRef={previewRef}
                                    previewTime={previewTime}
                                    touchX={touchX}
                                    mouseX={mouseX}/>}
                            {/*Progress bar*/}
                            <Progress
                                value={currentVideoTime}
                                maxValue={totalVideoDuration}
                                handleChange={handleChangeDuration}
                                handleMouseLeaveSlider={handleMouseLeaveSlider}
                                handleMouseEnterSlider={handleMouseEnterSlider}
                                handleMouseMove={handleMouseMove}
                                handleTouchMove={handleTouchMove}

                            />
                        </div>
                        {/*Right controls block*/}
                        <div className={`
                        ml-5 
                        w-25% 
                        flex 
                        justify-between 
                        items-center                        
                        `}>
                            {/*Volume block*/}
                            <div className={'flex items-center mr-3  hover:cursor-pointer'}>
                                {/*Volume icon*/}
                                <div onClick={handleMuteVideoVolume}
                                >{currentVideoVolume !== 0 ? <CiVolume/> : <CiVolumeMute/>}
                                </div>
                                {/*Volume bar block */}
                                <div className={'w-20 ml-2 relative top-1'}>
                                    {/*Volume bar*/}
                                    <ThemedVolumeBar barWidth={5} handleChange={handleVideoVolumeChange} value={currentVideoVolume}/>
                                </div>
                            </div>
                            {/*Time block*/}
                            <div
                                className={'mr-3'}>{`${formatTime(currentVideoTime)} / ${formatTime(totalVideoDuration)}`}</div>
                            {/*Buttons block*/}
                            <BottomButtonsContainer
                                controlBtnAnimation={controlBtnAnimation}
                                handlePiP={handlePiP}
                                handleVideoMenu={handleVideoMenu}
                                handleFullScreen={handleFullScreen}
                                isFullScreen={isFullScreen}
                                handleScaleSubMenu={handleScaleSubMenu}
                                currentScaleValue={currentScaleValue}
                                handleSpeedSubMenu={handleSpeedSubMenu}
                                currentSpeedValue={currentSpeedValue}
                                handleClearSubMenu={handleClearSubMenu}
                                changeVideoScale={changeVideoScale}
                                playBackValues={playBackValues}
                                handlePlayBackRate={handlePlayBackRate}
                                currentSubMenu={currentSubMenu}
                                isScaleSubMenuOpen={isScaleSubMenuOpen}
                                isVideoMenuOpen={isVideoMenuOpen}
                                isSpeedSubMenuOpen={isSpeedSubMenuOpen}
                            />
                        </div>
                    </div>
                </div>}
        </>

    );
};

export default ControlBar;
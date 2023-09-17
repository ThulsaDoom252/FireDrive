import React from 'react';
import {formatTime, stopPropagation} from "../../../../common/commonData";
import {FiPause, FiPlay} from "react-icons/fi";
import Preview from "./Preview";
import Progress from "./Progress";
import {CiVolume, CiVolumeMute} from "react-icons/ci";
import BottomButtons from "./BottomButtons";
import VideoContextTransition from "./VideoContextTransition";
import ScaleBtn from "./ScaleBtn";
import SpeedBtn from "./SpeedBtn";
import ScaleMenu from "./ScaleMenu";
import SpeedMenu from "./SpeedMenu";

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
    return (
        <div className='w-full flex justify-between items-center h-10 z-10 self-end' onClick={stopPropagation}>
            {/*/Play btn*/}
            <div className={`bg-gray-800   
                bg-opacity-80 
                rounded 
                flex 
                justify-center 
                items-center 
                w-20 
                h-full
                hover:bg-blue-400
                hover:cursor-pointer
                transition-all duration-200
                `}
                 onClick={handlePlay}>
                {isVideoPlaying ? <FiPause size={30}/> : <FiPlay size={30}/>}
            </div>
            {/*//Rest*/}
            <div
                className={`flex 
                        justify-between 
                        w-full
                        items-center 
                        bg-gray-800 
                        bg-opacity-80
                        h-full rounded 
                        ml-3
                        pr-2 
                        pl-2
                        `}
            >
                {/*//Progress*/}
                <div
                    className={`                        
                            rounded 
                            relative
                            top-1.5
                            h-fit
                            self-center
                            hover:cursor-pointer
                            ${smallScreenMode ? 'w-1/3' : 'w-75%'}
                            
                            `}>

                    {/*Preview*/}
                    {isSliderHovered && !disablePreview &&
                        <Preview
                            smallScreenMode={smallScreenMode}
                            url={url}
                            previewRef={previewRef}
                            previewTime={previewTime}
                            mouseX={mouseX}/>}
                    {/*Progress bar*/}
                    <Progress
                        handleChange={handleChangeDuration}
                        currentVideoTime={currentVideoTime}
                        handleMouseLeaveSlider={handleMouseLeaveSlider}
                        handleMouseEnterSlider={handleMouseEnterSlider}
                        handleMouseMove={handleMouseMove}/>
                </div>
                {/*Right controls block*/}
                <div className={`
                        ml-5 
                        w-25% 
                        flex 
                        justify-between 
                        items-center
                        ${smallScreenMode ? 'w-full' : 'w-25%'}
                        
                        `}>
                    {/*Volume block*/}
                    <div className={'flex items-center mr-3  hover:cursor-pointer'}>
                        {/*Volume icon*/}
                        <div onClick={handleMuteVideoVolume}
                        >{currentVideoVolume !== 0 ? <CiVolume/> : <CiVolumeMute/>}
                        </div>
                        {/*Volume bar block */}
                        <div className={'w-20 ml-2 relative top-1.5'}>
                            {/*Volume bar*/}
                            <Progress
                                handleChange={handleVideoVolumeChange}
                                maxValue={1}
                                value={currentVideoVolume}
                            />
                        </div>
                    </div>
                    {/*Time block*/}
                    <div
                        className={'mr-3'}>{`${formatTime(currentVideoTime)} / ${formatTime(totalVideoDuration)}`}</div>
                    {/*Buttons block*/}
                    <BottomButtons
                        handleFullScreen={handleFullScreen}
                        isFullScreen={isFullScreen}
                        handlePiP={handlePiP}
                        controlBtnAnimation={controlBtnAnimation}
                        handleVideoMenu={handleVideoMenu}
                    />
                    {/*{Context Menu}*/}
                    <VideoContextTransition isVideoMenuOpen={isVideoMenuOpen}>
                        {currentSubMenu === null &&
                            <>
                                {/*Scale btn*/}
                                <ScaleBtn
                                    handleScaleSubMenu={handleScaleSubMenu}
                                    currentScaleValue={currentScaleValue}/>
                                {/*Speed btn*/}
                                <SpeedBtn handleSpeedSubMenu={handleSpeedSubMenu}
                                          currentSpeedValue={currentSpeedValue}/>
                            </>
                        }
                        {/*Scale context*/}
                        {isScaleSubMenuOpen && <ScaleMenu
                            currentScaleValue={currentScaleValue}
                            handleClearSubMenu={handleClearSubMenu}
                            changeVideoScale={changeVideoScale}/>}
                        {/*Speed context*/}
                        {isSpeedSubMenuOpen && <SpeedMenu
                            playBackValues={playBackValues}
                            currentSpeedValue={currentSpeedValue}
                            handlePlayBackRate={handlePlayBackRate}
                            handleClearSubMenu={handleClearSubMenu}/>}
                    </VideoContextTransition>

                    {/*Share menu*/}
                    {/*{isShareMenuOpen && <div className='*/}
                    {/*absolute*/}
                    {/*p-2*/}
                    {/*rounded*/}
                    {/*left-1/2*/}
                    {/*bottom-10*/}
                    {/*text-black*/}
                    {/*w-28*/}
                    {/*bg-white*/}
                    {/*border-1*/}
                    {/*border-gray-400*/}
                    {/*flex*/}
                    {/*flex-col*/}
                    {/*justify-start*/}
                    {/*items-center*/}
                    {/*transform -translate-x-1/2*/}
                    {/*'>*/}
                    {/*    <div className={'mt-1 border-b'}>Telegram</div>*/}
                    {/*    <div className={'mt-1 border-b'}>Viber</div>*/}
                    {/*    <div className={'mt-1 border-b'}>Facebook</div>*/}
                    {/*</div>}*/}
                    {/*{Item context}*/}
                    {/*{isCurrentItemMenuOpen &&*/}
                    {/*    <div className='*/}
                    {/*absolute*/}
                    {/*p-2*/}
                    {/*rounded*/}
                    {/*left-1/2*/}
                    {/*bottom-10*/}
                    {/*text-black*/}
                    {/*w-28*/}
                    {/*bg-white*/}
                    {/*border-1*/}
                    {/*border-gray-400*/}
                    {/*flex*/}
                    {/*flex-col*/}
                    {/*justify-start*/}
                    {/*items-center*/}
                    {/*transform -translate-x-1/2*/}
                    {/*'>*/}
                    {/*        <div className={'mt-1 border-b'}>Rename</div>*/}
                    {/*        <div className={'mt-1 border-b'}>Delete</div>*/}
                    {/*    </div>}*/}


                </div>

            </div>
        </div>
    );
};

export default ControlBar;
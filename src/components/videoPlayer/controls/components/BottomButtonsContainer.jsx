import React from 'react';
import BottomButtons from "./BottomButtons";
import VideoContextTransition from "./VideoContextTransition";
import ScaleBtn from "./ScaleBtn";
import SpeedBtn from "./SpeedBtn";
import ScaleMenu from "./ScaleMenu";
import SpeedMenu from "./SpeedMenu";

const BottomButtonsContainer = ({
                                    controlBtnAnimation,
                                    handlePiP,
                                    handleVideoMenu,
                                    handleFullScreen,
                                    isFullScreen,
                                    handleScaleSubMenu,
                                    currentScaleValue,
                                    handleSpeedSubMenu,
                                    currentSpeedValue,
                                    handleClearSubMenu,
                                    changeVideoScale,
                                    playBackValues,
                                    handlePlayBackRate,
                                    currentSubMenu,
                                    isScaleSubMenuOpen,
                                    isVideoMenuOpen,
                                    isSpeedSubMenuOpen,
                                    isMobileFullScreen,


                                }) => {
    return (
        <>

            <BottomButtons
                handleFullScreen={handleFullScreen}
                isFullScreen={isFullScreen}
                handlePiP={handlePiP}
                controlBtnAnimation={controlBtnAnimation}
                handleVideoMenu={handleVideoMenu}
                isMobileFullScreen={isMobileFullScreen}
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
        </>
    );
};

export default BottomButtonsContainer;
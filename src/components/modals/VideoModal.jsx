import React, {useContext, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import MediaOptions from "../options/ItemOptions";
import ModalVideoItem from "../media/ModalVideoItem";
import Overlay from "../common/Overlay";
import {formatTime, noModal, stopPropagation} from "../../common/commonData";
import {Transition} from "react-transition-group";
import {defaultStyle, transitionStyles} from "../../common/TransitionStyles";
import CustomControls from "../videoPlayer/controls/CustomControls";

const VideoModal = ({
                        showModal,
                        toggleModal,
                        showOverlay = true,
                        overlayColor = 'bg-gray-900',
                        overlayOpacity = 'opacity-95',
                        zIndex = 'z-2',
                        animated = true,
                        closeIconSize = 30
                    }) => {

    const ModalContext = useContext(ItemsModalContext)
    const playerRef = useRef(null)
    const [currentVideoTime, setCurrentVideoTime] = useState('0:00')
    const [isVideoReady, setIsVideoReady] = useState(false)

    const {
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        currentModalItemName,
        currentModalItemOldName,
        handleCurrentModalItemIndex,
        smallScreen,
    } = ModalContext

    const handleClose = () => {
        toggleModal(noModal)
    }

    const handleProgress = (progress) => {
        setCurrentVideoTime(progress.playedSeconds);
    };

    return (
        <Transition in={showModal} duration={200}>
            {state => (
                <div style={{...defaultStyle, ...transitionStyles[state]}}
                     hidden={!animated ? showModal : false}
                     onClick={handleClose}
                     className={`
                      w-screen
                     h-screen
                     absolute             
                     ${showModal && zIndex}
                     `}
                >

                    {showOverlay && <Overlay bg={overlayColor} opacity={overlayOpacity}/>}
                    <button className={`
                    absolute
                
                     text-gray-400
                     hover:text-white z-1
                     left-5 top-3
                     
                     `}
                            onClick={handleClose}>
                        <IoClose size={closeIconSize}/>
                    </button>
                    {/*// Both window container*/}
                    <div onClick={stopPropagation}
                         className={`
                         flex 
                         relative 
                         rounded 
                         w-100% 
                         h-100% 
                         ${smallScreen ? 'flex-col justify-start ' : ' justify-center items-center'}
                         
                         `}>
                        {/*//Vide block container*/}
                        <div
                            id={'video-block-container'}
                            className={`
                            ${smallScreen
                                ? 'w-100% h-45% flex justify-center items-center'
                                : 'w-80% h-90%'}`}>
                            {/*Video block*/}
                            <div
                                id={'video-container'}
                                className={`w-100% h-90% relative overflow-hidden bg-black `}
                                onContextMenu={e => e.preventDefault()}>
                                <ReactPlayer
                                    ref={playerRef}
                                    height={'100%'}
                                    width={'100%'}
                                    onReady={() => setIsVideoReady(true)}
                                    playing={showModal}
                                    onProgress={handleProgress}
                                    className={'object-cover'}
                                    controls={false}
                                    url={currentModalItemUrl || ''}/>
                                <CustomControls playerRef={playerRef}
                                                setCurrentVideoTime={setCurrentVideoTime}
                                                isVideoReady={isVideoReady}
                                                smallScreenMode={smallScreen}
                                                url={currentModalItemUrl}
                                                currentVideoTime={currentVideoTime}
                                                color={!smallScreen ? 'text-white' : 'text-white'}/>
                                {smallScreen && <hr className={'bg-white h-0.5 rounded-full relative bottom-4'}/>}

                                {/*{smallScreen &&*/}
                                {/*    <div className='relative bottom-6 left-2 text-white'>{currentModalItemName}</div>}*/}
                            </div>
                            {/*//Video info block (under main block)*/}
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
                                `}>
                                <div className='text-center text-lg'>
                                    {currentModalItemName}
                                </div>
                                <div><MediaOptions initialMode={'show'}
                                                   shouldAnimate={false}
                                                   url={currentModalItemUrl}
                                                   index={currentModalItemIndex}
                                                   name={currentModalItemName}
                                                   oldName={currentModalItemOldName}
                                                   showBg={false}
                                                   tgIconColor={'black'}
                                                   vbIconColor={'black'}
                                                   deleteIconColor={'black'}
                                                   renameIconColor={'black'}

                                />
                                </div>
                            </div>
                        </div>
                        {/*//Video list block*/}
                        <div
                            hidden={smallScreen}
                            className={`
                             flex 
                             h-90%
                             flex-col 
                             justify-start 
                             items-center 
                             overflow-y-scroll
                             `}>
                            {currentMediaSet.map((video, index) => <ModalVideoItem item={video}
                                                                                   onClick={handleCurrentModalItemIndex}
                                                                                   index={index}
                                                                                   currentModalItemUrl={currentModalItemUrl}/>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Transition>


    );
};

export default VideoModal;
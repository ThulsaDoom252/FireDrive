import React, {useContext, useRef} from 'react';
import ReactPlayer from "react-player";
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import MediaOptions from "../Options/mediaOptions";
import ModalVideoItem from "../Media/ModalVideoItem";
import Overlay from "../common/Overlay";
import {noModal, stopPropagation} from "../../common/commonData";
import {Transition} from "react-transition-group";
import {defaultStyle, transitionStyles} from "../../common/TransitionStyles";

const VideoModal = ({
                        showModal,
                        toggleModal,
                        showOverlay = true,
                        overlayColor = 'bg-gray-900',
                        overlayOpacity = 'opacity-95',
                        zIndex = 'z-2',
                        animated = true,
                    }) => {

    const ModalContext = useContext(ItemsModalContext)
    const playerRef = useRef(null)

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

    return (
        <Transition in={showModal} duration={200}>
            {state => (
                <div style={{...defaultStyle, ...transitionStyles[state]}}
                     hidden={!animated ? showModal : false}
                     onClick={handleClose}
                     className={`
                      w-screen
                     h-screen
                     flex
                     absolute
                     items-center
                     justify-center
                     flex-col
                     ${showModal && zIndex}
                     `}
                >

                    {showOverlay && <Overlay bg={overlayColor} opacity={overlayOpacity}/>}
                    <button className='absolute
                    right-5
                     top-5
                     text-gray-400
                     hover:text-white z-1'
                            onClick={handleClose}>
                        <IoClose size={30}/>
                    </button>
                    <div onClick={stopPropagation}
                         className={`
                         flex 
                         relative 
                         rounded 
                         w-100% 
                         h-100% 
                         justify-center 
                         items-center`}>
                        <div
                            className={`
                            bg-black 
                            ${smallScreen
                                ? 'w-100% h-100% flex justify-center items-center'
                                : 'w-80% h-90%'}`}>
                            <div className={`w-100% 
                            ${!smallScreen ? 'h-90%' : 'h-100%'}
                            `}>
                                <ReactPlayer
                                    ref={playerRef}
                                    height={'100%'}
                                    width={'100%'}
                                    playing={showModal}
                                    className={'object-cover'}
                                    controls={true}
                                    url={currentModalItemUrl || ''}/>
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
                        <div hidden={smallScreen}
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
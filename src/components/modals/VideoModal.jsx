import React, {useContext} from 'react';
import ReactPlayer from "react-player";
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import MyCustomTransition from "../common/MyCustomTransition";
import MediaOptions from "../Options/mediaOptions";
import ModalVideoItem from "../Media/ModalVideoItem";
import Overlay from "../common/Overlay";
import ModalContainer from "./ModalContainer";
import {noModal, stopPropagation} from "../../common/commonData";

const VideoModal = ({
                        showModal,
                        toggleModal,
                        showOverlay = true,
                        overlayColor = 'bg-gray-900',
                        overlayOpacity = 'opacity-95'
                    }) => {

    const ModalContext = useContext(ItemsModalContext)

    const {
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        currentModalItemName,
        currentModalItemOldName,
        handleCurrentModalItemIndex,
        smallScreen,
    } = ModalContext
    const handleClose = () => toggleModal(noModal)

    return (
        <>
            <MyCustomTransition show={showModal}>
                <ModalContainer handleClose={handleClose}>
                    {showOverlay && <Overlay bg={overlayColor} opacity={overlayOpacity}/>}
                    <button className='absolute right-5 top-5  text-gray-400 hover:text-white' onClick={handleClose}>
                        <IoClose size={30}/>
                    </button>
                    <div onClick={stopPropagation}
                         className={`flex relative rounded ${smallScreen ? 'w-100% h-100% flex-col items-center' : 'w-80% h-90%'}`}>
                        <div className={`bg-black ${smallScreen ? 'w-100% h-60%' : 'w-80% h-full'}`}>
                            <div className={'w-100% h-85%'}>
                                <ReactPlayer
                                    height={'100%'}
                                    width={'100%'}
                                    className={'object-cover'}
                                    controls={true}
                                    url={currentModalItemUrl || ''}/>
                            </div>
                            <div
                                className={`w-full h-15% bottom-0 r-5 pl-5 flex justify-between items-center ${smallScreen && 'border-t-2 border-white'}`}>
                                <div className='text-white text-center'>
                                    {currentModalItemName}
                                </div>
                                <div><MediaOptions initialMode={'show'}
                                                   shouldAnimate={false}
                                                   url={currentModalItemUrl}
                                                   index={currentModalItemIndex}
                                                   name={currentModalItemName}
                                                   oldName={currentModalItemOldName}
                                                   showBg={false}
                                                   tgIconColor={'white'}
                                                   vbIconColor={'white'}
                                                   deleteIconColor={'white'}
                                                   renameIconColor={'white'}

                                />
                                </div>
                            </div>
                        </div>
                        <div
                            className={`flex bg-white flex-col justify-start items-center overflow-y-scroll ${smallScreen ? 'w-100% h-40% pb-12' : 'w-20% h-full'}`}>
                            {currentMediaSet.map((video, index) => <ModalVideoItem item={video}
                                                                                   onClick={handleCurrentModalItemIndex}
                                                                                   index={index}
                                                                                   currentModalItemUrl={currentModalItemUrl}/>
                            )}
                        </div>
                    </div>
                </ModalContainer>
            </MyCustomTransition>
        </>
    );
};

export default VideoModal;
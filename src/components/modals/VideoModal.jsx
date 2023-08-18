import React, {useContext} from 'react';
import Overlay from "../Overlay";
import ReactPlayer from "react-player";
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import MyCustomTransition from "../common/MyCustomTransition";
import MediaOptions from "../Options/mediaOptions";

const VideoModal = ({modal, closeModal, showOverlay = true}) => {

    const ModalContext = useContext(ItemsModalContext)

    const {
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        currentModalItemName,
        handleCurrentModalItemIndex,
    } = ModalContext
    const handleCLose = () => closeModal(false)

    return (
        <>
            <MyCustomTransition show={modal}>
                <div className={'h-screen w-screen fixed z-10 flex justify-center items-center'}>
                    {showOverlay && <Overlay zIndexValue={'0'} toggleModal={closeModal}/>}
                    <button className='absolute right-5 top-5  text-gray-400 hover:text-white' onClick={handleCLose}>
                        <IoClose size={30}/>
                    </button>
                    <div className={'absolute w-80vw h-90vh bg-white  flex rounded'}>
                        <div className={'w-80% h-full bg-black relative'}>
                            <ReactPlayer
                                controls={true}
                                width={'100%'}
                                height={'90%'}
                                url={currentModalItemUrl || ''}/>

                            <div className={'absolute w-full h-10% bottom-0 r-5 pl-5 flex justify-between'}>
                                <div className='text-white'>
                                    {currentModalItemName}
                                </div>
                                <div><MediaOptions initialMode={'show'}
                                                   shouldAnimate={false}
                                                   url={currentModalItemUrl}
                                                   index={currentModalItemIndex}
                                                   name={currentModalItemName}
                                                   showBg={false}
                                                   tgIconColor={'white'}
                                                   vbIconColor={'white'}
                                                   deleteIconColor={'white'}
                                                   renameIconColor={'white'}

                                />
                                </div>
                            </div>
                        </div>
                        <div className={'w-20% h-full flex flex-col justify-start items-center overflow-y-scroll '}>
                            {currentMediaSet.map((video, index) =>
                                <div key={index}
                                     className='w-80% h-32 mt-5 mb-4  rounded flex flex-col justify-center items-center'>
                                    <div
                                        onClick={() => handleCurrentModalItemIndex(index)}
                                        className={`w-full h-full  bg-black rounded ${video.url === currentModalItemUrl && 'border-4 border-amber-300'} flex items-center justify-center cursor-pointer`}>
                                        <ReactPlayer url={video?.url || ''} height={'98%'} width={'98%'}/>
                                    </div>
                                    <div className={'text-black w-full text-center'}>{video?.name || ''}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MyCustomTransition>
        </>
    );
};

export default VideoModal;
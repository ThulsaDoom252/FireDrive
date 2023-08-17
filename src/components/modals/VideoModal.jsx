import React, {useContext} from 'react';
import Overlay from "../Overlay";
import ReactPlayer from "react-player";
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";

const VideoModal = ({url = '', modal, onClose, showOverlay = true}) => {

    const ModalContext = useContext(ItemsModalContext)

    const {
        currentMediaSet,
        currentModalItemIndex,
        currentModalItemUrl,
        currentModalItemName,
    } = ModalContext
    const handleCLose = () => onClose(!modal)

    return (
        <>
            <div className={'h-screen w-screen fixed z-20 flex justify-center items-center'}>
                {showOverlay && <Overlay/>}
                <button className='absolute right-5 top-5 text-white' onClick={handleCLose}><IoClose size={30}/>
                </button>
                <div className={'absolute w-80vw h-90vh bg-white  flex rounded'}>
                    <div className={'w-80% h-full bg-black relative'}>
                        <ReactPlayer
                            controls={true}
                            width={'100%'}
                            height={'90%'}
                            url={currentModalItemUrl || ''}/>

                        <div className={'absolute w-full h-10% bottom-0  flex  justify-between pr-5 pl-5'}>
                            <div className='text-white'>
                                {currentModalItemName}
                            </div>
                            <div>
                                CONTROL PANNEL
                            </div>
                        </div>
                    </div>
                    <div className={'w-20% h-full flex flex-col justify-start items-center '}>
                        {currentMediaSet.map((video, index) =>
                            <div className='w-80% h-32 mt-5 mb-4  rounded flex flex-col justify-center items-center'>
                                <div className={'w-full h-full  bg-black rounded '}>
                                    <ReactPlayer url={video?.url || ''} height={'100%'} width={'100%'}/>
                                </div>
                                <div className={'text-black w-full text-center'}>{video?.name || ''}</div>
                            </div>
                        )}

                    </div>

                </div>
            </div>

        </>
    );
};

export default VideoModal;
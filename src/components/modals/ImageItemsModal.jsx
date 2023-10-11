import React from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {IoClose} from "react-icons/io5";
import {AiOutlineFullscreenExit} from "react-icons/ai";
import Overlay from "../common/Overlay";
import {stopPropagation} from "../../common/commonData";
import ModalOptions from "../options/ModalDesktopOptions";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Fade} from "@mui/material";

const ImageItemsModal = ({
                        overlayColor = 'bg-gray-900',
                        animated = true,
                        overlayOpacity = 'bg-opacity-95',
                        showOverlay = true,
                        arrowSize = 30,
                        closeIconColor = 'white',
                        closeIconSize = 30,
                        animateModal,
                        carouselSettings,
                        prevArrowDisabled,
                        nextArrowDisabled,
                        handleClose,
                        swipeHandlers,
                        smallScreen,
                        fullScreen,
                        handleFullScreen,
                        zIndex = 'z-2',
                        currentModalItemUrl,
                        currentMediaSet,
                        modalOptionsProps,
                        handlePrevModalItem,
                        handleNextModalItem,
                    }) => {

    const [handleRenameModal, handleShareModal, handleDeleteCurrentModalItem, showMobileSettings] = modalOptionsProps


    return (
        <Fade in={animateModal} timeout={200}>
            <div
                onClick={handleClose}
                hidden={!animated ? animateModal : false}
                className={`
                w-screen 
                h-screen 
                flex
                 absolute 
                 items-center 
                 justify-center 
                 flex-col
                 ${animateModal && zIndex}
                 `}>
                {showOverlay && <Overlay bg={overlayColor} opacity={overlayOpacity}/>}
                {/*<div*/}
                {/*    className={`text-white mb-2 ${zIndex} ${smallScreen && 'absolute top-2'}`}>{currentModalItemName}</div>*/}
                <div hidden={(fullScreen && !smallScreen) || !showMobileSettings}
                     className='absolute right-5  top-5 hover:cursor-pointer z-1'
                     onClick={handleClose}><IoClose
                    size={closeIconSize}
                    color={closeIconColor}/></div>
                {smallScreen || !fullScreen ? <div hidden={smallScreen || !fullScreen}
                                                   className='absolute right-10  top-10 hover:cursor-pointer'
                                                   onClick={e => {
                                                       e.stopPropagation()
                                                       handleFullScreen()
                                                   }}><AiOutlineFullscreenExit
                    size={closeIconSize}
                    color={closeIconColor}/></div> : void 0}

                <div {...swipeHandlers} onClick={stopPropagation}
                     className={'relative w-fit h-fit flex items-center justify-center'}>
                    {smallScreen ?
                        <Carousel className={'carousel'} {...carouselSettings}>
                            {currentMediaSet.map((image, index) => (
                                <div key={index} className={'h-full  flex items-center'}>
                                    <img src={image.url} alt={image.name}/>
                                </div>
                            ))}
                        </Carousel>
                        :
                        <img
                            className={`rounded  ${fullScreen ? 'max-h-95vh max-w-95vw' : 'max-h-65vh max-w-65vw'}`}
                            src={currentModalItemUrl} alt=""/>}
                </div>
                <div
                    hidden={!showMobileSettings || (!smallScreen && fullScreen)}
                    onClick={stopPropagation}
                    className={`
                    flex
                    flex-col
                    pl-5
                    pr-5
                    pb-3
                    justify-center
                    items-center
                     ${smallScreen ? 'w-65vw' : 'w-image-settings'}
                    text-white
                    ${smallScreen ? 'fixed bottom-0' : 'mt-5 relative'}
                    `}>
                    <div className={'w-full flex justify-between'}>
                        <ModalOptions iconSize={20}
                                      handleFullScreen={handleFullScreen}
                                      handleRenameModal={handleRenameModal}
                                      handleShareModal={handleShareModal}
                                      handleDeleteCurrentModalItem={handleDeleteCurrentModalItem}
                                      smallScreen={smallScreen}
                        />
                    </div>

                </div>
                <button hidden={smallScreen} disabled={prevArrowDisabled}
                        className={`
                absolute 
                left-5 
                border-0 
                bg-transparent
                ${prevArrowDisabled ? 'text-gray-500' : 'text-white'}`}
                        onClick={handlePrevModalItem}>
                    <IoIosArrowBack
                        size={arrowSize}/></button>
                <button hidden={smallScreen} disabled={nextArrowDisabled} className={`
                absolute 
                right-5
                border-0 
                bg-transparent
                ${nextArrowDisabled ? 'text-gray-500' : 'text-white'}`}
                        onClick={handleNextModalItem}>
                    <IoIosArrowForward
                        size={arrowSize}/></button>
            </div>

        </Fade>
    )
};

export default ImageItemsModal;
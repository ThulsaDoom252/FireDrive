import React from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {IoClose} from "react-icons/io5";
import {AiOutlineFullscreenExit} from "react-icons/ai";
import Overlay from "../common/Overlay";
import {stopPropagation} from "../../common/commonData";
import ImageModalOptions from "../options/ImageModalOptions";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Fade} from "@mui/material";
import FittedThemeBtn from "../common/theme/FittedThemeBtn";

const ImageItemsModal = ({
                             overlayColor = 'bg-gray-900',
                             animated = true,
                             overlayOpacity = 'bg-opacity-95',
                             showOverlay = true,
                             arrowSize = 30,
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
                             currentModalItemName,
                             currentModalOldName,

                         }) => {

    const [handleDeleteCurrentModalItem, showMobileSettings, handleModal, showImageSettingsInSmallScreen, toggleImageSettingInSmallScreen] = modalOptionsProps

    return (
        <Fade in={animateModal} timeout={200}>
            <div
                onClick={handleClose}
                hidden={!animated ? animateModal : false}
                className={`
                inset-0
                flex
                 absolute 
                 items-center 
                 justify-center 
                 ${!smallScreen && 'flex-col'}
                 ${animateModal && zIndex}
                 `}>
                {showOverlay && <Overlay bg={overlayColor} opacity={overlayOpacity}/>}
                {/*<div*/}
                {/*    className={`text-white mb-2 ${zIndex} ${smallScreen && 'absolute top-2'}`}>{currentModalItemName}</div>*/}
                {((!smallScreen && !fullScreen) || showImageSettingsInSmallScreen) &&
                    <FittedThemeBtn imgModalBtn
                                    optionalClasses={{position: 'absolute', right: 5, top: 5, zIndex: 1}}
                                    onClick={handleClose}><IoClose
                        size={closeIconSize}/></FittedThemeBtn>}

                {smallScreen || !fullScreen ? <div hidden={smallScreen || !fullScreen}
                                                   className='absolute right-10  top-10 hover:cursor-pointer'
                                                   onClick={e => {
                                                       e.stopPropagation()
                                                       handleFullScreen()
                                                   }}><AiOutlineFullscreenExit
                    size={closeIconSize}/></div> : void 0}

                <div {...swipeHandlers} onClick={stopPropagation}
                     className={`relative ${smallScreen && !fullScreen && 'bottom-6'}`}>
                    {smallScreen ?
                        <Carousel onClickItem={() => toggleImageSettingInSmallScreen(!showImageSettingsInSmallScreen)}
                                  className={'carousel'} {...carouselSettings}>
                            {currentMediaSet.map((image, index) => (
                                <div key={index} className={'h-full flex items-center'}>
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
                    {(!smallScreen || showImageSettingsInSmallScreen) &&
                        <div className={`w-full flex ${smallScreen ? 'justify-between' : 'justify-center'}`}>
                            <ImageModalOptions iconSize={20}
                                               handleFullScreen={handleFullScreen}
                                               handleDeleteCurrentModalItem={handleDeleteCurrentModalItem}
                                               smallScreen={smallScreen}
                                               fullScreen={fullScreen}
                                               handleModal={handleModal}
                                               currentModalItemName={currentModalItemName}
                                               currentModalOldName={currentModalOldName}
                            />
                        </div>}

                </div>
                {!smallScreen &&
                    <FittedThemeBtn imgModalBtn optionalClasses={{position: 'absolute', left: 5}}
                                    isDisabled={prevArrowDisabled}
                                    onClick={handlePrevModalItem}>
                        <IoIosArrowBack
                            size={arrowSize}/></FittedThemeBtn>}
                {!smallScreen &&
                    <FittedThemeBtn imgModalBtn isDisabled={nextArrowDisabled}
                                    optionalClasses={{position: 'absolute', right: 5}}
                                    onClick={handleNextModalItem}>
                        <IoIosArrowForward
                            size={arrowSize}/></FittedThemeBtn>}
            </div>

        </Fade>
    )
};

export default ImageItemsModal;
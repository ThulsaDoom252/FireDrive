import React, {useContext} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import MyCustomTransition from "../common/MyCustomTransition";
import {AiOutlineFullscreenExit} from "react-icons/ai";
import Overlay from "../common/Overlay";
import ModalContainer from "./ModalContainer";
import {noModal, stopPropagation} from "../../common/commonData";
import ModalDesktopOptions from "../Options/ModalDesktopOptions";
import {useSwipeable} from "react-swipeable";
import {useSelector} from "react-redux";

const ImageModal = ({
                        overlayColor = 'bg-gray-900',
                        overlayOpacity = 'opacity-95',
                        showOverlay = true,
                        arrowSize = 30,
                        closeIconColor = 'white',
                        closeIconSize = 30,
                        toggleModal,
                        showModal,
                    }) => {

    const horizontalMode = useSelector(state => state.app.horizontalMode)


    const modalContext = useContext(ItemsModalContext)
    const {
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        handleNextModalItem,
        handlePrevModalItem,
        handleDeleteCurrentModalItem,
        fullScreen,
        toggleFullScreen,
        searchMode,
        searchResults,
        smallScreen,
        handleRenameModal,
        handleShareModal,
        swipeHandlers,
        showMobileSettings,
    } = modalContext

    const prevArrowDisabled = currentModalItemIndex === 0
    const nextArrowDisabled = currentModalItemIndex === (searchMode ? searchResults.length - 1 : currentMediaSet.length - 1)

    const handleCLose = () => {
        fullScreen && toggleFullScreen(false)
        toggleModal(noModal)
    }
    const tesImageUrl = 'https://wallpapers.com/images/featured/mountain-t6qhv1lk4j0au09t.jpg'

    return (
        <MyCustomTransition show={showModal}>
            <ModalContainer handleClose={handleCLose}>
                {showOverlay && <Overlay bg={overlayColor} opacity={overlayOpacity}/>}
                <div hidden={fullScreen || !showMobileSettings}
                     className='absolute right-5  top-5 hover:cursor-pointer z-1'
                     onClick={handleCLose}><IoClose
                    size={closeIconSize}
                    color={closeIconColor}/></div>
                <div hidden={!fullScreen} className='absolute right-10  top-10 hover:cursor-pointer'
                     onClick={e => {
                         e.stopPropagation()
                         toggleFullScreen(false)
                     }}><AiOutlineFullscreenExit
                    size={closeIconSize}
                    color={closeIconColor}/></div>
                <div {...swipeHandlers}
                     className={'relative w-fit h-fit flex items-center justify-center'}>
                    {smallScreen && horizontalMode ? <img onClick={stopPropagation}
                                                          className={`rounded max-w-95vw max-h-95vh'} `}
                                                          src={currentModalItemUrl || tesImageUrl}
                                                          alt='image'/> :
                        smallScreen && !horizontalMode ? <img onClick={stopPropagation}
                                                              className={`rounded max-w-100vw max-h-100vh'} `}
                                                              src={currentModalItemUrl || tesImageUrl}
                                                              alt='image'/> :
                            <img
                                onClick={stopPropagation}
                                className={`rounded ${fullScreen ? 'max-w-95vw max-h-95vh' : 'max-w-65vw max-h-65vh'} `}
                                src={currentModalItemUrl || tesImageUrl}
                                alt='image'/>}
                </div>
                <div
                    hidden={(!smallScreen && fullScreen) || !showMobileSettings}
                    onClick={stopPropagation}
                    className={`
                    flex
                    pl-5
                    pr-5
                    pb-3
                    justify-between
                     ${smallScreen ? 'w-65vw' : 'w-image-settings'}
                    text-white
                    ${smallScreen ? 'fixed bottom-0' : 'mt-5 relative'}
                    `}>
                    <ModalDesktopOptions iconSize={20}
                                         toggleFullScreen={toggleFullScreen}
                                         handleRenameModal={handleRenameModal}
                                         handleShareModal={handleShareModal}
                                         handleDeleteCurrentModalItem={handleDeleteCurrentModalItem}
                                         smallScreen={smallScreen}
                    />
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
            </ModalContainer>
        </MyCustomTransition>
    )
        ;
};

export default ImageModal;
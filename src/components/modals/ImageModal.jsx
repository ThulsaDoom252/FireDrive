import React, {useContext} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {AiOutlineFullscreenExit} from "react-icons/ai";
import Overlay from "../common/Overlay";
import {noModal, stopPropagation} from "../../common/commonData";
import ModalDesktopOptions from "../Options/ModalDesktopOptions";
import MediaQuery from "react-responsive";
import {Transition} from "react-transition-group";
import {defaultStyle, transitionStyles} from "../../common/TransitionStyles";

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

    return (
        <Transition in={showModal} timeout={200}>
            {state => (
                <div
                    onClick={handleCLose}
                    style={{...defaultStyle, ...transitionStyles[state]}}
                    className={`
                w-screen 
                h-screen 
                flex
                 absolute 
                 items-center 
                 justify-center 
                 flex-col
                 ${showModal && 'z-1'}
                 `}>
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
                         onClick={stopPropagation}
                         className={'relative w-fit h-fit flex items-center justify-center'}>
                        {smallScreen ? <MediaQuery orientation="landscape">
                                {(matches) =>
                                    matches ? (
                                        <img style={{maxWidth: '100vw', maxHeight: '100vh', borderRadius: '5px'}}
                                             src={currentModalItemUrl} alt=""/>
                                    ) : (
                                        <img style={{maxWidth: '100vw', maxHeight: '100vh', borderRadius: '5px'}}
                                             className={'rounded'}
                                             src={currentModalItemUrl} alt=""/>
                                    )
                                }
                            </MediaQuery> :
                            <img
                                className={`rounded  ${fullScreen ? 'max-h-95vh max-w-95vw' : 'max-h-65vh max-w-65vw'}`}
                                src={currentModalItemUrl} alt=""/>}
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
                </div>
            )}
        </Transition>
    )
        ;
};

export default ImageModal;


//
//
//             onExit={handleExitAnimation}>
//     {state => (
//         <div hidden={!animated ? !isDropDownOpen : false}
//              style={{...defaultStyle, ...transitionStyles[state]}}
//              className={`
//                              w-full
//                              flex
//                              items-center
//                              ${!isDropDownOpen && isAnimationExited ? 'absolute' : 'block'}
//                              ${smallScreen && 'flex-col'}
//                              `}>
//             {children}
//         </div>
//     )}
// </Transition>
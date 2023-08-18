import React, {useContext} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import MyCustomTransition from "../common/MyCustomTransition";
import {AiOutlineFullscreenExit} from "react-icons/ai";

const ImageModal = ({
                        overlayColor = 'bg-gray-900',
                        overlayOpacity = 'bg-opacity-95',
                        overlayZIndex = 'z-10',
                        arrowSize = 30,
                        closeIconColor = 'white',
                        closeIconSize = 30,
                        modal,
                        closeModal,
                    }) => {


    const modalContext = useContext(ItemsModalContext)
    const {
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        handleNextModalItem,
        handlePrevModalItem,
        fullScreen,
        toggleFullScreen,
        searchMode,
        searchResults,
        smallScreen,
    } = modalContext

    const prevArrowDisabled = currentModalItemIndex === 0
    const nextArrowDisabled = currentModalItemIndex === (searchMode ? searchResults.length - 1 : currentMediaSet.length - 1)

    const handleCLose = () => {
        fullScreen && toggleFullScreen(false)
        closeModal(!modal)
    }
    const stopPropagation = (e) => e.stopPropagation()

    const tesImageUrl = 'https://wallpapers.com/images/featured/mountain-t6qhv1lk4j0au09t.jpg'

    return (
        <MyCustomTransition show={modal}>
            <div
                onClick={handleCLose}
                className={`
            w-screen
            h-screen
            fixed
            flex
            flex-col
            items-center
            justify-center
            ${overlayColor}
            ${overlayOpacity}
            ${overlayZIndex}
            hover:cursor-pointer
            `}>
                <div hidden={fullScreen} className='absolute right-10  top-10 hover:cursor-pointer'
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

                <div
                    className={'relative w-fit h-fit flex items-center justify-center'}>
                    <img
                        onClick={stopPropagation}
                        className={`rounded ${fullScreen ? 'max-w-95vw max-h-95vh' : 'max-w-65vw max-h-65vh'} `}
                        src={currentModalItemUrl || tesImageUrl}
                        alt="image"/>
                </div>
                <div
                    hidden={smallScreen || fullScreen}
                    onClick={stopPropagation}
                    className='
                    mt-5
                    relative
                    flex
                    justify-between
                    w-image-settings
                    text-white
                    '>
                    <div onClick={() => toggleFullScreen(true)}>FullScreen</div>
                    <div>Share</div>
                    <div>Delete</div>
                </div>

                <button disabled={prevArrowDisabled}
                        className={`
                absolute 
                left-5 
                border-0 
                bg-transparent
                ${prevArrowDisabled ? 'text-gray-500' : 'text-white'}`}
                        onClick={handlePrevModalItem}>
                    <IoIosArrowBack
                        size={arrowSize}/></button>
                <button disabled={nextArrowDisabled} className={`
                absolute 
                right-5
                border-0 
                bg-transparent
                ${nextArrowDisabled ? 'text-gray-500' : 'text-white'}`}
                        onClick={handleNextModalItem}>
                    <IoIosArrowForward
                        size={arrowSize}/></button>
            </div>
        </MyCustomTransition>
    )
        ;
};

export default ImageModal;
import React, {useContext} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import Overlay from "../Overlay";
import MyCustomTransition from "../common/MyCustomTransition";

const ImageModal = ({

                        showOverlay = true,
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
        handleCurrentModalItemIndex,
    } = modalContext

    const prevArrowDisabled = currentModalItemIndex === 0
    const nextArrowDisabled = currentModalItemIndex === (currentMediaSet.length - 1)

    const handleCLose = () => closeModal(!modal)

    const tesImageUrl = 'https://wallpapers.com/images/featured/mountain-t6qhv1lk4j0au09t.jpg'

    return (
        <MyCustomTransition show={modal}>
            <div className="w-screen h-screen fixed z-20">
                <div className="
            w-full
            h-full
            flex
            flex-col
            items-center
            justify-center
            z-20
            ">
                    {showOverlay && <Overlay toggleModal={handleCLose} zIndexValue={'0'}/>}

                    <div className='absolute right-10 top-10 hover:cursor-pointer' onClick={handleCLose}><IoClose
                        size={closeIconSize}
                        color={closeIconColor}/></div>
                    <div
                        className={'relative w-fit h-fit flex items-center justify-center self-center '}>
                        <img
                            className={'rounded max-w-65vw max-h-65vh'}
                            src={currentModalItemUrl || tesImageUrl}
                            alt="image"/>
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
            </div>
        </MyCustomTransition>
    )
        ;
};

export default ImageModal;
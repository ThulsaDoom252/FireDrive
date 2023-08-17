import React, {useContext} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {IoClose} from "react-icons/io5";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import Overlay from "../Overlay";

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
        <div className="w-screen h-screen fixed z-20">
            <div className="
            w-full
            h-full
            flex
            flex-col
            items-center
            justify-center
            ">
                {showOverlay &&          <Overlay/>}

                <div className='absolute right-10 top-10 hover:cursor-pointer' onClick={handleCLose}><IoClose
                    size={closeIconSize}
                    color={closeIconColor}/></div>
                <div
                    style={{width: 'fit-content', height: 'fit-content'}}
                    className={'absolute flex items-center justify-center self-center '}>
                    <img
                        style={{maxWidth: "65vw", maxHeight: "65vh"}}
                        className={'rounded'}
                        src={currentModalItemUrl || tesImageUrl}
                        alt="image"/>
                </div>
                {/*<div*/}
                {/*    className={' flex items-center justify-start border-b-4 border-t-4 h-36 absolute w-full bottom-2 pl-4 pr-4 '}>*/}
                {/*    {currentMediaSet.map((image, index) => <div key={index}*/}
                {/*                                                className={`h-32 ${currentModalItemIndex === index && 'bg-red-200'} flex items-center justify-center p-1`}>*/}
                {/*        <img*/}
                {/*            onClick={() => handleCurrentModalItemIndex(index)}*/}
                {/*            className={'object-cover max-w-300 h-28 rounded mr-1 cursor-pointer'} src={image?.url}*/}
                {/*            alt={image.name}/>*/}
                {/*    </div>)}*/}
                {/*</div>*/}
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
    )
        ;
};

export default ImageModal;
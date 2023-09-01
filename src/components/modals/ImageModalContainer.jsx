import React, {useContext, useEffect} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {noModal} from "../../common/commonData";
import ImageModal from "./ImageModal";

const ImageModalContainer = ({toggleModal, showModal}) => {
    const modalContext = useContext(ItemsModalContext)

    const {
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        handleNextModalItem,
        handlePrevModalItem,
        handleDeleteCurrentModalItem,
        fullScreen,
        searchMode,
        searchResults,
        smallScreen,
        handleRenameModal,
        handleShareModal,
        swipeHandlers,
        showMobileSettings,
        handleFullScreen,
    } = modalContext

    const modalOptionsProps = [handleRenameModal, handleShareModal, handleDeleteCurrentModalItem, showMobileSettings]

    const prevArrowDisabled = currentModalItemIndex === 0
    const nextArrowDisabled = currentModalItemIndex === (searchMode ? searchResults.length - 1 : currentMediaSet.length - 1)

    const handleCLose = () => {
        fullScreen && handleFullScreen()
        toggleModal(noModal)
    }

    const carouselSettings = {
        showThumbs: false,
        emulateTouch: true,
        selectedItem: currentModalItemIndex,
        showArrows: false,
        showIndicators: false,
    }


    useEffect(() => {
        if (showModal && smallScreen) {
            handleFullScreen()
        }
    }, [showModal]);


    return <ImageModal
        showModal={showModal}
        toggleModal={toggleModal}
        currentMediaSet={currentMediaSet}
        fullScreen={fullScreen}
        handleFullScreen={handleFullScreen}
        currentModalItemUrl={currentModalItemUrl}
        swipeHandlers={swipeHandlers}
        handleNextModalItem={handleNextModalItem}
        handlePrevModalItem={handlePrevModalItem}
        prevArrowDisabled={prevArrowDisabled}
        nextArrowDisabled={nextArrowDisabled}
        carouselSettings={carouselSettings}
        handleClose={handleCLose}
        smallScreen={smallScreen}
        modalOptionsProps={modalOptionsProps}

    />
};

export default ImageModalContainer;
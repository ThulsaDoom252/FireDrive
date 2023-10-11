import React, {useContext, useEffect} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {imageModal, imagesRoute,  removeCurrentItemMsg, removeCurrentItemTitle} from "../../common/commonData";
import ImageItemsModal from "./ImageItemsModal";
import {handleAlertModal} from "../../redux/appSlice";
import {useDispatch} from "react-redux";
import {deleteCurrentItem} from "../../redux/mediaSlice";

const ImageModalContainer = ({toggleModal, animateModal, confirm, handleCurrentModal}) => {
    const modalContext = useContext(ItemsModalContext)

    const dispatch = useDispatch()

    const {
        currentMediaSet,
        currentModalItemUrl,
        currentModalItemIndex,
        handleNextModalItem,
        handlePrevModalItem,
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

    useEffect(() => {
        if (animateModal && smallScreen) {
            handleFullScreen()
        }
    }, [animateModal]);

    const handleDeleteCurrentModalItem = async () => {
        await dispatch(handleAlertModal({message: removeCurrentItemMsg, title: removeCurrentItemTitle}))
        const userAction = await confirm()
        if (userAction) {
            dispatch(deleteCurrentItem({
                route: imagesRoute,
                url: currentModalItemUrl,
                index: currentModalItemIndex,
                searchMode
            }))
        }
    }

    const prevArrowDisabled = currentModalItemIndex === 0
    const nextArrowDisabled = currentModalItemIndex === (searchMode ? searchResults.length - 1 : currentMediaSet.length - 1)

    const handleClose = () => {
        fullScreen && handleFullScreen()
        handleCurrentModal(imageModal)
    }

    const carouselSettings = {
        showThumbs: false,
        emulateTouch: true,
        selectedItem: currentModalItemIndex,
        showArrows: false,
        showIndicators: false,
    }

    const modalOptionsProps = [handleRenameModal, handleShareModal, handleDeleteCurrentModalItem, showMobileSettings]

    return <ImageItemsModal
        animateModal={animateModal}
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
        handleClose={handleClose}
        smallScreen={smallScreen}
        modalOptionsProps={modalOptionsProps}
        {...confirm}

    />
};

export default ImageModalContainer;
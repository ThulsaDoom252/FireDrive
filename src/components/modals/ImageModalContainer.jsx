import React, {useContext, useEffect} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {imagesRoute, noModal, removeCurrentItemMsg, removeCurrentItemTitle} from "../../common/commonData";
import ImageModal from "./ImageModal";
import {handleAlertModal} from "../../redux/appSlice";
import {useDispatch} from "react-redux";
import {deleteCurrentItem} from "../../redux/mediaSlice";

const ImageModalContainer = ({toggleModal, showModal, confirm}) => {
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
        if (showModal && smallScreen) {
            handleFullScreen()
        }
    }, [showModal]);

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

    const modalOptionsProps = [handleRenameModal, handleShareModal, handleDeleteCurrentModalItem, showMobileSettings]

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
        {...confirm}

    />
};

export default ImageModalContainer;
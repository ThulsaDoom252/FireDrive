import React, {useContext, useEffect, useState} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {imagesRoute, removeCurrentItemMsg, removeCurrentItemTitle} from "../../common/common";
import ImageItemsModal from "./ImageItemsModal";
import {handleAlertModal} from "../../redux/appSlice";
import {useDispatch} from "react-redux";
import {deleteCurrentItem} from "../../redux/mediaSlice";

const ImageModalContainer = ({confirm, handleItemModal, handleModal}) => {
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
            swipeHandlers,
            showMobileSettings,
            handleFullScreen,
            currentModalItemName,
            currentModalOldName,
            showImageSettingsInSmallScreen,
            toggleImageSettingInSmallScreen,
        } = modalContext


        const [closeModalByBtn, setCloseModalByBtn] = useState(false)

        // binding keys to current modal handlers
        useEffect(() => {
            const handleArrowKey = e => {
                if ((e.key === 'ArrowLeft' || e.key === 'ArrowDown')) {
                    handlePrevModalItem(e)
                    return
                }

                if (e.key === 'ArrowRight' || e.key === "ArrowUp") {
                    handleNextModalItem(e)
                    return;
                }

                if (e.key === 'Escape') {
                    if (!fullScreen) {
                        handleClose()
                    }
                }
            }
            window.addEventListener('keydown', handleArrowKey)

            return () => {
                window.removeEventListener('keydown', handleArrowKey)
            }
            //eslint-disable-next-line
        }, [handlePrevModalItem, handleNextModalItem]);

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

        const handleClose = (closeByBtn) => {
            fullScreen && handleFullScreen()

            if (closeByBtn) {
                setCloseModalByBtn(true)
                return
            }

            handleItemModal()
        }

        const carouselSettings = {
            showThumbs: false,
            emulateTouch: true,
            selectedItem: currentModalItemIndex,
            showArrows: false,
            showIndicators: false,
            showStatus: false,
        }

        const modalOptionsProps = [handleDeleteCurrentModalItem, showMobileSettings, handleModal,
            showImageSettingsInSmallScreen, toggleImageSettingInSmallScreen]

        return (
            <>
                <ImageItemsModal
                    closeByBtn={closeModalByBtn}
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
                    currentModalItemName={currentModalItemName}
                    currentModalOldName={currentModalOldName}
                    {...confirm}
                />

            </>

        )


    }
;

export default ImageModalContainer;
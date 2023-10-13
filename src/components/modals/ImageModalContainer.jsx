import React, {useContext, useEffect} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {imageModal, imagesRoute, removeCurrentItemMsg, removeCurrentItemTitle} from "../../common/commonData";
import ImageItemsModal from "./ImageItemsModal";
import {handleAlertModal} from "../../redux/appSlice";
import {useDispatch} from "react-redux";
import {deleteCurrentItem} from "../../redux/mediaSlice";

const ImageModalContainer = ({toggleModal, animateModal, confirm, handleCurrentModal, handleModal}) => {
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
            handleFullScreenState,
            showImageSettingsInSmallScreen,
            toggleImageSettingInSmallScreen,
        } = modalContext

        useEffect(() => {
            if (animateModal && smallScreen) {
                // handleFullScreen()
            }
        }, [animateModal]);

        useEffect(() => {
                document.addEventListener('fullscreenchange', handleFullScreenState);

                return () => {
                    document.removeEventListener('fullscreenchange', handleFullScreenState);
                };
            }, [fullScreen]
        )


        useEffect(() => {
            const handleLandScapeMode = () => {
                if (window.innerWidth > window.innerHeight) {
                    if (!fullScreen) {
                        if(!document.fullscreenElement)
                        document.documentElement.requestFullscreen()
                    }
                }
            };

            if (smallScreen) {
                window.addEventListener('resize', handleLandScapeMode)
            } else {
                window.removeEventListener('resize', handleLandScapeMode)
            }

            return () => {
                window.removeEventListener('resize', handleLandScapeMode)
            }

        }, [smallScreen]);

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

        const handleClose = () => {
            if (fullScreen) {
                handleFullScreen()
                return
            }
            handleCurrentModal(imageModal)
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
            currentModalItemName={currentModalItemName}
            currentModalOldName={currentModalOldName}
            {...confirm}

        />
    }
;

export default ImageModalContainer;
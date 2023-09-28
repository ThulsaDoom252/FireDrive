import React, {createContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleAlertModal, setCurrentModalItemIndex, setModalType} from "../redux/appSlice";
import {handleMediaName} from "../redux/mediaSlice";
import {
    delay,
    removeCurrentItem,
    removeCurrentItemTitle,
    removeCurrentMsg,
    renameModal, shareModal
} from "../common/commonData";
import {useSwipeable} from "react-swipeable";

export const ItemsModalContext = createContext();
export const ItemsModalContextProvider = ({children}) => {
    const dispatch = useDispatch()
    const smallScreen = useSelector(state => state.app.smallScreen)
    const currentMediaSet = useSelector(state => state.media.currentMediaSet)
    const searchResults = useSelector(state => state.media.searchResults)
    const currentModalItemIndex = useSelector(state => state.app.currentModalItemIndex)
    const searchMode = useSelector(state => state.media.searchMode)
    const [fullScreen, toggleFullScreen] = useState(false)
    const [showMobileSettings, toggleMobileSettings] = useState(true)
    const [showVideoMobileSettings, toggleVideoMobileSettings] = useState(false)

    const currentModalItemUrl = searchMode ? searchResults[currentModalItemIndex]?.url : currentMediaSet[currentModalItemIndex]?.url
    const currentModalItemName = searchMode ? searchResults[currentModalItemIndex]?.name : currentMediaSet[currentModalItemIndex]?.name
    const currentModalItemOldName = searchMode ? searchResults[currentModalItemIndex]?.oldName : currentMediaSet[currentModalItemIndex]?.oldName


    const handleFullScreen = () => {
        if (!fullScreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        toggleFullScreen(!fullScreen);
    };


    const handleCurrentModalItemIndex = (index) => {
        dispatch(setCurrentModalItemIndex(index))
    }


    const swipeHandlers = useSwipeable({
        onSwipedUp: () => {
            if (currentModalItemIndex < currentMediaSet.length - 1) {
                setCurrentModalItemIndex(currentModalItemIndex + 1);
            }
        },
        onSwipedDown: () => {
            if (currentModalItemIndex > 0) {
                setCurrentModalItemIndex(currentModalItemIndex - 1);
            }
        },
    });

    const handleNextModalItem = (e) => {
        !smallScreen && e.stopPropagation()
        currentMediaSet.length !== (currentModalItemIndex - 1) && dispatch(setCurrentModalItemIndex(currentModalItemIndex + 1))
    }

    const handlePrevModalItem = (e) => {
        !smallScreen && e.stopPropagation()
        currentModalItemIndex !== 0 && dispatch(setCurrentModalItemIndex(currentModalItemIndex - 1))
    }

    const handleDeleteCurrentModalItem = () => {
        dispatch(handleAlertModal({
            title: removeCurrentItemTitle,
            message: removeCurrentMsg,
            actionType: removeCurrentItem
        }))
    }

    const handleRenameModal = async () => {
        dispatch(handleMediaName({name: currentModalItemName, oldName: currentModalItemOldName}))
        await delay(50)
        dispatch(setModalType(renameModal))
    }

    const handleShareModal = e => {
        e.stopPropagation()
        dispatch(setModalType(shareModal))
    }

    const values = {
        currentMediaSet,
        currentModalItemIndex,
        currentModalItemUrl,
        currentModalItemOldName,
        handleNextModalItem,
        handlePrevModalItem,
        handleCurrentModalItemIndex,
        handleShareModal,
        handleDeleteCurrentModalItem,
        handleRenameModal,
        showMobileSettings,
        fullScreen,
        searchMode,
        searchResults,
        smallScreen,
        swipeHandlers,
        handleFullScreen,
        showVideoMobileSettings,
        toggleVideoMobileSettings,
        currentModalItemName,
    }


    return (
        <ItemsModalContext.Provider value={values}>
            {children}
        </ItemsModalContext.Provider>
    );
};


import React, {createContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleAlertModal, setCurrentModalItemIndex, setModalType} from "../redux/appSlice";
import {handleMediaName} from "../redux/mediaSlice";
import {
    delay,
    noModal,
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

    const currentModalItemUrl = searchMode ? searchResults[currentModalItemIndex]?.url : currentMediaSet[currentModalItemIndex]?.url
    const currentModalItemName = searchMode ? searchResults[currentModalItemIndex]?.name : currentMediaSet[currentModalItemIndex]?.name
    const currentModalItemOldName = searchMode ? searchResults[currentModalItemIndex]?.oldName : currentMediaSet[currentModalItemIndex]?.oldName


    useEffect(() => {
        if (smallScreen) {
            setTimeout(() => {
                window.scroll(0, 1)
            }, 0)
        }
    }, [smallScreen])

    const handleCurrentModalItemIndex = (index) => {
        dispatch(setCurrentModalItemIndex(index))
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleNextModalItem(),
        onSwipedRight: () => handlePrevModalItem(),
        onTap: () => toggleMobileSettings(!showMobileSettings)
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
        currentModalItemName,
        currentModalItemOldName,
        handleNextModalItem,
        handlePrevModalItem,
        handleCurrentModalItemIndex,
        handleRenameModal,
        handleShareModal,
        handleDeleteCurrentModalItem,
        showMobileSettings,
        fullScreen,
        toggleFullScreen,
        searchMode,
        searchResults,
        smallScreen,
        swipeHandlers,
    }


    return (
        <ItemsModalContext.Provider value={values}>
            {children}
        </ItemsModalContext.Provider>
    );
};


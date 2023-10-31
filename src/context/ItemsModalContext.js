import React, {createContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentModalItemIndex} from "../redux/appSlice";
import {useSwipeable} from "react-swipeable";
import {imageItemModal, videoItemModal} from "../common/common";

export const ItemsModalContext = createContext();
export const ItemsModalContextProvider = ({children}) => {
    const dispatch = useDispatch()
    const smallScreen = useSelector(state => state.app.smallScreen)
    const currentMediaSet = useSelector(state => state.media.currentMediaSet)
    const searchResults = useSelector(state => state.media.searchResults)
    const mountedItemModal = useSelector(state => state.app.mountedItemModal)
    const currentModalItemIndex = useSelector(state => state.app.currentModalItemIndex)
    const searchMode = useSelector(state => state.media.searchMode)
    const [fullScreen, toggleFullScreen] = useState(false)
    const [showMobileSettings, toggleMobileSettings] = useState(true)
    const [showVideoMobileSettings, toggleVideoMobileSettings] = useState(false)
    const [showImageSettingsInSmallScreen, toggleImageSettingInSmallScreen] = useState(true)

    const currentModalItemUrl = searchMode ? searchResults[currentModalItemIndex]?.url : currentMediaSet[currentModalItemIndex]?.url
    const currentModalItemName = searchMode ? searchResults[currentModalItemIndex]?.name : currentMediaSet[currentModalItemIndex]?.name
    const currentModalItemOldName = searchMode ? searchResults[currentModalItemIndex]?.oldName : currentMediaSet[currentModalItemIndex]?.oldName

    const handleFullScreenState = () => document.fullscreenElement ? toggleFullScreen(true) : toggleFullScreen(false)

    const handleFullScreen = () => !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen()

    const isItemModalMounted = mountedItemModal === imageItemModal || mountedItemModal === videoItemModal;


    useEffect(() => {
        if (isItemModalMounted) {
            document.addEventListener('fullscreenchange', handleFullScreenState);
        } else {
            return () => {
                document.removeEventListener('fullscreenchange', handleFullScreenState);
            };
        }
        //eslint-disable-next-line
    }, [fullScreen, mountedItemModal])

    useEffect(() => {
        const handleLandScapeMode = () => {
            if (window.innerWidth > window.innerHeight) {
                if (!fullScreen) {
                    if (!document.fullscreenElement)
                        document.documentElement.requestFullscreen().then(() => void 0)
                }
            }
        };

        if (smallScreen && isItemModalMounted) {
            window.addEventListener('resize', handleLandScapeMode)
        } else {
            window.removeEventListener('resize', handleLandScapeMode)
        }

        return () => {
            window.removeEventListener('resize', handleLandScapeMode)
        }
        //eslint-disable-next-line
    }, [smallScreen, mountedItemModal]);


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

    const handleNextModalItem = e => {
        !smallScreen && e.stopPropagation()
        currentMediaSet.length !== (currentModalItemIndex + 1) && dispatch(setCurrentModalItemIndex(currentModalItemIndex + 1))
    }

    const handlePrevModalItem = e => {
        !smallScreen && e.stopPropagation()
        currentModalItemIndex !== 0 && dispatch(setCurrentModalItemIndex(currentModalItemIndex - 1))
    }


    const values = {
        currentMediaSet,
        currentModalItemIndex,
        currentModalItemUrl,
        currentModalItemOldName,
        handleNextModalItem,
        handlePrevModalItem,
        handleCurrentModalItemIndex,
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
        toggleFullScreen,
        handleFullScreenState,
        showImageSettingsInSmallScreen,
        toggleImageSettingInSmallScreen
    }


    return (
        <ItemsModalContext.Provider value={values}>
            {children}
        </ItemsModalContext.Provider>
    );
};


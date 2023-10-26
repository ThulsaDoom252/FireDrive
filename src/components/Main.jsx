import React, {useContext, useEffect, useState} from 'react';
import HeaderContainer from "./header/HeaderContainer";
import {
    audioRoute,
    delay,
    imageItemModal, imagesRoute, lazyMode,
    mainContentId,
    mediaTypes, noModal, paginateMode, renameModal, rootRoute, shareModal,
    signInRoute,
    videoItemModal, videosRoute,
} from "../common/common";
import {Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {
    handleMediaName,
    listMedia,
    setCurrentRoute, toggleSearch,
} from "../redux/mediaSlice";
import MediaContainer from "./media/MediaContainer";
import {
    setItemModalType, setModalType, setMountedItemModal, setMountedModal,  toggleListMode,
} from "../redux/appSlice";
import {Scrollbars} from 'react-custom-scrollbars';
import AudioPlayer from "./audioPlayer/AudioPlayer";
import {PaginatorContext} from "../context/PaginatorContext";
import UserModal from "./modals/UserModal";
import RenameModal from "./modals/RenameModal";
import ShareModal from "./modals/ShareModal";
import userModal from "./modals/UserModal";
import Home from "./home/Home";
import ImageModalContainer from "./modals/ImageModalContainer";
import VideoModalContainer from "./modals/Video/VideoModalContainer";
import useConfirm from "./hooks/useConfirm";
import {useStyles} from "./mui/styles";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Overlay from "./common/Overlay";
import ThemeContainer from "./common/theme/ThemeContainer";

const Main = ({
                  currentMediaSet,
                  currentRoute,
                  listMedia,
                  isAuth,
                  setCurrentRoute,
                  smallScreen,
                  searchMode,
                  searchResults,
                  modalType,
                  itemModalType,
                  setModalType,
                  setItemModalType,
                  currentTheme,
                  isSearchVisible,
                  currentThemeName,
                  listMode,
                  toggleListMode,
                  alertTitle,
                  alertMessage,
                  mountedItemModal,
                  setMountedItemModal,
                  setMountedModal,
                  mountedModal,
                  handleMediaName,
                  uploadProgress,
                  totalUploadedBytes,
                  totalBytesToUpload,
                  isMediaLoading,
                  isThemeUpdating,
                  toggleSearch,
              }) => {

    const navigate = useNavigate()

    const location = useLocation()
    const isVideoModalMounted = mountedItemModal === videoItemModal
    const isImageModalMounted = mountedItemModal === imageItemModal
    const isRenameModalMounted = mountedModal === renameModal
    const isShareModalMounted = mountedModal === shareModal
    const animateRenameModal = modalType === renameModal
    const animateImageModal = itemModalType === imageItemModal
    const animateVideoModal = itemModalType === videoItemModal
    const animateShareModal = modalType === shareModal

    const pathName = location.pathname
    const homePage = pathName === rootRoute
    const isPaginatorEnabled = listMode === paginateMode
    const noMedia = currentMediaSet.length === 0

    const [Dialog, confirm] = useConfirm(
        alertTitle,
        alertMessage,
    )

    const paginatorContext = useContext(PaginatorContext)
    const {firstItemIndex, lastItemIndex, setItemsPerPage, itemsPerPage} = paginatorContext
    const classes = useStyles()
    const handleListMode = () => {
        if (listMode === lazyMode) {
            toggleListMode(paginateMode)
        } else {
            toggleListMode(lazyMode)
        }
    }
    useEffect(() => {
        setCurrentRoute(pathName)
    }, [pathName])


    useEffect(() => {
        const validRoutes = [imagesRoute, videosRoute, audioRoute, rootRoute];
        if (validRoutes.includes(currentRoute)) {
            navigate(currentRoute);
        } else {
            navigate(signInRoute);
        }
    }, [currentRoute])


    useEffect(() => {
        mediaTypes.forEach(mediaType =>
            listMedia({mediaType}))
    }, [])

    const hideMobileSearch = () => {
        isSearchVisible && toggleSearch(false)
    }

    const nullMountedModal = async (time = 200) => {
        setModalType(noModal)
        await delay(time)
        setMountedModal(noModal)
    }

    const nullItemModal = async (time = 200) => {
        setItemModalType(noModal)
        await delay(200)
        setMountedItemModal(noModal)
    }

    const handleItemModal = async (modalType) => {
        if (modalType === imageItemModal) {
            if (!isImageModalMounted) {
                setMountedItemModal(imageItemModal)
                await delay(100)
                setItemModalType(imageItemModal)

            } else {

                nullItemModal().then(() => void 0)
            }
            return
        }

        if (modalType === videoItemModal) {

            if (!isVideoModalMounted) {

                setMountedItemModal(videoItemModal)
                await delay(100)
                setItemModalType(videoItemModal)
            } else {

                nullItemModal().then(() => void 0)
            }
        }
    }

    const handleModal = async ({modalType, name, oldName}) => {
        if (modalType === renameModal) {
            if (!isRenameModalMounted) {
                handleMediaName({name, oldName})
                await delay(100)
                setMountedModal(renameModal)
                await delay(100)
                setModalType(renameModal)
            } else {
                nullMountedModal().then(() => void 0)
            }
            return
        }

        if (modalType === shareModal) {
            if (!isShareModalMounted) {
                setMountedModal(shareModal)
                await delay(100)
                setModalType(shareModal)
            } else {
                nullMountedModal().then(() => void 0)
            }
        }
    }

    const paginatedMedia = currentMediaSet.slice(firstItemIndex, lastItemIndex)
    const mediaToShow = searchMode ? searchResults : listMode === paginateMode ? paginatedMedia : currentMediaSet

    if (!isAuth) {
        return <Navigate to={signInRoute}/>
    }

    return (
        <>
            <Dialog/>
            {isThemeUpdating && <Overlay zIndex={'z-2'}/>}
            {isRenameModalMounted &&
                <RenameModal toggleModal={handleModal} showModal={animateRenameModal}/>}
            {isShareModalMounted && <ShareModal toggleModal={handleModal} animateModal={animateShareModal}/>}
            {isVideoModalMounted && <VideoModalContainer
                handleCurrentModal={handleItemModal}
                toggleModal={handleModal}
                animateModal={animateVideoModal}
                confirm={confirm}
                classes={classes}
            />}

            {isImageModalMounted &&
                <ImageModalContainer toggleModal={setItemModalType} animateModal={animateImageModal}
                                     confirm={confirm} handleCurrentModal={handleItemModal} handleModal={handleModal}
                />}
            <UserModal toggleModal={setModalType}
                       showModal={modalType === userModal}/>
            <HeaderContainer
                smallScreen={smallScreen}
                currentTheme={currentTheme}
                currentRoute={currentRoute}
                isSearchVisible={isSearchVisible}
                toggleSearch={toggleSearch}
                noMedia={noMedia}
            />
            <main className={'w-full h-full overflow-y-hidden relative'} id={mainContentId} onClick={hideMobileSearch}>
                <Scrollbars>
                    <BurgerMenu  {...{
                        smallScreen,
                        hideMobileSearch,
                        setModalType,
                        isMediaLoading,
                        uploadProgress,
                        totalUploadedBytes,
                        totalBytesToUpload,
                        confirm,
                        currentThemeName,
                        handleListMode,
                        isPaginatorEnabled,
                        itemsPerPage,
                        setItemsPerPage
                    }}/>
                    {homePage && <Home
                        smallScreen={smallScreen}
                        currentTheme={currentTheme}/>}
                    <Routes>
                        {!homePage && <Route path={currentRoute}
                                             element={<MediaContainer {...{
                                                 currentRoute,
                                                 currentMediaSet,
                                                 mediaToShow,
                                                 isPaginatorEnabled,
                                                 searchMode,
                                                 searchResults,
                                                 smallScreen,
                                                 currentTheme,
                                                 confirm,
                                                 handleItemModal,
                                                 handleModal,
                                                 itemModalType,
                                                 classes,
                                                 noMedia,
                                             }}/>}/>}
                    </Routes>
                    <ThemeContainer className={` 
                    w-full  
                    bg-opacity-90 
                     p-2 rounded 
                  fixed
                   bottom-0 
                   left-0 
                   right-0
                     flex
                     items-center`}>
                        <AudioPlayer currentTheme={currentTheme}
                                     smallScreenMode={smallScreen}
                        />
                    </ThemeContainer>
                </Scrollbars>
            </main>
        </>

    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
        currentRoute: state.media.currentRoute,
        currentMediaSet: state.media.currentMediaSet,
        audioSet: state.media.audioSet,
        searchMode: state.media.searchMode,
        searchResults: state.media.searchResults,
        modalType: state.app.modalType,
        itemModalType: state.app.itemModalType,
        isSearchVisible: state.media.isSearchVisible,
        currentThemeName: state.app.currentThemeName,
        listMode: state.app.listMode,
        alertMessage: state.app.alertMessage,
        alertTitle: state.app.alertTitle,
        mountedItemModal: state.app.mountedItemModal,
        mountedModal: state.app.mountedModal,
        uploadProgress: state.media.uploadProgress,
        totalUploadedBytes: state.media.totalUploadedBytes,
        totalBytesToUpload: state.media.totalBytesToUpload,
        isMediaLoading: state.media.mediaLoading,
        isThemeUpdating: state.app.isThemeUpdating,
        currentTheme: state.app.currentTheme,
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute,
    setModalType, setItemModalType, toggleSearch,
    toggleListMode, setMountedItemModal,
    setMountedModal, handleMediaName,
})(Main);






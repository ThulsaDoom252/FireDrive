import React, {useContext, useEffect} from 'react';
import HeaderContainer from "./header/HeaderContainer";
import {
    imageItemModal, lazyMode,
    mainContentId,
    mediaTypes, paginateMode, renameModal, rootRoute, shareModal,
    signInRoute,
    videoItemModal,
} from "../common/common";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {
    listMedia,
    setCurrentRoute, setSearchRequest, toggleSearch,
} from "../redux/mediaSlice";
import ItemsPageContainer from "./media/MediaContainer";
import {
    handleCurrentItemModal,
    handleCurrentModal,
    setItemModalType, setModalType, toggleListMode,
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
                  searchRequest,
                  setSearchRequest,
                  isSearchVisible,
                  currentThemeName,
                  listMode,
                  toggleListMode,
                  alertTitle,
                  alertMessage,
                  mountedItemModal,
                  mountedModal,
                  uploadProgress,
                  totalUploadedBytes,
                  totalBytesToUpload,
                  isMediaLoading,
                  isThemeUpdating,
                  toggleSearch,
                  handleCurrentModal,
                  handleCurrentItemModal,
                  isMediaDeleting,
                  deletedItemUrl,
              }) => {

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
            mediaTypes.forEach(mediaType =>
                listMedia({mediaType}))
        }, [])

        const hideSearch = () => {
            isSearchVisible && toggleSearch(false)
            searchRequest && setSearchRequest('')
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
                    <RenameModal toggleModal={handleCurrentModal} showModal={animateRenameModal}/>}
                {isShareModalMounted && <ShareModal toggleModal={handleCurrentModal} animateModal={animateShareModal}/>}
                {isVideoModalMounted && <VideoModalContainer
                    handleCurrentItemModal={handleCurrentItemModal}
                    toggleModal={handleCurrentModal}
                    animateModal={animateVideoModal}
                    confirm={confirm}
                />}

                {isImageModalMounted &&
                    <ImageModalContainer toggleModal={setItemModalType} animateModal={animateImageModal}
                                         confirm={confirm} handleCurrentModal={handleCurrentItemModal}
                                         handleModal={handleCurrentModal}
                    />}
                <UserModal toggleModal={setModalType}
                           showModal={modalType === userModal}/>
                <HeaderContainer
                    searchRequest={searchRequest}
                    setSearchRequest={setSearchRequest}
                    hideSearch={hideSearch}
                    smallScreen={smallScreen}
                    currentTheme={currentTheme}
                    currentRoute={currentRoute}
                    isSearchVisible={isSearchVisible}
                    toggleSearch={toggleSearch}
                    noMedia={noMedia}
                />
                <main className={'w-full h-full overflow-y-hidden relative'} id={mainContentId}>
                    <Scrollbars>
                        <BurgerMenu  {...{
                            smallScreen,
                            hideSearch,
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
                                                 element={<ItemsPageContainer {...{
                                                     currentRoute,
                                                     currentMediaSet,
                                                     mediaToShow,
                                                     isPaginatorEnabled,
                                                     isMediaDeleting,
                                                     deletedItemUrl,
                                                     searchMode,
                                                     searchResults,
                                                     smallScreen,
                                                     currentTheme,
                                                     confirm,
                                                     handleItemModal: handleCurrentItemModal,
                                                     handleModal: handleCurrentModal,
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
    }
;

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
        currentRoute: state.media.currentRoute,
        currentMediaSet: state.media.currentMediaSet,
        audioSet: state.media.audioSet,
        searchMode: state.media.searchMode,
        searchRequest: state.media.searchRequest,
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
        isMediaDeleting: state.media.isMediaDeleting,
        deletedItemUrl: state.media.deletedItemUrl,
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute,
    setModalType, setItemModalType, toggleSearch,
    toggleListMode, handleCurrentModal, handleCurrentItemModal, setSearchRequest,
})(Main);






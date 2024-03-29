import React, {useContext, useEffect} from 'react';
import HeaderContainer from "./header/HeaderContainer";
import {
    audioRoute,
    imageItemModal, lazyMode,
    mainContentId,
    mediaTypes, noModal, paginateMode, renameModal, rootRoute, shareModal,
    signInRoute, userModal,
    videoItemModal,
} from "../common/common";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {
    listMedia,
    setCurrentRoute, setSearchRequest, toggleSearch,
} from "../redux/mediaSlice";
import ItemsPageContainer from "./media/ItemsPageContainer";
import {
    handleCurrentItemModal,
    handleCurrentModal,
    toggleListMode,
} from "../redux/appSlice";
import {Scrollbars} from 'react-custom-scrollbars';
import AudioPlayer from "./audioPlayer/AudioPlayer";
import {PaginatorContext} from "../context/PaginatorContext";
import UserModal from "./modals/UserModal";
import RenameModal from "./modals/RenameModal";
import ShareModal from "./modals/ShareModal";
import Home from "./home/Home";
import ImageModalContainer from "./modals/ImageModalContainer";
import VideoModalContainer from "./modals/Video/VideoModalContainer";
import useConfirm from "./hooks/useConfirm";
import {useStyles} from "./mui/styles";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Overlay from "./common/Overlay";
import ThemeContainer from "./common/theme/ThemeContainer";
import {AudioPlayerContext} from '../context/AudioPlayerContext';
import ThemeBtn from './common/theme/ThemeBtn';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import equalizerAnimation from "../lottie/equilizer.json"
import Lottie from 'lottie-react';
import {GridLayoutContext} from '../context/GridLayoutContext';

const Main = ({
                  currentMediaSet,
                  currentRoute,
                  listMedia,
                  isAuth,
                  setCurrentRoute,
                  smallScreen,
                  searchMode,
                  searchResults,
                  setModalType,
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

        const audioPlayerContext = useContext(AudioPlayerContext)
        const gridLayoutContext = useContext(GridLayoutContext)

        const {gridLayoutItemsArr, gridLayoutIndex, gridDividerValue, handleCollValue,} = gridLayoutContext

        const {isPlayerHidden, isCurrentTrackPlaying, handlePlayerVisibility} = audioPlayerContext

        const isVideoModalMounted = mountedItemModal === videoItemModal
        const isImageModalMounted = mountedItemModal === imageItemModal

        const isRenameModalMounted = mountedModal === renameModal
        const isShareModalMounted = mountedModal === shareModal
        const isUserModalMounted = mountedModal === userModal
        const noMountedModal = mountedItemModal === noModal


        const pathName = location.pathname
        const homePage = pathName === rootRoute
        const audioPage = pathName === audioRoute
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [pathName])


        useEffect(() => {
            mediaTypes.forEach(mediaType =>
                listMedia({mediaType}))
            // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {isRenameModalMounted && <RenameModal handleModal={handleCurrentModal}/>}
                {isShareModalMounted && <ShareModal handleModal={handleCurrentModal}/>}
                {isVideoModalMounted && <VideoModalContainer
                    handleCurrentItemModal={handleCurrentItemModal}
                    toggleModal={handleCurrentModal}
                    confirm={confirm}
                />}

                {isImageModalMounted &&
                    <ImageModalContainer
                        confirm={confirm}
                        currentRoute={currentRoute}
                        handleItemModal={handleCurrentItemModal}
                        handleModal={handleCurrentModal}
                    />}
                {isUserModalMounted && <UserModal handleModal={handleCurrentModal}/>}
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
                            handleCurrentModal,
                            setModalType,
                            isMediaLoading,
                            uploadProgress,
                            totalUploadedBytes,
                            totalBytesToUpload,
                            confirm,
                            currentTheme,
                            currentThemeName,
                            handleListMode,
                            audioPage,
                            isPaginatorEnabled,
                            itemsPerPage,
                            setItemsPerPage,
                            gridLayoutItemsArr,
                            gridLayoutIndex,
                            handleCollValue,
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
                                                     gridDividerValue,
                                                     searchResults,
                                                     smallScreen,
                                                     currentTheme,
                                                     confirm,
                                                     handleItemModal: handleCurrentItemModal,
                                                     handleModal: handleCurrentModal,
                                                     noMountedModal,
                                                     classes,
                                                     noMedia,
                                                 }}/>}/>}
                        </Routes>
                        <ThemeContainer noBg={isPlayerHidden} className={` 
                    w-full  
                    bg-opacity-90 
                     p-2 rounded 
                  fixed
                   bottom-0 
                   left-0
                   right-0
                     flex
                     items-center
                     ${isPlayerHidden ? 'left-5 bottom-5' : 'left-0 bottom-0'}
                     `
                        }>
                            {isPlayerHidden ?
                                <ThemeBtn
                                    rounded onClick={handlePlayerVisibility}
                                    className={`${isCurrentTrackPlaying && 'animate-pulse'}`}>
                                    <HeadphonesIcon className={'z-1'}/>
                                    <Lottie animationData={equalizerAnimation}
                                            hidden={!isCurrentTrackPlaying}
                                            className={'absolute w-10 h-10 bottom-2'}/>
                                </ThemeBtn> :
                                <AudioPlayer smallScreenMode={smallScreen}
                                             handlePlayerVisibility={handlePlayerVisibility}/>}
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
    listMedia, setCurrentRoute, toggleSearch,
    toggleListMode, handleCurrentModal, handleCurrentItemModal,
    setSearchRequest
})(Main);






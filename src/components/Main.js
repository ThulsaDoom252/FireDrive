import React, {useContext, useEffect} from 'react';
import HeaderContainer from "./Header/HeaderContainer";
import Home from "./Home";
import {
    imageModal,
    mainContentId,
    mediaTypes, renameModal, rootRoute, shareModal,
    signInRoute,
    smallScreenWidth, videoModal,
} from "../common/commonData";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {
    listMedia,
    setCurrentRoute,
} from "../redux/mediaSlice";
import MediaContainer from "./Media/MediaContainer";
import {
    handleAlertAction,
    setItemModalType, setModalType,
    toggleHorizontalMode,
    toggleSmallScreen,
} from "../redux/appSlice";
import BurgerMenu from "./common/BurgerMenu";
import SortInput from "./common/SortInput";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {PaginatorContext} from "../context/PaginatorContext";
import UploadContainer from "./ButtonContainers/UploadBtnContainer";
import RemoveAllBtnContainer from "./ButtonContainers/RemoveAllBtnContainer";
import LogOutContainer from "./ButtonContainers/LogOutContainer";
import UserModal from "./modals/UserModal";
import UserAvatar from "./user/UserAvatar";
import RenameModal from "./modals/RenameModal";
import AlertModal from "./modals/AlertModal";
import ImageModal from "./modals/ImageModal";
import VideoModal from "./modals/VideoModal";
import ShareModal from "./modals/ShareModal";
import alertModal from "./modals/AlertModal";
import userModal from "./modals/UserModal";
import toast from "react-hot-toast";
import MediaQuery from "react-responsive";

const Main = ({
                  currentMediaSet,
                  currentRoute,
                  listMedia,
                  toggleSmallScreen,
                  isAuth,
                  setCurrentRoute,
                  toggleHorizontalMode,
                  horizontalMode,
                  smallScreen,
                  searchMode,
                  searchResults,
                  showVideoModal,
                  showImageModal,
                  currentModalItemUrl,
                  modalType,
                  itemModalType,
                  setModalType,
                  setItemModalType,
                  handleAlertAction,
              }) => {

    const location = useLocation()
    const pathName = location.pathname
    const homePage = pathName === rootRoute

    const paginatorContext = useContext(PaginatorContext)
    const {firstItemIndex, lastItemIndex} = paginatorContext

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setCurrentRoute(pathName)
    }, [pathName])

    const handleResize = () => {
        toggleSmallScreen(window.innerWidth <= smallScreenWidth)
        toggleHorizontalMode(smallScreen && (window.innerWidth > window.innerHeight))
    }

    useEffect(() => {
        mediaTypes.forEach(mediaType =>
            listMedia({mediaType}))
    }, [])


    const paginatedMedia = currentMediaSet.slice(firstItemIndex, lastItemIndex)
    const mediaToShow = searchMode ? searchResults : paginatedMedia

    if (!isAuth) {
        return <Navigate to={signInRoute}/>
    }

    return (
        <>
            <MediaQuery orientation="landscape">
                {(matches) =>
                    matches ? (
                        <div>Экран в альбомной ориентации</div>
                    ) : (
                        <div>Экран в портретной ориентации</div>
                    )
                }
            </MediaQuery>
            <AlertModal toggleModal={setModalType}
                        showAlertModal={modalType === alertModal}
                        handleAlertAction={handleAlertAction}
            />
            <RenameModal toggleModal={setModalType} showModal={modalType === renameModal}/>
            <ShareModal toggleModal={setModalType} showModal={modalType === shareModal}/>
            <VideoModal toggleModal={setItemModalType} showModal={itemModalType === videoModal}/>
            <ImageModal toggleModal={setItemModalType} showModal={itemModalType === imageModal}
                        url={currentModalItemUrl}/>
            <UserModal toggleModal={setModalType}
                       showModal={modalType === userModal}/>
            <HeaderContainer {...{currentRoute}}/>
            <main className={'w-full h-full'} id={mainContentId}>
                <BurgerMenu smallScreen={smallScreen}>
                    <div className={'mt-5 flex flex-col justify-center'}>
                        <div onClick={() => setModalType(userModal)} className={'mb-5 mx-auto'}><UserAvatar
                        /></div>
                        <div className={'mb-5 mx-auto'}><UploadContainer/></div>
                        <div className={'mb-5 mx-auto'}><RemoveAllBtnContainer/></div>
                        <div className={'mb-5 mx-auto'}><LogOutContainer/></div>
                    </div>
                    <div><SortInput/></div>
                </BurgerMenu>
                {homePage && <Home/>}
                <Routes>
                    {!homePage && <Route path={currentRoute}
                                         element={<MediaContainer {...{
                                             currentRoute,
                                             currentMediaSet,
                                             mediaToShow,
                                             searchMode,
                                             searchResults,
                                             smallScreen,
                                         }}/>}/>}
                </Routes>
                <div
                    className={`w-full  bg-opacity-90 bg-blue-300 h-playerHeight} p-2 rounded ${itemModalType !== imageModal && itemModalType !== videoModal && 'fixed-bottom'}`}>
                    <AudioPlayer buttonsBlockWidth={'full'}/></div>
            </main>
        </>

    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
        horizontalMode: state.app.horizontalMode,
        currentRoute: state.media.currentRoute,
        currentMediaSet: state.media.currentMediaSet,
        audioSet: state.media.audioSet,
        searchMode: state.media.searchMode,
        searchResults: state.media.searchResults,
        currentModalItemUrl: state.app.currentModalItemUrl,
        modalType: state.app.modalType,
        itemModalType: state.app.itemModalType,
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute, toggleSmallScreen,
    toggleHorizontalMode, setModalType, setItemModalType, handleAlertAction,
})(Main);






import React, {useContext, useEffect} from 'react';
import HeaderContainer from "./Header/HeaderContainer";
import Home from "./Home";
import {
    mainContentId,
    mediaTypes, rootRoute,
    signInRoute,
    smallScreenWidth,
} from "../common/commonData";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {
    listMedia,
    setCurrentRoute,
} from "../redux/mediaSlice";
import MediaContainer from "./Media/MediaContainer";
import {
    toggleAlertModal,
    toggleHorizontalMode,
    toggleRenameModal,
    toggleSmallScreen,
    toggleUserModal
} from "../redux/appSlice";
import Overlay from "./Overlay";
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

const Main = ({
                  currentMediaSet,
                  overlay,
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
                  showUserModal,
                  toggleUserModal,
                  showRenameModal,
                  toggleRenameModal,
                  showAlertModal,
                  toggleAlertModal
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
        if (smallScreen && window.innerWidth > window.innerHeight) {
            toggleHorizontalMode(true)
        } else {
            horizontalMode && toggleHorizontalMode(false)
        }
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
            {/*{overlay && <Overlay/>}*/}
            <HeaderContainer {...{currentRoute}}/>
            <main className={'w-full h-full'} id={mainContentId}>
                {showAlertModal && <AlertModal closeModal={toggleAlertModal} showAlertModal={showAlertModal}/>}
                {showUserModal && <UserModal toggleModal={toggleUserModal}

                />}
                {showRenameModal && <RenameModal toggleModal={toggleRenameModal}/>}
                <BurgerMenu smallScreen={smallScreen}>
                    <div className={'mt-5 flex flex-col justify-center'}>
                        <div onClick={() => toggleUserModal(!showUserModal)} className={'mb-5 mx-auto'}><UserAvatar
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
                <div className={`w-full  bg-opacity-90 fixed-bottom bg-blue-300 h-playerHeight} p-2 rounded`}>
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
        overlay: state.app.overlay,
        showAlertModal: state.app.showAlertModal,
        audioSet: state.media.audioSet,
        searchMode: state.media.searchMode,
        searchResults: state.media.searchResults,
        showUserModal: state.app.showUserModal,
        showRenameModal: state.app.showRenameModal,
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute, toggleSmallScreen,
    toggleHorizontalMode, toggleUserModal, toggleRenameModal, toggleAlertModal
})(Main);
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
    setCurrentRoute, toggleMobileSearch,
} from "../redux/mediaSlice";
import MediaContainer from "./Media/MediaContainer";
import {
    handleAlertAction,
    setItemModalType, setModalType, toggleCurrentTheme,
    toggleSmallScreen,
} from "../redux/appSlice";
import BurgerMenu from "./common/BurgerMenu";
import SortInput from "./common/SortInput";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {PaginatorContext} from "../context/PaginatorContext";
import UploadContainer from "./ButtonContainers/UploadBtnContainer";
import RemoveAllBtnContainer from "./ButtonContainers/RemoveAllBtnContainer";
import UserModal from "./modals/UserModal";
import UserAvatar from "./user/UserAvatar";
import RenameModal from "./modals/RenameModal";
import AlertModal from "./modals/AlertModal";
import ImageModal from "./modals/ImageModal";
import VideoModal from "./modals/VideoModal";
import ShareModal from "./modals/ShareModal";
import alertModal from "./modals/AlertModal";
import userModal from "./modals/UserModal";
import {BiColorFill} from "react-icons/bi";
import LogOutContainer from "./ButtonContainers/LogOutContainer";
import {BiLogOut} from "react-icons/bi";
import DAS from '../images/themeTypes/DAS.jpg'
import DS from '../images/themeTypes/DS.jpg'
import NS from '../images/themeTypes/NS.jpg'
import AdaptiveImage from "./AdaptiveImage";
import {dayTheme, desertTheme, nightTheme} from "../common/themes";
import DropDownMenu from "./common/DropDownMenu";

const Main = ({
                  currentMediaSet,
                  currentRoute,
                  listMedia,
                  toggleSmallScreen,
                  isAuth,
                  setCurrentRoute,
                  smallScreen,
                  searchMode,
                  searchResults,
                  currentModalItemUrl,
                  modalType,
                  itemModalType,
                  setModalType,
                  setItemModalType,
                  handleAlertAction,
                  currentTheme,
                  toggleCurrentTheme,
                  showMobileSearch,
                  toggleMobileSearch,
                  currentThemeName,
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


    useEffect(() => {
        mediaTypes.forEach(mediaType =>
            listMedia({mediaType}))
    }, [])


    const handleResize = () => {
        toggleSmallScreen(window.innerWidth <= smallScreenWidth)
    }

    const hideMobileSearch = () => {
        showMobileSearch && toggleMobileSearch(false)

    }


    const paginatedMedia = currentMediaSet.slice(firstItemIndex, lastItemIndex)
    const mediaToShow = searchMode ? searchResults : paginatedMedia


    if (!isAuth) {
        return <Navigate to={signInRoute}/>
    }

    return (
        <>
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
            <HeaderContainer
                currentTheme={currentTheme}
                showMobileSearch={showMobileSearch}
                toggleMobileSearch={toggleMobileSearch}
            />
            <main className={'w-full h-full'} id={mainContentId} onClick={hideMobileSearch}>
                <BurgerMenu smallScreen={smallScreen} onClick={hideMobileSearch}>
                    <div className={'mt-5 flex flex-col justify-center'}>
                        <div onClick={() => setModalType(userModal)} className={'mb-5 mx-auto'}><UserAvatar
                        /></div>
                        <div className={'flex justify-between items-center mb-2'}>
                            <div className={'mx-auto w-40%'}><UploadContainer/></div>
                            <div className={'mx-auto w-40%'}><RemoveAllBtnContainer/></div>
                        </div>
                        <div className={'bg-gray-100 h-0.5 rounded w-full'}/>

                        <div className='mt-3 mb-3'>
                            <DropDownMenu btnLabel={'Change theme'} smallScreenIcon={<BiColorFill/>}>
                                <AdaptiveImage
                                    currentThemeName={currentThemeName}
                                    theme={dayTheme}
                                    url={DAS}
                                    onClick={() => toggleCurrentTheme({type: dayTheme})}/>
                                <AdaptiveImage
                                    currentThemeName={currentThemeName}
                                    theme={nightTheme}
                                    url={NS}
                                    onClick={() => toggleCurrentTheme({type: nightTheme})}/>
                                <AdaptiveImage
                                    currentThemeName={currentThemeName}
                                    theme={desertTheme}
                                    url={DS}
                                    onClick={() => toggleCurrentTheme({type: desertTheme})}/>
                            </DropDownMenu>
                        </div>
                        <div className={'mb-5 '}><LogOutContainer
                            label={'logout'}
                            switchToIconIfSmallScreen={true}
                            smallScreenIcon={<BiLogOut/>}
                            isFullWidth={true}
                        /></div>
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
                                             currentTheme,
                                         }}/>}/>}
                </Routes>
                <div
                    className={`w-full  bg-opacity-90 ${currentTheme.primeBg} p-2 rounded ${itemModalType !== imageModal && itemModalType !== videoModal && 'fixed-bottom'}`}>
                    <AudioPlayer currentTheme={currentTheme} smallScreenMode={smallScreen}/></div>
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
        currentModalItemUrl: state.app.currentModalItemUrl,
        modalType: state.app.modalType,
        itemModalType: state.app.itemModalType,
        showMobileSearch: state.media.showMobileSearch,
        currentThemeName: state.app.currentThemeName,
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute, toggleSmallScreen,
    setModalType, setItemModalType, handleAlertAction,
    toggleCurrentTheme, toggleMobileSearch
})(Main);






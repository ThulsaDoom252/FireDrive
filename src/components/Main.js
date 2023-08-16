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
import {toggleHorizontalMode, toggleSmallScreen} from "../redux/appSlice";
import Overlay from "./Overlay";
import BurgerMenu from "./common/BurgerMenu";
import SortInput from "./common/SortInput";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {PaginatorContext} from "../context/PaginatorContext";
import AlertContainer from "./Alert/AlertContainer";
import UploadContainer from "./ButtonContainers/UploadBtnContainer";
import RemoveAllBtnContainer from "./ButtonContainers/RemoveAllBtnContainer";
import LogOutContainer from "./ButtonContainers/LogOutContainer";

const Main = ({
                  currentMediaSet,
                  overlay,
                  alert,
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
            {overlay && <Overlay/>}
            {alert && <AlertContainer/>}
            <HeaderContainer {...{currentRoute}}/>
            <main className={'w-full h-full'} id={mainContentId}>
                <BurgerMenu smallScreen={smallScreen}>
                    <div className={'mt-5 flex flex-col justify-center'}>
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
        alert: state.app.alert,
        audioSet: state.media.audioSet,
        searchMode: state.media.searchMode,
        searchResults: state.media.searchResults,
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute, toggleSmallScreen,
    toggleHorizontalMode,
})(Main);
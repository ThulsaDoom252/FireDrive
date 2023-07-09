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
import {listMedia, setCurrentRoute} from "../redux/mediaSlice";
import MediaContainer from "./Media/MediaContainer";
import {toggleHorizontalMode, toggleSmallScreen} from "../redux/appSlice";
import Alert from "./Alert";
import Overlay from "./Overlay";
import BurgerMenu from "./common/BurgerMenu";
import UploadBtn from "./common/UploadBtn";
import RemoveAllBtn from "./common/RemoveAllBtn";
import SortInput from "./common/SortInput";
import LogOutBtn from "./common/LogOutBtn";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {PaginatorContext} from "../context/PaginatorContext";

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
                  username,
                  searchResults
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
            listMedia({username, mediaType}))
    }, [])

    const searchMode = searchResults.length > 0

    const paginatedMedia = currentMediaSet.slice(firstItemIndex, lastItemIndex)
    const mediaToShow = searchMode ? searchResults : paginatedMedia

    if (!isAuth) {
        return <Navigate to={signInRoute}/>
    }

    return (
        <>
            {overlay && <Overlay/>}
            {alert && <Alert/>}
            <HeaderContainer {...{currentRoute}}/>
            <main className={'w-full h-full'} id={mainContentId}>
                <BurgerMenu items={[<UploadBtn/>, <RemoveAllBtn/>,
                    <LogOutBtn/>]}
                            sortInput={<SortInput direction={smallScreen ? "top" : void 0}/>}
                            audioPlayer={<AudioPlayer/>}

                />
                {homePage && <Home/>}
                <Routes>
                    {!homePage && <Route path={currentRoute}
                                         element={<MediaContainer {...{
                                             currentRoute,
                                             currentMediaSet,
                                             mediaToShow,
                                             searchMode,
                                         }}/>}/>}
                </Routes>
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
        username: state.auth.username,
        audioSet: state.media.audioSet,
        searchResults: state.media.searchResults
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute, toggleSmallScreen,
    toggleHorizontalMode
})(Main);
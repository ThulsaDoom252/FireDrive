import React, {useEffect} from 'react';
import HeaderContainer from "./Header/HeaderContainer";
import Home from "./Home";
import {
    audioRoute,
    imagesRoute, mainContentId,
    mediaTypes,
    rootRoute,
    signInRoute,
    smallScreenWidth,
    videosRoute
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
                  smallScreen
              }) => {

    const location = useLocation()
    const pathName = location.pathname

    const imagesPage = currentRoute === imagesRoute
    const videosPage = currentRoute === videosRoute
    const audioPage = currentRoute === audioRoute
    const homePage = currentRoute === rootRoute
    const pages = [imagesPage, videosPage, audioPage]

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
            listMedia({userName: 'ThulsaDoom', mediaType}))
    }, [])

    if (!isAuth) {
        return <Navigate to={signInRoute}/>
    }

    return (
        <>
            {overlay && <Overlay/>}
            {alert && <Alert/>}
            <HeaderContainer {...{currentRoute}}/>
            <main id={mainContentId} className={'w-full h-full'}>
                <BurgerMenu items={[<UploadBtn/>, <RemoveAllBtn/>, <SortInput/>,]}/>
                {homePage && <Home/>}
                <Routes>
                    {!homePage && <Route path={currentRoute}
                                         element={<MediaContainer {...{currentRoute, pages, currentMediaSet}}/>}/>}
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
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute, toggleSmallScreen,
    toggleHorizontalMode
})(Main);
import React, {useEffect} from 'react';
import HeaderContainer from "./Header/HeaderContainer";
import Home from "./Home";
import {audioRoute, imagesRoute, mediaTypes, rootRoute, signInRoute, videosRoute} from "../common/commonData";
import {useSelector} from "react-redux";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {listMedia, setCurrentRoute} from "../redux/mediaSlice";
import MediaContainer from "./Media/MediaContainer";
import {toggleSmallScreen} from "../redux/appSlice";
import Alert from "./Alert";
import Overlay from "./Overlay";

const Main = ({listMedia, toggleSmallScreen, isAuth, setCurrentRoute}) => {
    const currentRoute = useSelector(state => state.media.currentRoute)

    const currentMediaSet = useSelector(state => state.media.currentMediaSet)

    const overlay = useSelector(state => state.app.overlay)

    const alert = useSelector(state => state.app.alert)

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
        toggleSmallScreen(window.innerWidth <= 768)
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
            <main className={'w-full h-full'}>
                {homePage && <Home/>}
                <Routes>
                    {!homePage && <Route path={currentRoute}
                                         element={<MediaContainer {...{currentRoute, pages, currentMediaSet}}/>}/>}
                </Routes>
            </main>
        </>

    );
};

export default connect(null, {listMedia, setCurrentRoute, toggleSmallScreen})(Main);
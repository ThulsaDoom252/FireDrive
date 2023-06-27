import React, {useEffect} from 'react';
import HeaderContainer from "./Header/HeaderContainer";
import Home from "./Home";
import {audioRoute, imagesRoute, mediaTypes, rootRoute, videosRoute} from "../common/commonData";
import {useSelector} from "react-redux";
import {Routes, Route, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {listMedia, setCurrentRoute} from "../redux/mediaSlice";
import MediaContainer from "./Media/MediaContainer";

const Main = ({listMedia, setCurrentRoute}) => {
    const location = useLocation()
    const pathName = location.pathname
    const currentRoute = useSelector(state => state.media.currentRoute)
    const imagesPage = currentRoute === imagesRoute
    const videosPage = currentRoute === videosRoute
    const audioPage = currentRoute === audioRoute
    const homePage = currentRoute === rootRoute
    const pages = [imagesPage, videosPage, audioPage]

    useEffect(() => {
        setCurrentRoute(pathName)
    }, [pathName])

    useEffect(() => {
        mediaTypes.forEach(mediaType =>
            listMedia({userName: 'ThulsaDoom', mediaType}))
    }, [])

    return (
        <>
            <HeaderContainer/>
            <main>
                {homePage && <Home/>}
                <Routes>
                    {!homePage && <Route path={currentRoute} element={<MediaContainer {...{currentRoute, pages}}/>}/>}
                </Routes>
            </main>
        </>

    );
};

export default connect(null, {listMedia, setCurrentRoute})(Main);
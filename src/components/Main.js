import React, {useEffect} from 'react';
import HeaderContainer from "./Header/HeaderContainer";
import Home from "./Home";
import {rootRoute} from "../common/commonData";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {setCurrentRoute} from "../redux/mediaSlice";

const Main = ({setCurrentRoute}) => {
    const location = useLocation()
    const pathName = location.pathname
    const currentRoute = useSelector(state => state.media.currentRoute)
    const homePage = currentRoute === rootRoute

    useEffect(() => {
        setCurrentRoute(pathName)
    }, [pathName])

    return (
        <>
            <HeaderContainer/>
            <main>
                {homePage && <Home/>}
            </main>
        </>

    );
};

export default connect(null, {setCurrentRoute})(Main);
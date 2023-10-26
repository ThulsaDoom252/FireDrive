import React, {useContext, useState} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setCurrentRoute, setSearchRequest} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext"

const HeaderContainer = ({
                             currentTheme,
                             searchRequest,
                             setSearchRequest,
                             toggleSearch,
                             isSearchVisible,
                             noMedia,
                             setCurrentRoute,
                             currentRoute,
                             smallScreen,
                         }) => {

    const pages = useContext(PagesContext)
    const {rootPage, imagesPage, videosPage, audioPage} = pages

    const isSearchBtnDisabled = rootPage || (imagesPage && noMedia) || (videosPage && noMedia) || (audioPage && noMedia)

    const handleRoute = (route) => {
        setCurrentRoute(route)
    }

    return <Header
        currentRoute={currentRoute}
        smallScreen={smallScreen}
        rootPage={rootPage}
        currentTheme={currentTheme}
        searchRequest={searchRequest}
        isSearchBtnDisabled={isSearchBtnDisabled}
        setSearchRequest={setSearchRequest}
        toggleSearch={toggleSearch}
        isSearchVisible={isSearchVisible}
        handleRoute={handleRoute}


    />
}


const mapStateToProps = state => {
    return {
        searchRequest: state.media.searchRequest
    }
}

export default connect(mapStateToProps, {setSearchRequest, setCurrentRoute})(HeaderContainer);
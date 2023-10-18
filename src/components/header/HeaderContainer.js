import React, {useContext, useState} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setCurrentRoute, setSearchRequest} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext"

const HeaderContainer = ({
                             currentTheme,
                             searchRequest,
                             setSearchRequest,
                             toggleMobileSearch,
                             showMobileSearch,
                             noMedia,
                             classes,
                             setCurrentRoute,
                             currentRoute,
                         }) => {

    const pages = useContext(PagesContext)
    const {rootPage, imagesPage, videosPage, audioPage} = pages
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    const isSearchBtnDisabled = rootPage || (imagesPage && noMedia) || (videosPage && noMedia) || (audioPage && noMedia)


    const handleRoute = (route) => {
        setCurrentRoute(route)
    }

    return <Header
        currentRoute={currentRoute}
        rootPage={rootPage}
        currentTheme={currentTheme}
        searchRequest={searchRequest}
        isSearchBtnDisabled={isSearchBtnDisabled}
        setSearchRequest={setSearchRequest}
        toggleMobileSearch={toggleMobileSearch}
        showMobileSearch={showMobileSearch}
        classes={classes}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        handleRoute={handleRoute}


    />
}


const mapStateToProps = state => {
    return {
        searchRequest: state.media.searchRequest
    }
}

export default connect(mapStateToProps, {setSearchRequest, setCurrentRoute})(HeaderContainer);
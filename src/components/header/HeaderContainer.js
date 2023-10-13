import React, {useContext} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setSearchRequest} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext"

const HeaderContainer = ({
                             currentTheme,
                             searchRequest,
                             setSearchRequest,
                             toggleMobileSearch,
                             showMobileSearch,
                             noMedia,
                         }) => {

    const pages = useContext(PagesContext)
    const {rootPage, imagesPage, videosPage, audioPage} = pages

    const isSearchBtnDisabled = rootPage || (imagesPage && noMedia) || (videosPage && noMedia) || (audioPage && noMedia)

    return <Header
        rootPage={rootPage}
        currentTheme={currentTheme}
        searchRequest={searchRequest}
        isSearchBtnDisabled={isSearchBtnDisabled}
        setSearchRequest={setSearchRequest}
        toggleMobileSearch={toggleMobileSearch}
        showMobileSearch={showMobileSearch}


    />
}


const mapStateToProps = state => {
    return {
        searchRequest: state.media.searchRequest
    }
}

export default connect(mapStateToProps, {setSearchRequest})(HeaderContainer);
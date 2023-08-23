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
                         }) => {

    const pages = useContext(PagesContext)
    const {rootPage} = pages

    return <Header
        rootPage={rootPage}
        currentTheme={currentTheme}
        searchRequest={searchRequest}
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
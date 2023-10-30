import React, {useContext} from 'react';
import Header from "./Header";
import {PagesContext} from "../../context/PagesContext"

const HeaderContainer = ({
                             currentTheme,
                             searchRequest,
                             setSearchRequest,
                             toggleSearch,
                             isSearchVisible,
                             hideSearch,
                             noMedia,
                             currentRoute,
                             smallScreen,
                         }) => {

    const pages = useContext(PagesContext)
    const {rootPage, imagesPage, videosPage, audioPage} = pages

    const isSearchBtnDisabled = rootPage || (imagesPage && noMedia) || (videosPage && noMedia) || (audioPage && noMedia)

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
        hideSearch={hideSearch}/>
}


export default HeaderContainer;
import React, {useContext, useEffect, useState} from 'react';
import Media from "./Media";
import {rootRoute} from "../../common/commonData";
import {
    clearSearchResults,
    handleCurrentMediaSet,
    handleSearchMedia, setSearchRequest,
    toggleNoSearchResults, toggleSearchMode
} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";
import {PaginatorContext} from "../../context/PaginatorContext";
import {connect} from "react-redux";
import {handleInitialModalItem, setItemOptionsHovered} from "../../redux/appSlice";

const MediaContainer = ({
                            currentRoute, handleCurrentMediaSet, handleSearchMedia,
                            toggleNoSearchResults, clearSearchResults, imagesSet, videosSet, audioSet,
                            smallScreen, currentMediaSet, currentMediaFetch, searchResults,
                            toggleSearchMode, setSearchRequest, mediaToShow, searchMode, noSearchResults,
                            searchRequest, handleInitialModalIndex, itemOptionsHovered, setItemOptionsHovered
                        }) => {
    const pagesContext = useContext(PagesContext)
    const {imagesPage, videosPage, audioPage} = pagesContext
    const [hoveredMediaIndex, setHoveredMediaIndex] = useState(null)

    const paginatorContext = useContext(PaginatorContext)
    const {
        handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick, pages,
        currentPage,
    } = paginatorContext


    const paginatorProps = [handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick, pages,
        currentPage]

    const noMedia = currentMediaSet.length === 0
    const isPaginatorHidden = noMedia || searchMode || noSearchResults

    //Search logic
    useEffect(() => {
        if (searchRequest !== '') {
            !searchMode && toggleSearchMode(true)
            handleSearchMedia(searchRequest)
        } else {
            searchMode && toggleSearchMode(false)
            clearSearchResults()
        }
    }, [searchRequest])

    useEffect(() => {
        if (searchMode && searchResults.length === 0) {
            !noSearchResults && toggleNoSearchResults(true)
        } else {
            noSearchResults && toggleNoSearchResults(false)
        }
    }, [searchRequest, searchResults])

    useEffect(() => {
        clearSearchResults()
    }, [currentRoute])

    useEffect(() => {
        if (currentRoute !== rootRoute) {
            handleCurrentMediaSet(imagesPage ? imagesSet : videosPage ? videosSet : audioSet,)
        } else {
            void 0
        }

    }, [currentRoute, imagesSet, audioSet, videosSet])

    return <Media {...{
        imagesPage,
        videosPage,
        audioPage,
        searchRequest,
        currentMediaFetch,
        searchMode,
        smallScreen,
        mediaToShow,
        setSearchRequest,
        noMedia,
        hoveredMediaIndex,
        setHoveredMediaIndex,
        noSearchResults,
        isPaginatorHidden,
        paginatorProps,
        handleInitialModalIndex,
        itemOptionsHovered,
        setItemOptionsHovered
    }}/>
};

const mapStateToProps = (state) => {
    return {
        imagesSet: state.media.imagesSet,
        videosSet: state.media.videosSet,
        audioSet: state.media.audioSet,
        smallScreen: state.app.smallScreen,
        currentMediaFetch: state.media.fetchCurrentMedia,
        noSearchResults: state.media.noSearchResults,
        searchRequest: state.media.searchRequest,
        itemOptionsHovered: state.app.itemOptionsHovered,
    }
}

export default connect(mapStateToProps, {
    handleCurrentMediaSet,
    handleSearchMedia,
    toggleSearchMode,
    toggleNoSearchResults,
    clearSearchResults,
    setSearchRequest,
    handleInitialModalIndex: handleInitialModalItem,
    setItemOptionsHovered,
})(MediaContainer)
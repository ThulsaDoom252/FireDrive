import React, {useContext, useEffect, useState} from 'react';
import ItemsPage from "./ItemsPage";
import {imageItemModal, rootRoute, videoItemModal} from "../../common/common";
import {
    clearSearchResults,
    handleCurrentMediaSet,
    handleSearchMedia, setSearchRequest,
    toggleNoSearchResults, toggleSearchMode
} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";
import {PaginatorContext} from "../../context/PaginatorContext";
import {connect} from "react-redux";
import {
    setCurrentModalItemIndex,
    setItemOptionsHovered
} from "../../redux/appSlice";

const ItemsPageContainer = ({
                                currentRoute,
                                handleCurrentMediaSet,
                                handleSearchMedia,
                                toggleNoSearchResults,
                                clearSearchResults,
                                imagesSet,
                                videosSet,
                                audioSet,
                                smallScreen,
                                currentMediaFetch,
                                searchResults,
                                toggleSearchMode,
                                mediaToShow,
                                searchMode,
                                noSearchResults,
                                searchRequest,
                                setItemOptionsHovered,
                                noMountedModal,
                                isPaginatorEnabled,
                                isMediaDeleting,
                                confirm,
                                setCurrentModalItemIndex,
                                handleItemModal,
                                handleModal,
                                noMedia,
                                deletedItemUrl,
                                gridDividerValue,
                            }) => {
    const pagesContext = useContext(PagesContext)
    const {imagesPage, videosPage, audioPage} = pagesContext
    const [hoveredMediaIndex, setHoveredMediaIndex] = useState(null)

    const paginatorContext = useContext(PaginatorContext)
    const {
        handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick,
        currentPage, totalPages
    } = paginatorContext


    const paginatorProps = [handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick,
        currentPage, totalPages]


    const isPaginatorHidden = !isPaginatorEnabled || noMedia || searchMode || noSearchResults || isMediaDeleting

    //search logic
    useEffect(() => {
        if (searchRequest !== '') {
            !searchMode && toggleSearchMode(true)
            handleSearchMedia(searchRequest)
        } else {
            searchMode && toggleSearchMode(false)
            clearSearchResults()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchRequest])

    useEffect(() => {
        if (searchMode && searchResults.length === 0) {
            !noSearchResults && toggleNoSearchResults(true)
        } else {
            noSearchResults && toggleNoSearchResults(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchRequest, searchResults])

    useEffect(() => {
        clearSearchResults()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRoute])

    useEffect(() => {
        if (currentRoute !== rootRoute) {
            handleCurrentMediaSet(imagesPage ? imagesSet : videosPage ? videosSet : audioSet,)
        } else {
            void 0
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRoute, imagesSet, audioSet, videosSet])

    const handleImageClick = (index) => {
        setCurrentModalItemIndex(index)
        handleItemModal(imageItemModal)
    }

    const handleVideoClick = (index) => {
        setCurrentModalItemIndex(index)
        handleItemModal(videoItemModal)
    }

    return <ItemsPage {...{
        imagesPage,
        isMediaDeleting,
        videosPage,
        audioPage,
        currentMediaFetch,
        searchMode,
        gridDividerValue,
        smallScreen,
        mediaToShow,
        noMedia,
        hoveredMediaIndex,
        setHoveredMediaIndex,
        noSearchResults,
        isPaginatorHidden,
        paginatorProps,
        setItemOptionsHovered,
        deletedItemUrl,
        noOpenModal: noMountedModal,
        confirm,
        handleImageClick,
        handleVideoClick,
        handleModal,
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
    }
}

export default connect(mapStateToProps, {
    handleCurrentMediaSet,
    handleSearchMedia,
    toggleSearchMode,
    toggleNoSearchResults,
    clearSearchResults,
    setSearchRequest,
    setCurrentModalItemIndex,
    setItemOptionsHovered,
})(ItemsPageContainer)
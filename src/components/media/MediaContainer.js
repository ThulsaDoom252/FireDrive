import React, {useContext, useEffect, useState} from 'react';
import Media from "./Media";
import {imageItemModal, noModal, rootRoute, videoItemModal} from "../../common/common";
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
    setCurrentLayoutIndex,
    setGridDividerValue,
    setItemOptionsHovered
} from "../../redux/appSlice";
import columnLayoutImg from "./layout/numbers/1.png"
import twoColumnsLayoutImg from "./layout/numbers/2.png"
import threeColumnsLayoutImg from "./layout/numbers/3.png"
import quadColumnsLayoutImg from "./layout/numbers/4.png"
import fiveColumnsLayoutImg from "./layout/numbers/5.png"
import sixColumnsLayoutImg from "./layout/numbers/6.png"

const MediaContainer = ({
                            currentRoute,
                            handleCurrentMediaSet,
                            handleSearchMedia,
                            gridLayoutIndex,
                            setCurrentLayoutIndex,
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
                            itemModalType,
                            isPaginatorEnabled,
                            confirm,
                            gridDividerValue,
                            setGridDividerValue,
                            setCurrentModalItemIndex,
                            handleItemModal,
                            handleModal,
                            classes,
                            noMedia,
                        }) => {
    const pagesContext = useContext(PagesContext)
    const {imagesPage, videosPage, audioPage} = pagesContext
    const [hoveredMediaIndex, setHoveredMediaIndex] = useState(null)
    const [gridLayoutMenu, toggleGridLayoutMenu] = useState(false)
    const [gridContainerWidth, setGridContainerWidth] = useState('100%')

    const paginatorContext = useContext(PaginatorContext)
    const {
        handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick, pages,
        currentPage,
    } = paginatorContext


    const paginatorProps = [handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick, pages,
        currentPage]


    const isPaginatorHidden = !isPaginatorEnabled || noMedia || searchMode || noSearchResults

    const noOpenModal = itemModalType === noModal

    //search logic
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

    useEffect(() => {
        if (smallScreen) {
            gridContainerWidth !== '100%' && setGridContainerWidth('100%')
            return
        }

        if (!smallScreen) {
            switch (gridDividerValue) {
                case 3: {
                    setGridContainerWidth('80%')
                    gridContainerWidth !== '80%' && setGridContainerWidth('80%')
                    break;
                }
                case 4: {
                    setGridContainerWidth('70%')
                    gridContainerWidth !== '70%' && setGridContainerWidth('70%')
                    break
                }
                case 6: {
                    gridContainerWidth !== '60%' && setGridContainerWidth('60%')
                    break
                }
                case 12 : {
                    gridContainerWidth !== '30%' && setGridContainerWidth('30%')
                    break
                }
                default: {
                    gridContainerWidth !== '100%' && setGridContainerWidth('100%')
                }
            }
        }

    }, [gridDividerValue, smallScreen])


    // layout test
    const gridLayoutItemsArr = [
        {img: columnLayoutImg, divider: 12},
        {img: twoColumnsLayoutImg, divider: 6},
        {img: threeColumnsLayoutImg, divider: 4},
        {img: quadColumnsLayoutImg, divider: 3},
        {img: fiveColumnsLayoutImg, divider: 2.4},
        {img: sixColumnsLayoutImg, divider: 2},
    ]

    const handleImageClick = (index) => {
        setCurrentModalItemIndex(index)
        handleItemModal(imageItemModal)
    }

    const handleVideoClick = (index) => {
        setCurrentModalItemIndex(index)
        handleItemModal(videoItemModal)
    }


    const handleLayoutMenu = () => {
        toggleGridLayoutMenu(!gridLayoutMenu)
    }

    const handleCollValue = (number, index) => {
        setCurrentLayoutIndex(index)
        setGridDividerValue(number)
    }

    return <Media {...{
        imagesPage,
        videosPage,
        audioPage,
        currentMediaFetch,
        searchMode,
        smallScreen,
        mediaToShow,
        noMedia,
        hoveredMediaIndex,
        setHoveredMediaIndex,
        noSearchResults,
        isPaginatorHidden,
        paginatorProps,
        setItemOptionsHovered,
        noOpenModal,
        confirm,
        handleLayoutMenu,
        handleCollValue,
        gridLayoutItemsArr,
        gridLayoutMenu,
        gridDividerValue,
        gridLayoutIndex,
        handleImageClick,
        handleVideoClick,
        handleModal,
        classes,
    }}/>
};

const mapStateToProps = (state) => {
    return {
        gridDividerValue: state.app.gridDividerValue,
        gridLayoutIndex: state.app. gridLayoutIndex,
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
    setCurrentLayoutIndex,
    clearSearchResults,
    setSearchRequest,
    setCurrentModalItemIndex,
    setItemOptionsHovered,
    setGridDividerValue,
})(MediaContainer)
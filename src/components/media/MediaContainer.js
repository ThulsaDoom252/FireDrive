import React, {useContext, useEffect, useState} from 'react';
import Media from "./Media";
import {imageItemModal, noModal, rootRoute, videoItemModal} from "../../common/commonData";
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
    setGridIndex,
    setGridSize,
    setItemOptionsHovered
} from "../../redux/appSlice";
import first from "./layout/numbers/1.png"
import second from "./layout/numbers/2.png"
import third from "./layout/numbers/3.png"
import fourth from "./layout/numbers/4.png"
import fives from "./layout/numbers/5.png"
import sixth from "./layout/numbers/6.png"

const MediaContainer = ({
                            currentRoute,
                            handleCurrentMediaSet,
                            handleSearchMedia,
                            gridIndex,
                            setGridIndex,
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
                            gridSize,
                            setGridSize,
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
    const [gridWidth, setGridWidth] = useState('100%')

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
            gridWidth !== '100%' && setGridWidth('100%')
            return
        }

        if (!smallScreen) {
            switch (gridSize) {
                case 3: {
                    setGridWidth('80%')
                    gridWidth !== '80%' && setGridWidth('80%')
                    break;
                }
                case 4: {
                    setGridWidth('70%')
                    gridWidth !== '70%' && setGridWidth('70%')
                    break
                }
                case 6: {
                    gridWidth !== '60%' && setGridWidth('60%')
                    break
                }
                case 12 : {
                    gridWidth !== '30%' && setGridWidth('30%')
                    break
                }
                default: {
                    gridWidths !== '100%' && setGridWidth('100%')
                }
            }
        }

    }, [gridSize, smallScreen])


    // layout test
    const layoutNumbs = [
        {img: first, number: 12},
        {img: second, number: 6},
        {img: third, number: 4},
        {img: fourth, number: 3},
        {img: fives, number: 2.4},
        {img: sixth, number: 2},
    ]

    const handleImageClick = (index) => {
        setCurrentModalItemIndex(index)
        handleItemModal(imageItemModal)
    }

    const handleVideoClick = (index) => {
        setCurrentModalItemIndex(index)
        handleItemModal(videoItemModal)
    }


    const gridWidths = !smallScreen && gridSize === (6 || 5) ? '100%' :
        !smallScreen && gridSize === (4 || 3) ? '70%' :
            !smallScreen && gridSize === 2 ? '60%' :
                !smallScreen && gridSize === 1 ? '50%' :
                    '100%'

    const handleLayoutMenu = () => {
        toggleGridLayoutMenu(!gridLayoutMenu)
    }

    const handleCollValue = (number, index) => {
        setGridIndex(index)
        setGridSize(number)
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
        layoutNumbs,
        gridWidth,
        layoutMenu: gridLayoutMenu,
        gridNumb: gridSize,
        gridIndex,
        handleImageClick,
        handleVideoClick,
        handleModal,
        classes,
    }}/>
};

const mapStateToProps = (state) => {
    return {
        gridSize: state.app.gridSize,
        gridIndex: state.app.gridIndex,
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
    setGridIndex,
    clearSearchResults,
    setSearchRequest,
    setCurrentModalItemIndex,
    setItemOptionsHovered,
    setGridSize,
})(MediaContainer)
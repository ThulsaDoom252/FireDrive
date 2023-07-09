import React, {useContext, useEffect, useState} from 'react';
import Media from "./Media";
import {useDispatch, useSelector} from "react-redux";
import {rootRoute} from "../../common/commonData";
import {clearSearchResults, handleCurrentMediaSet} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";
import {PaginatorContext} from "../../context/PaginatorContext";

const MediaContainer = ({currentRoute, mediaToShow, searchMode}) => {
    const imagesMediaSet = useSelector(state => state.media.imagesSet)
    const videosMediaSet = useSelector(state => state.media.videosSet)
    const audioMediaSet = useSelector(state => state.media.audioSet)
    const smallScreen = useSelector(state => state.app.smallScreen)
    const currentMediaFetch = useSelector(state => state.media.fetchCurrentMedia)
    const noSearchResults = useSelector(state => state.media.noSearchResults)
    const dispatch = useDispatch()
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

    const noMedia = mediaToShow.length === 0
    const isPaginatorHidden = noMedia || searchMode || noSearchResults


    useEffect(() => {
        dispatch(clearSearchResults())
    }, [currentRoute])

    useEffect(() => {
        if (currentRoute !== rootRoute) {
            handleCurrentMediaSet({dispatch},
                imagesPage ? imagesMediaSet : videosPage ? videosMediaSet : audioPage ? audioMediaSet : void 0, currentRoute)
        } else {
            void 0
        }

    }, [currentRoute, imagesMediaSet, audioMediaSet, videosMediaSet])

    return <Media {...{
        imagesPage,
        videosPage,
        audioPage,
        currentMediaFetch,
        smallScreen,
        mediaToShow,
        noMedia,
        hoveredMediaIndex,
        setHoveredMediaIndex,
        noSearchResults,
        isPaginatorHidden,
        paginatorProps,
    }}/>
};

export default MediaContainer
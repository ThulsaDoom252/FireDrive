import React, {useContext, useEffect} from 'react';
import Media from "./Media";
import {useDispatch, useSelector} from "react-redux";
import {rootRoute} from "../../common/commonData";
import {handleCurrentMediaSet} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";

const MediaContainer = ({currentRoute, currentMediaSet}) => {
    const imagesMediaSet = useSelector(state => state.media.imagesSet)
    const videosMediaSet = useSelector(state => state.media.videosSet)
    const audioMediaSet = useSelector(state => state.media.audioSet)
    const smallScreen = useSelector(state => state.app.smallScreen)
    const currentMediaFetch = useSelector(state => state.media.fetchCurrentMedia)
    const dispatch = useDispatch()
    const pages = useContext(PagesContext)
    const {imagesPage, videosPage, audioPage} = pages

    window.audioMediaSet = audioMediaSet
    window.currentMediaSet = currentMediaSet


    useEffect(() => {
        if (currentRoute !== rootRoute) {
            handleCurrentMediaSet({dispatch},
                imagesPage ? imagesMediaSet : videosPage ? videosMediaSet : audioPage ? audioMediaSet : void 0, currentRoute)
        } else {
            void 0
        }

    }, [currentRoute, imagesMediaSet, audioMediaSet, videosMediaSet])

    return <Media {...{imagesPage, videosPage, audioPage, currentMediaSet, currentMediaFetch, smallScreen}}/>
};

export default MediaContainer
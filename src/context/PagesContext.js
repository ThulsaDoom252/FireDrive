import {createContext} from 'react';
import {audioRoute, imagesRoute, rootRoute, videosRoute} from "../common/common";
import {useSelector} from "react-redux";

export const PagesContext = createContext();

export function PagesContextProvider({children}) {
    const currentRoute = useSelector(state => state.media.currentRoute)
    const rootPage = currentRoute === rootRoute
    const imagesPage = currentRoute === imagesRoute
    const videosPage = currentRoute === videosRoute
    const audioPage = currentRoute === audioRoute


    const pages = {
        rootPage,
        imagesPage,
        videosPage,
        audioPage,
        currentRoute,
    };

    return (
        <>
            <PagesContext.Provider value={pages}>{children}</PagesContext.Provider>;
        </>
    )


}
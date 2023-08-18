import React, {createContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentModalItemIndex} from "../redux/appSlice";


export const ItemsModalContext = createContext();

export const ItemsModalContextProvider = ({children}) => {

    const dispatch = useDispatch()
    const currentMediaSet = useSelector(state => state.media.currentMediaSet)
    const searchResults = useSelector(state => state.media.searchResults)
    const currentModalItemIndex = useSelector(state => state.app.currentModalItemIndex)
    const searchMode = useSelector(state => state.media.searchMode)

    const handleCurrentModalItemIndex = (index) => {
        dispatch(setCurrentModalItemIndex(index))
    }

    const handleNextModalItem = () => {
        currentMediaSet.length !== (currentModalItemIndex - 1) && dispatch(setCurrentModalItemIndex(currentModalItemIndex + 1))
    }

    const handlePrevModalItem = () => {
        currentModalItemIndex !== 0 && dispatch(setCurrentModalItemIndex(currentModalItemIndex - 1))
    }

    const currentModalItemUrl = searchMode ? searchResults[currentModalItemIndex]?.url : currentMediaSet[currentModalItemIndex]?.url
    const currentModalItemName = searchMode ? searchResults[currentModalItemIndex]?.name : currentMediaSet[currentModalItemIndex]?.name

    const values = {
        currentMediaSet,
        currentModalItemIndex,
        currentModalItemUrl,
        currentModalItemName,
        handleNextModalItem,
        handlePrevModalItem,
        handleCurrentModalItemIndex,
    }


    return (
        <ItemsModalContext.Provider value={values}>
            {children}
        </ItemsModalContext.Provider>
    );
};
import React, {createContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentModalItemIndex} from "../redux/appSlice";


export const ItemsModalContext = createContext();

export const ItemsModalContextProvider = ({children}) => {

    const dispatch = useDispatch()
    const currentMediaSet = useSelector(state => state.media.currentMediaSet)
    const currentModalItemIndex = useSelector(state => state.app.currentModalItemIndex)

    const handleCurrentModalItemIndex = (index) => {
        dispatch(setCurrentModalItemIndex(index))
    }

    const handleNextModalItem = () => {
        currentMediaSet.length !== (currentModalItemIndex - 1) && dispatch(setCurrentModalItemIndex(currentModalItemIndex + 1))
    }

    const handlePrevModalItem = () => {
        currentModalItemIndex !== 0 && dispatch(setCurrentModalItemIndex(currentModalItemIndex - 1))
    }

    const currentModalItemUrl = currentMediaSet[currentModalItemIndex]?.url

    const values = {
        currentMediaSet,
        currentModalItemIndex,
        currentModalItemUrl,
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
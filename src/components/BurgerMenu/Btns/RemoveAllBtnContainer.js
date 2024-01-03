import React, {useContext} from 'react';
import {PagesContext} from "../../../context/PagesContext";
import {useDispatch, useSelector,} from "react-redux";
import {handleAlertModal} from "../../../redux/appSlice";
import {GoTrash} from "react-icons/go";
import {burgerMenuIconSize, removeAllItemsTitle, removeAllMsg} from "../../../common/common";
import {deleteAllMedia} from "../../../redux/mediaSlice";
import ThemeBtn from "../../common/theme/ThemeBtn";
import {createSelector} from '@reduxjs/toolkit';

const RemoveAllBtnContainer = ({confirm, iconSize = burgerMenuIconSize}) => {
    const pages = useContext(PagesContext)
    const dispatch = useDispatch()
    const {rootPage} = pages

    const selectMediaState = state => state.media;

    const selectMediaData = createSelector(
        [selectMediaState],
        mediaState => ({
            mediaLoading: mediaState.mediaLoading,
            isMediaDeleting: mediaState.isMediaDeleting,
            currentMediaSet: mediaState.currentMediaSet,
            smallScreen: mediaState.smallScreen,
        })
    );

    const {mediaLoading, isMediaDeleting, currentMediaSet, smallScreen} = useSelector(selectMediaData)

    const handleClick = async () => {
        await dispatch(handleAlertModal({
            message: removeAllMsg,
            title: removeAllItemsTitle,
        }))
        if (await confirm()) {
            dispatch(deleteAllMedia())
        }
    }

    const noCurrentMedia = currentMediaSet.length === 0
    const isDisabled = rootPage || noCurrentMedia || mediaLoading || isMediaDeleting

    return (
        <>
            <ThemeBtn fullWidth
                      onClick={handleClick}
                      disabled={isDisabled}>
                {smallScreen ? <GoTrash size={burgerMenuIconSize}/> : 'Remove all'}
            </ThemeBtn>
        </>
    )
};

export default RemoveAllBtnContainer
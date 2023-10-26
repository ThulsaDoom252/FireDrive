import React, {useContext} from 'react';
import {PagesContext} from "../../context/PagesContext";
import {useDispatch, useSelector,} from "react-redux";
import {handleAlertModal} from "../../redux/appSlice";
import {GoTrash} from "react-icons/go";
import {removeAllItemsTitle, removeAllMsg} from "../../common/common";
import {deleteAllMedia} from "../../redux/mediaSlice";
import ThemeBtn from "../common/theme/ThemeBtn";

const RemoveAllBtnContainer = ({confirm}) => {

    const pages = useContext(PagesContext)
    const dispatch = useDispatch()
    const mediaLoading = useSelector(state => state.media.mediaLoading)
    const mediaDeleting = useSelector(state => state.media.mediaDeleting)
    const currentMediaSet = useSelector(state => state.media.currentMediaSet)
    const smallScreen = useSelector(state => state.media.smallScreen)

    const {
        rootPage,
    } = pages

    const handleClick = async () => {
        await dispatch(handleAlertModal({
            message: removeAllMsg,
            title: removeAllItemsTitle,
        }))
        const userAction = await confirm()
        if (userAction) {
            dispatch(deleteAllMedia())
        } else {
            void 0
        }
    }

    const noCurrentMedia = currentMediaSet.length === 0
    const isDisabled = rootPage || noCurrentMedia || mediaLoading || mediaDeleting

    return (
        <>
            <ThemeBtn fullWidth
                      onClick={handleClick}
                      disabled={isDisabled}
                      smallScreenIcon={< GoTrash/>}>
                {smallScreen ? <GoTrash/> : 'Remove all'}
            </ThemeBtn>
        </>
    )
};

export default RemoveAllBtnContainer
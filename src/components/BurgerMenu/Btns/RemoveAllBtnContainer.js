import React, {useContext} from 'react';
import {PagesContext} from "../../../context/PagesContext";
import {useDispatch, useSelector,} from "react-redux";
import {handleAlertModal} from "../../../redux/appSlice";
import {GoTrash} from "react-icons/go";
import {removeAllItemsTitle, removeAllMsg} from "../../../common/common";
import {deleteAllMedia} from "../../../redux/mediaSlice";
import ThemeBtn from "../../common/theme/ThemeBtn";

const RemoveAllBtnContainer = ({confirm}) => {
    const pages = useContext(PagesContext)
    const dispatch = useDispatch()
    const { rootPage } = pages
    const { mediaLoading, mediaDeleting, currentMediaSet, smallScreen } = useSelector(state => ({
        mediaLoading: state.media.mediaLoading,
        mediaDeleting: state.media.mediaDeleting,
        currentMediaSet: state.media.currentMediaSet,
        smallScreen: state.media.smallScreen
    }))

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
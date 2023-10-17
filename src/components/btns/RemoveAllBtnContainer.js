import React, {useContext} from 'react';
import {PagesContext} from "../../context/PagesContext";
import {connect,} from "react-redux";
import {handleAlertModal} from "../../redux/appSlice";
import {GoTrash} from "react-icons/go";
import {removeAllItemsTitle, removeAllMsg} from "../../common/commonData";
import {deleteAllMedia} from "../../redux/mediaSlice";
import ThemeBtn from "../../common/theme/ThemeBtn";

const RemoveAllBtnContainer = ({
                                   mediaLoading,
                                   mediaDeleting,
                                   handleAlertModal,
                                   currentMediaSet,
                                   smallScreen,
                                   deleteAllMedia,
                                   confirm,
                               }) => {

    const pages = useContext(PagesContext)
    const {
        rootPage,
    } = pages

    const handleClick = async () => {
        await handleAlertModal({
            message: removeAllMsg,
            title: removeAllItemsTitle,
        })
        const userAction = await confirm()
        if (userAction) {
            deleteAllMedia()
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

const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute,
        mediaLoading: state.media.mediaLoading,
        mediaDeleting: state.media.mediaDeleting,
        currentMediaSet: state.media.currentMediaSet,
        smallScreen: state.app.smallScreen,

    }
}

export default connect(mapStateToProps, {handleAlertModal, deleteAllMedia})(RemoveAllBtnContainer);
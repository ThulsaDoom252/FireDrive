import React, {useContext} from 'react';
import {PagesContext} from "../../context/PagesContext";
import ActionBtn from "../common/ActionBtn";
import {connect} from "react-redux";
import {handleAlert} from "../../redux/appSlice";
import {alertWarningStyle, removeAllMsg} from "../../common/commonData";
import {GoTrash} from "react-icons/go";

const RemoveAllBtnContainer = ({mediaLoading, mediaDeleting, handleAlert, currentMediaSet, smallScreen}) => {
    const pages = useContext(PagesContext)
    const {
        rootPage,
    } = pages

    const handleClick = () => handleAlert({
        overlayMode: true,
        alertContent: removeAllMsg,
        alertStyle: alertWarningStyle
    })

    const noCurrentMedia = currentMediaSet.length === 0
    const isDisabled = rootPage || noCurrentMedia || mediaLoading || mediaDeleting

    return (
        <>
            <ActionBtn label={'Remove all'}
                       icon={< GoTrash/>} {...{handleClick, isDisabled, smallScreen}}/>
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

export default connect(mapStateToProps, {handleAlert})(RemoveAllBtnContainer);
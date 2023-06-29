import React from 'react';
import {GoTrash} from "react-icons/go";
import {connect} from "react-redux";
import {alertRemoveAll, alertWarningStyle, rootRoute} from "../../common/commonData";
import {handleAlert} from "../../redux/appSlice";

const RemoveAllBtn = ({mediaLoading, mediaDeleting, handleAlert, currentMediaSet, smallScreen, currentRoute}) => {
    const handleDeleteAllMedia = () => {
        handleAlert({overlayMode: true, alertMode: alertRemoveAll, alertStyle: alertWarningStyle})
    }

    const noCurrentMedia = currentMediaSet.length === 0
    const homePage = currentRoute === rootRoute

    return <>
        {
            !homePage && <button
                type="button"
                disabled={noCurrentMedia || mediaLoading || mediaDeleting}
                onClick={handleDeleteAllMedia}
                className={'bg-purple-500  hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'}
            >
                {smallScreen ? < GoTrash/> : 'Remove all media'}
            </button>
        }
    </>

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


export default connect(mapStateToProps, {handleAlert})(RemoveAllBtn);
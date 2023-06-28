import React from 'react';
import Header from "./Header";
import {deleteAllMedia, uploadMedia} from "../../redux/mediaSlice";
import {connect} from "react-redux";
import {handleAlert} from "../../redux/appSlice";
import {alertRemoveAll, alertWarningStyle} from "../../common/commonData";

const HeaderContainer = ({
                             currentRoute,
                             pages,
                             currentMediaSet,
                             uploadMedia,
                             deleteAllMedia,
                             smallScreen,
                             handleAlert
                         }) => {

    //currentMediaSet and deleteMedia will be used further. Don't delete

    const hiddenFileInput = React.useRef(null)
    const handleUploadBtnClick = () => hiddenFileInput.current.click()

    const handleUploadMedia = (e) => {
        uploadMedia({event: e, currentRoute, userName: 'ThulsaDoom'})
    }

    const handleDeleteAllMedia = () => {
        handleAlert({overlayMode: true, alertMode: alertRemoveAll, alertStyle: alertWarningStyle})
    }

    const noCurrentMedia = currentMediaSet.length === 0

    return <Header {...{
        noCurrentMedia,
        handleUploadBtnClick,
        hiddenFileInput,
        handleUploadMedia,
        pages,
        currentRoute,
        smallScreen,
        handleDeleteAllMedia,
    }}/>
}

export default connect(null, {uploadMedia, deleteAllMedia, handleAlert})(HeaderContainer);
import React from 'react';
import Header from "./Header";
import {deleteAllMedia, uploadMedia} from "../../redux/mediaSlice";
import {connect} from "react-redux";

const HeaderContainer = ({currentRoute, pages, currentMediaSet, uploadMedia, deleteAllMedia, smallScreen}) => {

    const hiddenFileInput = React.useRef(null)
    const handleUploadBtnClick = () => hiddenFileInput.current.click()

    const handleUploadMedia = (e) => {
        uploadMedia({event: e, currentRoute, userName: 'ThulsaDoom'})
    }

    const handleDeleteAllMedia = () => {
        deleteAllMedia({currentMediaSet, currentRoute})
    }

    return <Header {...{
        handleUploadBtnClick,
        hiddenFileInput,
        handleUploadMedia,
        pages,
        currentRoute,
        smallScreen,
        handleDeleteAllMedia,
    }}/>
}

export default connect(null, {uploadMedia, deleteAllMedia})(HeaderContainer);
import React from 'react';
import Header from "./Header";
import {uploadMedia} from "../../redux/mediaSlice";
import {connect} from "react-redux";

const HeaderContainer = ({currentRoute, pages}) => {

    const hiddenFileInput = React.useRef(null)
    const handleUploadBtnClick = () => hiddenFileInput.current.click()

    const handleUploadMedia = (e) => {
        uploadMedia({event: e, currentRoute, userName: 'ThulsaDoom'})
    }

    return <Header {...{handleUploadBtnClick, hiddenFileInput, handleUploadMedia, pages, currentRoute}}/>
}

export default connect(null, {uploadMedia})(HeaderContainer);
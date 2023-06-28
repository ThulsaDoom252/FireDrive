import React from 'react';
import Header from "./Header";
import {deleteAllMedia, uploadMedia} from "../../redux/mediaSlice";
import {connect} from "react-redux";
import {handleAlert} from "../../redux/appSlice";

const HeaderContainer = () => {

    return <Header/>
}

export default connect(null, {uploadMedia, deleteAllMedia, handleAlert})(HeaderContainer);
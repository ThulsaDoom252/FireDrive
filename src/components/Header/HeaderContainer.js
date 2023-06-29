import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";


const HeaderContainer = ({currentRoute, tinyScreen}) => {
    return <Header {...{currentRoute, tinyScreen}}/>
}

const mapStateToProps = (state) => {
    return {
        tinyScreen: state.app.tinyScreen
    }
}

export default connect(mapStateToProps, null)(HeaderContainer);
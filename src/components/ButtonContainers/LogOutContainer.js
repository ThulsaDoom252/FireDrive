import React from 'react';
import {connect} from "react-redux";
import ActionBtn from "../common/ActionBtn";
import {handleLogout} from "../../redux/authSlice";

const LogOutContainer = ({smallScreen, handleLogout, label, switchToIconIfSmallScreen, smallScreenIcon, isFullWidth}) => {

    const handleClick = () => handleLogout()

    return <ActionBtn switchToIconIfSmallScreen={switchToIconIfSmallScreen}
                      isFullWidth={isFullWidth}
                      label={label}
                      smallScreenIcon={smallScreenIcon}
                      {...{smallScreen, handleClick}}/>
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {handleLogout})(LogOutContainer);
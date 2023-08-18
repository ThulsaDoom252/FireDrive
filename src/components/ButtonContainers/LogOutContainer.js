import React from 'react';
import {connect} from "react-redux";
import ActionBtn from "../common/ActionBtn";
import {handleLogout} from "../../redux/authSlice";
import {BiLogOut} from "react-icons/bi";

const LogOutContainer = ({smallScreen, handleLogout}) => {

    const handleClick = () => handleLogout()

    return <ActionBtn switchToIconIfSmallScreen={true}
                      label={'logout'}
                      icon={<BiLogOut/>}
                      {...{smallScreen, handleClick}}/>
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {handleLogout})(LogOutContainer);
import React from 'react';
import {connect} from "react-redux";
import {handleLogout} from "../../redux/authSlice";
import {BiLogOut} from "react-icons/bi";
import ThemeBtn from "../common/theme/ThemeBtn";

const LogOutContainer = ({smallScreen, handleLogout}) => {

    const handleClick = () => handleLogout()

    return <ThemeBtn
        fullWidth
        onClick={handleClick}>{smallScreen ? <BiLogOut/> : 'Logout'}</ThemeBtn>
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {handleLogout})(LogOutContainer);
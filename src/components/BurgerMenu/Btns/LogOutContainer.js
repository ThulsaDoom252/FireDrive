import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleLogout} from "../../../redux/authSlice";
import {BiLogOut} from "react-icons/bi";
import ThemeBtn from "../../common/theme/ThemeBtn";

const LogOutContainer = () => {

    const dispatch = useDispatch()
    const smallScreen = useSelector(state => state.app.smallScreen)
    const handleClick = () => dispatch(handleLogout())

    return <ThemeBtn
        fullWidth
        onClick={handleClick}>{smallScreen ? <BiLogOut/> : 'Logout'}</ThemeBtn>
};

export default LogOutContainer;
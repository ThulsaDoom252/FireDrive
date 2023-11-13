import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleLogout} from "../../../redux/authSlice";
import {BiLogOut} from "react-icons/bi";
import ThemeBtn from "../../common/theme/ThemeBtn";
import {burgerMenuIconSize} from '../../../common/common';

const LogOutContainer = ({iconSize = burgerMenuIconSize}) => {

    const dispatch = useDispatch()
    const smallScreen = useSelector(state => state.app.smallScreen)
    const handleClick = () => dispatch(handleLogout())

    return <ThemeBtn
        fullWidth
        onClick={handleClick}>{smallScreen ? <BiLogOut size={iconSize}/> : 'Logout'}</ThemeBtn>
};

export default LogOutContainer;
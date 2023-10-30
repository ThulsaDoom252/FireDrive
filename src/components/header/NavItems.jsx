import React from 'react';
import {audioRoute, imagesRoute, rootRoute, videosRoute} from "../../common/common";
import {AiFillPicture, AiOutlineHome} from "react-icons/ai";
import {RiMovieLine} from "react-icons/ri";
import {BiMusic, BiSearch} from "react-icons/bi";
import {connect} from "react-redux";
import FittedThemeBtn from "../common/theme/FittedThemeBtn";
import {NavLink} from 'react-router-dom';
import {useStyles} from '../mui/styles';
import {ButtonBase} from '@mui/material';


const NavItems = ({
                      smallScreen,
                      isSearchBtnDisabled,
                      currentTheme,
                      toggleSearch,
                  }) => {

    const navItemsList = [
        {path: rootRoute, icon: <AiOutlineHome size={25}/>, label: 'Home'},
        {path: imagesRoute, icon: <AiFillPicture size={25}/>, label: 'Images'},
        {path: videosRoute, icon: <RiMovieLine size={25}/>, label: 'Video'},
        {path: audioRoute, icon: <BiMusic size={25}/>, label: 'Music'},
    ]

    const handleMobileSearch = () => {
        toggleSearch(true)
    }

    const classes = useStyles({navColor: currentTheme.color, navActiveColor: currentTheme.navColor})

    return (
        <>
            {navItemsList.map((navItem, index) =>
                <NavLink to={navItem.path} className={classes.link}>
                    <ButtonBase>
                        {smallScreen ?
                            navItem.icon : navItem.label}
                    </ButtonBase>
                </NavLink>
            )}
            <FittedThemeBtn onClick={handleMobileSearch} isDisabled={isSearchBtnDisabled}>
                <BiSearch size={24}/>
            </FittedThemeBtn>
        </>
    )
        ;
};


const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}


export default connect(mapStateToProps, null)(NavItems);
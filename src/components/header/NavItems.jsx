import React from 'react';
import {audioRoute, imagesRoute, rootRoute, videosRoute} from "../../common/commonData";
import {AiFillPicture, AiOutlineHome} from "react-icons/ai";
import {RiMovieLine} from "react-icons/ri";
import {BiMusic, BiSearch} from "react-icons/bi";
import {connect, useSelector} from "react-redux";
import IconButton from '@mui/material/IconButton';
import FittedThemeBtn from "../../common/FittedThemeBtn";


const NavItems = ({
                      smallScreen,
                      isSearchBtnDisabled,
                      currentTheme,
                      toggleMobileSearch,
                      handleRoute,
                      currentRoute,
                  }) => {

    const navItemsList = [
        {path: rootRoute, icon: <AiOutlineHome size={25}/>, label: 'Home'},
        {path: imagesRoute, icon: <AiFillPicture size={25}/>, label: 'Images'},
        {path: videosRoute, icon: <RiMovieLine size={25}/>, label: 'Video'},
        {path: audioRoute, icon: <BiMusic size={25}/>, label: 'Music'},
    ]
    const handleMobileSearch = () => {
        toggleMobileSearch(true)
    }

    return (
        <>
            {navItemsList.map((navItem, index) =>
                <FittedThemeBtn
                    navButton
                    onClick={() => handleRoute(navItem.path)}
                    isActive={currentRoute === navItem.path}>
                    {smallScreen ?
                        navItem.icon : navItem.label}
                </FittedThemeBtn>
            )}
            {smallScreen && <IconButton
                onClick={handleMobileSearch}
                disabled={isSearchBtnDisabled}
                className={`
            ${isSearchBtnDisabled ? `text-gray-400` : currentTheme.color}
            `}>
                <BiSearch size={24}/></IconButton>}
        </>
    );
};


const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}


export default connect(mapStateToProps, null)(NavItems);
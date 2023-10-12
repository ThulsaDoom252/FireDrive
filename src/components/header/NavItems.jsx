import React from 'react';
import {NavLink} from "react-router-dom";
import {audioRoute, imagesRoute, rootRoute, videosRoute} from "../../common/commonData";
import {AiFillPicture, AiOutlineHome} from "react-icons/ai";
import {RiMovieLine} from "react-icons/ri";
import {BiMusic, BiSearch} from "react-icons/bi";
import {connect} from "react-redux";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';


const NavItems = ({
                      smallScreen,
                      isSearchBtnDisabled,
                      currentTheme,
                      toggleMobileSearch,
                  }) => {
    const isActiveStyle = `${smallScreen && 'text-2xl'}  transition-all duration-300 text-white transition-transform duration-300`;
    const inactiveStyle = `${smallScreen && 'text-2xl'} transition-all duration-300 ${currentTheme.color}  no-underline !important hover:text-white '}`;

    const navItemsList = [
        {path: rootRoute, icon: <AiOutlineHome/>, label: 'Home'},
        {path: imagesRoute, icon: <AiFillPicture/>, label: 'Images'},
        {path: videosRoute, icon: <RiMovieLine/>, label: 'Video'},
        {path: audioRoute, icon: <BiMusic/>, label: 'Music'},
    ]
    const handleMobileSearch = () => {
        toggleMobileSearch(true)
    }

    return (
        <>
            {navItemsList.map((navItem, index) =>   <Button>
                <NavLink to={navItem.path}
                         className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>
                    {smallScreen ?
                        navItem.icon : navItem.label}

                </NavLink>
            </Button>)}
            {smallScreen && <IconButton
                onClick={handleMobileSearch}
                disabled={isSearchBtnDisabled}
                className={`
            ${isSearchBtnDisabled ? `text-gray-400` : currentTheme.color}
            `

                }>
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
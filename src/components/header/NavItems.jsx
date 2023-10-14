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
        {path: rootRoute, icon: <AiOutlineHome size={25}/>, label: 'Home'},
        {path: imagesRoute, icon: <AiFillPicture size={25}/>, label: 'Images'},
        {path: videosRoute, icon: <RiMovieLine size={25}/>, label: 'Video'},
        {path: audioRoute, icon: <BiMusic size={25}/>, label: 'Music'},
    ]
    const handleMobileSearch = () => {
        toggleMobileSearch(true)
    }

    const commonNavClass = {
        maxWidth: 'fit-content',
        minWidth: 'fit-content',
        minHeight: 'fit-content',
        maxHeight: 'fit-content'
    }

    return (
        <>
            {navItemsList.map((navItem, index) =>
                <NavLink to={navItem.path}
                         className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>
                    <Button sx={commonNavClass}>
                        {smallScreen ?
                            navItem.icon : navItem.label}
                    </Button>
                </NavLink>
            )}
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
import React from 'react';
import {NavLink} from "react-router-dom";
import {audioRoute, imagesRoute, rootRoute, videosRoute} from "../../common/commonData";
import {AiFillPicture, AiOutlineHome} from "react-icons/ai";
import {RiMovieLine} from "react-icons/ri";
import {BiMusic, BiSearch} from "react-icons/bi";
import {connect} from "react-redux";


const NavItems = ({
                      smallScreen,
                      isSearchBtnDisabled,
                      currentTheme,
                      toggleMobileSearch,
                  }) => {
    const isActiveStyle = `${smallScreen && 'text-2xl'} mr-5 text-white transition-transform duration-300`;
    const inactiveStyle = `${smallScreen && 'text-2xl'}  ${currentTheme.color} mr-5 no-underline !important hover:text-white transition-all duration-300'}`;

    const handleMobileSearch = () => {
        debugger
        toggleMobileSearch(true)
    }

    return (
        <>
            <NavLink to={rootRoute}
                     className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>{smallScreen ?
                <AiOutlineHome/> : 'Home'}</NavLink>
            <NavLink to={imagesRoute}
                     className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>{smallScreen ?
                <AiFillPicture/> : 'Images'}</NavLink>
            <NavLink to={videosRoute}
                     className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>{smallScreen ?
                <RiMovieLine/> : 'Videos'}</NavLink>
            <NavLink to={audioRoute}
                     className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>{smallScreen ?
                <BiMusic/> : 'Audio'}</NavLink>
            {smallScreen && <button
                onClick={handleMobileSearch}
                disabled={isSearchBtnDisabled}
                className={`
            ${isSearchBtnDisabled ? `text-gray-400` : currentTheme.color}
            `

                }>
                <BiSearch size={24}/></button>}

        </>
    );
};


const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}


export default connect(mapStateToProps, null)(NavItems);
import React from 'react';
import {NavLink} from "react-router-dom";
import {audioRoute, imagesRoute, rootRoute, videosRoute} from "../../common/commonData";
import {AiFillPicture, AiOutlineHome} from "react-icons/ai";
import {RiMovieLine} from "react-icons/ri";
import {BiMusic} from "react-icons/bi";
import MobileMenu from "../common/MobileMenu";
import {connect} from "react-redux";

const NavItems = ({smallScreen}) => {
    const isActiveStyle = `${smallScreen ? 'mr-5 text-white text-2xl' : 'text-base mr-5 text-white'}`;
    const inactiveStyle = `${smallScreen ? 'mr-5 text-2xl' : 'mr-5 text-base'}`;
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
            {smallScreen && <MobileMenu opacity={60} zIndex={50}/>}
        </>
    );
};


const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}


export default connect(mapStateToProps, null)(NavItems);
import React from 'react';
import {NavLink} from "react-router-dom";
import {audioRoute, imagesRoute, rootRoute, videosRoute} from "../../common/commonData";
import {AiFillPicture, AiOutlineHome} from "react-icons/ai";
import {RiMovieLine} from "react-icons/ri";
import {BiMusic} from "react-icons/bi";
import {connect} from "react-redux";

const NavItems = ({smallScreen}) => {
    const isActiveStyle = `${smallScreen && 'text-2xl'} mr-5 text-white`;
    const inactiveStyle = `${smallScreen && 'text-2xl'} mr-5 text-gray-500 no-underline !important'}`;
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
        </>
    );
};


const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}


export default connect(mapStateToProps, null)(NavItems);
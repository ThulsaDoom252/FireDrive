import React from 'react';
import {NavLink} from "react-router-dom";
import {
    audioRoute,
    imagesRoute,
    rootRoute,
    videosRoute
} from "../../common/commonData";
import RemoveAllBtn from "../common/RemoveAllBtn";
import UploadBtn from "../common/UploadBtn";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import {AiFillPicture, AiOutlineCamera, AiOutlineHome, AiOutlineMenu, AiOutlineSound} from "react-icons/ai";
import MusicPlayer from "./MusicPlayer";
import {useSelector} from "react-redux";
import MobileMenu from "../common/MobileMenu";
import {BiMusic} from "react-icons/bi";
import {RiMovieLine} from "react-icons/ri";

const Header = ({currentRoute, tinyScreen}) => {
    const homePage = currentRoute === rootRoute
    const smallScreen = useSelector(state => state.app.smallScreen)

    const isActiveStyle = `${smallScreen ? 'mr-5 text-white text-2xl' : 'text-base mr-5 text-white'}`;
    const inactiveStyle = `${smallScreen ? 'mr-5 text-2xl' : 'mr-5 text-base'}`;

    return (
        <header
            className={`${smallScreen ? 'bottom-0 h-14' : 'top-0'} flex justify-between absolute  w-full h-16 pr-10 pl-10 bg-gradient-to-r from-sky-500 to-indigo-500 items-center`}>
            <div className={`${smallScreen ? 'w-full' : 'w-10'} flex justify-between`}>
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
            </div>
            <div
                className={`${smallScreen ? 'fixed left-0 right-0 bottom-14  h-14 bg-blue-50 bg-opacity-70' : 'relative left-24  bg-gradient-to-r from-purple-500 to-indigo-500 custom-800:w-150 h-12 lg:w-300'}`}>
                <MusicPlayer/>
            </div>

            {!smallScreen && <div className={'flex'}>
                <div className={'mr-5'}>
                    <UploadBtn/>
                </div>
                <RemoveAllBtn/>
            </div>}
        </header>
    );
};


export default Header
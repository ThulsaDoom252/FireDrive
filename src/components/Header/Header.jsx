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

const Header = ({currentRoute, tinyScreen}) => {
    const isActiveStyle = 'mr-5 text-white text-2xl navbar-xs:text-base';
    const inactiveStyle = 'mr-5 text-2xl navbar-xs:text-base';
    const homePage = currentRoute === rootRoute

    return (
        <header
            className={'flex justify-between h-16 pr-10 pl-10 bg-gradient-to-r from-sky-500 to-indigo-500 items-center '}>
            <div className='flex justify-between w-10'>
                <NavLink to={rootRoute}
                         className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>{tinyScreen ?
                    <AiOutlineHome/> : 'Home'}</NavLink>
                <NavLink to={imagesRoute}
                         className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>{tinyScreen ?
                    <AiFillPicture/> : 'Images'}</NavLink>
                <NavLink to={videosRoute}
                         className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>{tinyScreen ?
                    <AiOutlineCamera/> : 'Videos'}</NavLink>
                <NavLink to={audioRoute}
                         className={navData => navData.isActive ? isActiveStyle : inactiveStyle}>{tinyScreen ?
                    <AiOutlineSound/> : 'Audio'}</NavLink>
            </div>
            <div className={'hidden header-xs:flex'}>
                <div className={'mr-5'}>
                    <UploadBtn/>
                </div>
                <RemoveAllBtn/>
            </div>
            {!homePage && <div className={'block header-xs:hidden'}>
                <ContextMenuTrigger mouseButton={0} id="header-mobile-menu">
                    <AiOutlineMenu className={'text-xl'}/>
                </ContextMenuTrigger>
                <ContextMenu className="flex flex-col items-center justify-center bg-opacity-30
                bg-blue-700 w-20 p-5 rounded"
                             id="header-mobile-menu">
                    <MenuItem divider/>
                    <div className={'mb-5'}>
                        <UploadBtn/>
                    </div>
                    <MenuItem divider/>
                    <RemoveAllBtn/>
                    <MenuItem divider/>
                </ContextMenu>
            </div>}
        </header>
    );
};


export default Header
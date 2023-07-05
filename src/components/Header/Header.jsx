import React from 'react';
import MusicPlayer from "../AudioPlayer/AudioPlayer";
import {useSelector} from "react-redux";
import BurgerMenuTrigger from "../common/BurgerMenuTrigger";
import NavItems from "./NavItems";

const Header = () => {
    const smallScreen = useSelector(state => state.app.smallScreen)

    return (
        <header
            className={`${smallScreen ? 'bottom-0 h-14' : 'top-0 h-16'}  flex justify-between w-full pr-10 pl-10 bg-gradient-to-r from-sky-500 to-indigo-500 items-center relative`}>
            <div className={`${smallScreen ? 'w-full' : 'w-10'} flex justify-between`}>
                <NavItems/>
            </div>
            <div
                className={`${smallScreen ? 'fixed left-0 right-0 bottom-custom-57  h-14 bg-blue-50 bg-opacity-70' : 'relative left-24  bg-gradient-to-r from-purple-500 to-indigo-500 custom-800:w-150 h-12 lg:w-300'}`}>
                <MusicPlayer/>
            </div>
            <BurgerMenuTrigger/>
        </header>
    );
};


export default Header
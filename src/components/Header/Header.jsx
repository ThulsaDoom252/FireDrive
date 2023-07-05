import React from 'react';
import MusicPlayer from "../AudioPlayer/AudioPlayer";
import {useSelector} from "react-redux";
import BurgerMenuTrigger from "../common/BurgerMenuTrigger";
import NavItems from "./NavItems";

const Header = () => {
    const smallScreen = useSelector(state => state.app.smallScreen)
    return (
        <header
            className={`${smallScreen ? 'p-4' : ' pr-10  pl-10'}  h-16 flex w-full  justify-between  bg-gradient-to-r 
            from-sky-500 to-indigo-500 items-center relative`}>
            <div className={`${smallScreen ? 'w-11/12' : 'w-10'} flex justify-between`}>
                <NavItems/>
            </div>
            {/*<div*/}
            {/*    className={`${smallScreen ? 'mr-auto  border-r-2 h-10 bg-blue-50 bg-opacity-70' : */}
            {/*        'bg-gradient-to-r from-purple-500 to-indigo-500} relative left-24   custom-800:w-150 h-12 lg:w-300'}`}>*/}
            {/*    <MusicPlayer/>*/}
            {/*</div>*/}
            <BurgerMenuTrigger/>
        </header>
    );
};


export default Header
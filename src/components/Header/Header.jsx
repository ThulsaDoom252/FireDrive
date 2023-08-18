import React from 'react';
import {useSelector} from "react-redux";
import BurgerMenuTrigger from "../common/BurgerMenuTrigger";
import NavItems from "./NavItems";

const Header = () => {
    const smallScreen = useSelector(state => state.app.smallScreen)
    return (
        <header
            className={`${smallScreen ? 'p-4' : ' pr-10  pl-10'}  h-16 flex w-full  justify-between  bg-gradient-to-r 
            from-sky-500 to-indigo-500 items-center  z-10`}>
            <div className={`${smallScreen ? 'w-11/12' : 'w-10'} flex justify-between`}>
                <NavItems/>
            </div>
            <BurgerMenuTrigger/>
        </header>
    );
};


export default Header
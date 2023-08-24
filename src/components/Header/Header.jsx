import React from 'react';
import {useSelector} from "react-redux";
import BurgerMenuTrigger from "../common/BurgerMenuTrigger";
import NavItems from "./NavItems";
import Search from "../Search/Search";

const Header = ({
                    currentTheme,
                    searchRequest,
                    setSearchRequest,
                    rootPage,
                    toggleMobileSearch,
                    showMobileSearch,
                }) => {
    const smallScreen = useSelector(state => state.app.smallScreen)

    return (
        <header
            className={`
            flex 
            pl-3
            pr-3
            pb-1
            pt-1
            w-full  
            justify-between
            items-center  
            fixed
            z-1
            ${currentTheme.primeBg}
            
             ${smallScreen ? 'p-4' : ' pr-10  pl-10'}            
            `}>
            <div className={`${smallScreen ? 'w-11/12' : 'w-full'} flex justify-center items-center`}>
                {!showMobileSearch && <div className={`
                ${smallScreen ? 'w-full' : 'w-300'} 
                flex 
                justify-between 
                mr-10`}>
                    <NavItems
                        toggleMobileSearch={toggleMobileSearch}
                        isSearchBtnDisabled={rootPage}
                        currentTheme={currentTheme}
                    />
                </div>}

                <div className={'w-300'} hidden={smallScreen && !showMobileSearch}>
                    <div
                        className={'w-full'}>
                        <Search
                            searchRequest={searchRequest}
                            isDisabled={rootPage}
                            setSearchRequest={setSearchRequest}/></div>
                </div>


            </div>
            <BurgerMenuTrigger/>
        </header>
    );
};


export default Header
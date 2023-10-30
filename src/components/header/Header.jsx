import React from 'react';
import BurgerMenuTrigger from "../BurgerMenu/BurgerMenuTrigger";
import NavItems from "./NavItems";
import Search from "../search/Search";
import ThemeContainer from "../common/theme/ThemeContainer";

const Header = ({
                    currentTheme,
                    searchRequest,
                    setSearchRequest,
                    toggleSearch,
                    isSearchVisible,
                    isSearchBtnDisabled,
                    currentRoute,
                    smallScreen,
                    hideSearch,
                }) => {

    return (
        <header>
            <ThemeContainer className={`
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
                    {!isSearchVisible && <div className={`
                ${smallScreen ? 'w-full' : 'w-300'} 
                flex 
                justify-between 
                mr-10`}>
                        <NavItems
                            currentRoute={currentRoute}
                            toggleSearch={toggleSearch}
                            isSearchBtnDisabled={isSearchBtnDisabled}
                            currentTheme={currentTheme}
                        />
                    </div>}
                    <div hidden={!isSearchVisible} className={'w-full'}>
                        <Search
                            hideSearch={hideSearch}
                            searchRequest={searchRequest}
                            isDisabled={isSearchBtnDisabled}
                            setSearchRequest={setSearchRequest}
                        /></div>
                </div>
                <BurgerMenuTrigger hideSearch={hideSearch}/>
            </ThemeContainer>
        </header>
    );
};


export default Header
import React from 'react';
import BurgerMenuWrapper from "./BurgerMenuWrapper";
import userModal from "../modals/UserModal";
import UserAvatar from "../user/UserAvatar";
import UploadContainer from "../btns/UploadBtnContainer";
import RemoveAllBtnContainer from "../btns/RemoveAllBtnContainer";
import DropDownMenu from "./DropDownMenu";
import {BiColorFill} from "react-icons/bi";
import AdaptiveImage from "../AdaptiveImage";
import {dayTheme, desertTheme, nightTheme} from "../../common/themes";
import DAS from "../../images/themeTypes/DAS.jpg";
import NS from "../../images/themeTypes/NS.jpg";
import DS from "../../images/themeTypes/DS.jpg";
import {CiSettings} from "react-icons/ci";
import LogOutContainer from "../btns/LogOutContainer";
import SortInput from "./SortInput";

const BurgerMenu = ({
                        smallScreen,
                        hideMobileSearch,
                        setModalType,
                        isMediaLoading,
                        uploadProgress,
                        totalUploadedBytes,
                        totalBytesToUpload,
                        confirm,
                        isThemeBlockOpened,
                        setIsThemeBlockOpened,
                        currentThemeName,
                        toggleCurrentTheme,
                        isSettingsBlockOpened,
                        setIsSettingsBlockOpened,
                        handleListMode,
                        isPaginatorEnabled,
                        itemsPerPage,
                        setItemsPerPage
                    }) => {
    return (
        <BurgerMenuWrapper smallScreen={smallScreen} onClick={hideMobileSearch}>
            <div className={'mt-5 flex flex-col justify-center'}>
                <div onClick={() => setModalType(userModal)} className={'mb-5 mx-auto'}><UserAvatar
                /></div>


                <div className={'w-full flex justify-center items-center flex-col'}>
                    {isMediaLoading &&
                        <>
                            <div>{uploadProgress}</div>
                            <input type={'range'}
                                   value={totalUploadedBytes}
                                   min={0}
                                   max={totalBytesToUpload}/>
                        </>
                    }
                </div>
                <div className={'flex justify-between items-center mb-2'}>
                    <div className={'mx-auto w-40%'}><UploadContainer/></div>
                    <div className={'mx-auto w-40%'}><RemoveAllBtnContainer confirm={confirm}/></div>
                </div>
                <div className={'bg-gray-100 h-0.5 rounded w-full'}/>

                <div className='mt-3 mb-3'>
                    <DropDownMenu menuType={isThemeBlockOpened} toggleMenu={setIsThemeBlockOpened}
                                  btnLabel={'Change theme'} smallScreenIcon={<BiColorFill/>}>
                        <AdaptiveImage
                            currentThemeName={currentThemeName}
                            theme={dayTheme}
                            url={DAS}
                            onClick={() => toggleCurrentTheme({type: dayTheme})}/>
                        <AdaptiveImage
                            currentThemeName={currentThemeName}
                            theme={nightTheme}
                            url={NS}
                            onClick={() => toggleCurrentTheme({type: nightTheme})}/>
                        <AdaptiveImage
                            currentThemeName={currentThemeName}
                            theme={desertTheme}
                            url={DS}
                            onClick={() => toggleCurrentTheme({type: desertTheme})}/>
                    </DropDownMenu>
                    <div className={'mt-3'}>
                        <DropDownMenu
                            menuType={isSettingsBlockOpened} toggleMenu={setIsSettingsBlockOpened}
                            btnLabel={'Settings'} smallScreenIcon={<CiSettings/>}>
                            <div className={'bg-gray-600 bg-opacity-50 w-full flex flex-col'}>
                                <div className={`
                                        w-full 
                                        flex 
                                        justify-between 
                                        items-center 
                                        mb-4 
                                        mt-4
                                        ${smallScreen ? 'flex-col' : ''}
                                        `}>
                                    <div className={'text-gray-400'}>List mode</div>
                                    <div
                                        className={'cursor-pointer'}
                                        onClick={handleListMode}>{isPaginatorEnabled ? 'Pagination' : 'Lazy'}</div>
                                </div>
                                <div className={`
                                        w-full 
                                        flex 
                                        justify-between 
                                        items-center 
                                        mb-4 
                                        mt-4
                                        ${smallScreen ? 'flex-col' : ''}
                                        `}>
                                    <div className={'text-gray-400 text-center'}>Items per page</div>
                                    <div className={`flex 
                                            flex-col 
                                            justify-center 
                                            items-center`}>
                                        <div className={'text-white'}>{itemsPerPage}</div>
                                        <input type={'range'} value={itemsPerPage} min={5} max={100}
                                               onChange={(e) =>
                                                   setItemsPerPage(e.currentTarget.value)}/>
                                    </div>
                                </div>
                                <div className={`
                                        w-full 
                                        flex 
                                        justify-between 
                                        items-center 
                                        mb-4 
                                        mt-4
                                        ${smallScreen ? 'flex-col' : ''}
                                        `}>
                                    <div className={'text-gray-400'}>Animations</div>
                                    <div>On</div>
                                </div>
                            </div>
                        </DropDownMenu>
                    </div>

                </div>
                <div className={'mb-5 '}><LogOutContainer/></div>
            </div>
            <div><SortInput/></div>
        </BurgerMenuWrapper>
    );
};

export default BurgerMenu;
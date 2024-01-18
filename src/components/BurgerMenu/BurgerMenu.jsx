import React from 'react';
import BurgerMenuWrapper from "./BurgerMenuWrapper";
import UserAvatar from "../user/UserAvatar";
import UploadContainer from "./Btns/UploadBtnContainer";
import RemoveAllBtnContainer from "./Btns/RemoveAllBtnContainer";
import LogOutContainer from "./Btns/LogOutContainer";
import SortInput from "../common/SortInput";
import ThemeDropDown from './DropDowns/ThemeDropDown';
import SettingsDropDown from './DropDowns/SettingsDropDown';
import ThemedSlider from '../common/theme/ThemedSlider';
import {Box} from '@mui/material';
import {userModal} from '../../common/common';
import LayoutDropDown from './DropDowns/LayoutDropDown';

const BurgerMenu = ({
                        smallScreen,
                        hideSearch,
                        setModalType,
                        isMediaLoading,
                        uploadProgress,
                        totalUploadedBytes,
                        totalBytesToUpload,
                        handleCurrentModal,
                        confirm,
                        currentTheme,
                        currentThemeName,
                        handleListMode,
                        isPaginatorEnabled,
                        itemsPerPage,
                        setItemsPerPage,
                        gridLayoutItemsArr,
                        gridLayoutIndex,
                        handleCollValue,
                        audioPage,
                    }) => {

    return (
        <BurgerMenuWrapper smallScreen={smallScreen} onClick={hideSearch}>
            <div className={'mt-5 flex flex-col justify-center'}>
                <div onClick={() => handleCurrentModal({modalType: userModal})} className={'mb-5 mx-auto'}><UserAvatar
                /></div>
                <Box margin={1}>
                    <ThemedSlider
                        value={totalUploadedBytes}
                        max={totalBytesToUpload}
                        show={isMediaLoading}
                        valueToDisplay={uploadProgress}/>
                </Box>
                <div className={`flex justify-between items-center mb-2 w-full ${smallScreen && 'flex-col'}`}>
                    <div className={'m-1 w-1/2 '}><UploadContainer/></div>
                    <div className={'m-1 w-1/2'}><RemoveAllBtnContainer confirm={confirm}/></div>
                </div>
                <div className={'bg-gray-100 h-0.5 rounded w-full'}/>
                <div className='mt-3'>
                    <LayoutDropDown isDisabled={audioPage}
                                    {...{
                        currentTheme,
                        gridLayoutItemsArr,
                        gridLayoutIndex,
                        handleCollValue
                    }}/>
                </div>
                <div className='mt-3 mb-3'>
                    <ThemeDropDown {...{currentThemeName}}/>
                    <div className={'mt-3'}>
                        <SettingsDropDown {...{handleListMode, isPaginatorEnabled, itemsPerPage, setItemsPerPage,}}/>
                    </div>
                </div>
                <div className={'mb-5 '}><LogOutContainer/></div>
            </div>
            <Box><SortInput/></Box>
        </BurgerMenuWrapper>
    );
};

export default BurgerMenu;
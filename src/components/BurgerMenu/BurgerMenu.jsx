import React from 'react';
import BurgerMenuWrapper from "./BurgerMenuWrapper";
import userModal from "../modals/UserModal";
import UserAvatar from "../user/UserAvatar";
import UploadContainer from "./Btns/UploadBtnContainer";
import RemoveAllBtnContainer from "./Btns/RemoveAllBtnContainer";
import LogOutContainer from "./Btns/LogOutContainer";
import SortInput from "../common/SortInput";
import UploadingProgress from './UploadingProgress';
import ThemeDropDown from './DropDowns/ThemeDropDown';
import SettingsDropDown from './DropDowns/SettingsDropDown';

const BurgerMenu = ({
                        smallScreen,
                        hideMobileSearch,
                        setModalType,
                        isMediaLoading,
                        uploadProgress,
                        totalUploadedBytes,
                        totalBytesToUpload,
                        confirm,
                        currentThemeName,
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
                <UploadingProgress {...{isMediaLoading, uploadProgress, totalUploadedBytes, totalBytesToUpload}}/>
                <div className={`flex justify-between items-center mb-2 w-full ${smallScreen && 'flex-col'}`}>
                    <div className={'m-1 w-1/2 '}><UploadContainer/></div>
                    <div className={'m-1 w-1/2'}><RemoveAllBtnContainer confirm={confirm}/></div>
                </div>
                <div className={'bg-gray-100 h-0.5 rounded w-full'}/>
                <div className='mt-3 mb-3'>
                    <ThemeDropDown {...{currentThemeName}}/>
                    <div className={'mt-3'}>
                        <SettingsDropDown {...{handleListMode, isPaginatorEnabled, itemsPerPage, setItemsPerPage,}}/>
                    </div>
                </div>
                <div className={'mb-5 '}><LogOutContainer/></div>
            </div>
            <div><SortInput/></div>
        </BurgerMenuWrapper>
    );
};

export default BurgerMenu;
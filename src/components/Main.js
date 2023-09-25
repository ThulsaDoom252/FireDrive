import React, {useContext, useEffect, useState} from 'react';
import HeaderContainer from "./header/HeaderContainer";
import {
    imageModal, lazyMode,
    mainContentId,
    mediaTypes, paginateMode, renameModal, rootRoute, shareModal,
    signInRoute,
    videoModal,
} from "../common/commonData";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {
    listMedia,
    setCurrentRoute, toggleMobileSearch,
} from "../redux/mediaSlice";
import MediaContainer from "./media/MediaContainer";
import {
    handleAlertAction,
    setItemModalType, setModalType, toggleCurrentTheme, toggleListMode,
} from "../redux/appSlice";
import BurgerMenu from "./common/BurgerMenu";
import SortInput from "./common/SortInput";
import AudioPlayer from "./audioPlayer/AudioPlayer";
import {PaginatorContext} from "../context/PaginatorContext";
import UploadContainer from "./btns/UploadBtnContainer";
import RemoveAllBtnContainer from "./btns/RemoveAllBtnContainer";
import UserModal from "./modals/UserModal";
import UserAvatar from "./user/UserAvatar";
import RenameModal from "./modals/RenameModal";
import AlertModal from "./modals/AlertModal";
import ImageModal from "./modals/ImageModal";
import VideoModal from "./videoModal/VideoModal";
import ShareModal from "./modals/ShareModal";
import alertModal from "./modals/AlertModal";
import userModal from "./modals/UserModal";
import {BiColorFill} from "react-icons/bi";
import LogOutContainer from "./btns/LogOutContainer";
import DAS from '../images/themeTypes/DAS.jpg'
import DS from '../images/themeTypes/DS.jpg'
import NS from '../images/themeTypes/NS.jpg'
import AdaptiveImage from "./AdaptiveImage";
import {dayTheme, desertTheme, nightTheme} from "../common/themes";
import DropDownMenu from "./common/DropDownMenu";
import Home from "./home/Home";
import {CiSettings} from "react-icons/ci";
import ImageModalContainer from "./modals/ImageModalContainer";
import MobileVideoMenu from "./videoModal/MobileVideoMenu";

const Main = ({
                  currentMediaSet,
                  currentRoute,
                  listMedia,
                  toggleSmallScreen,
                  isAuth,
                  setCurrentRoute,
                  smallScreen,
                  searchMode,
                  searchResults,
                  currentModalItemUrl,
                  modalType,
                  itemModalType,
                  setModalType,
                  setItemModalType,
                  handleAlertAction,
                  currentTheme,
                  toggleCurrentTheme,
                  showMobileSearch,
                  toggleMobileSearch,
                  currentThemeName,
                  listMode,
                  toggleListMode,
              }) => {

    const location = useLocation()
    const pathName = location.pathname
    const homePage = pathName === rootRoute
    const isPaginatorEnabled = listMode === paginateMode

    const paginatorContext = useContext(PaginatorContext)
    const {firstItemIndex, lastItemIndex, setItemsPerPage, itemsPerPage} = paginatorContext
    const handleListMode = () => {
        if (listMode === lazyMode) {
            toggleListMode(paginateMode)
        } else {
            toggleListMode(lazyMode)
        }
    }

    useEffect(() => {
        setCurrentRoute(pathName)
    }, [pathName])


    useEffect(() => {
        mediaTypes.forEach(mediaType =>
            listMedia({mediaType}))
    }, [])


    const hideMobileSearch = () => {
        showMobileSearch && toggleMobileSearch(false)
    }


    const [isThemeBlockOpened, setIsThemeBlockOpened] = useState(false)
    const [isSettingsBlockOpened, setIsSettingsBlockOpened] = useState(false)

    const paginatedMedia = currentMediaSet.slice(firstItemIndex, lastItemIndex)
    const mediaToShow = searchMode ? searchResults : listMode === paginateMode ? paginatedMedia : currentMediaSet


    if (!isAuth) {
        return <Navigate to={signInRoute}/>
    }

    return (
        <>
            <AlertModal toggleModal={setModalType}
                        showAlertModal={modalType === alertModal}
                        handleAlertAction={handleAlertAction}
            />
            <div className={'relative bottom-20 z-max'}>
                <MobileVideoMenu/>
            </div>
            <RenameModal toggleModal={setModalType} showModal={modalType === renameModal}/>
            <ShareModal toggleModal={setModalType} showModal={modalType === shareModal}/>
            <VideoModal
                toggleModal={setItemModalType}
                showModal={itemModalType === videoModal}/>
            <ImageModalContainer toggleModal={setItemModalType} showModal={itemModalType === imageModal}
            />
            <UserModal toggleModal={setModalType}
                       showModal={modalType === userModal}/>
            <HeaderContainer
                currentTheme={currentTheme}
                showMobileSearch={showMobileSearch}
                toggleMobileSearch={toggleMobileSearch}
            />
            <main className={'w-full h-full overflow-y-scroll'} id={mainContentId} onClick={hideMobileSearch}>
                <BurgerMenu smallScreen={smallScreen} onClick={hideMobileSearch}>
                    <div className={'mt-5 flex flex-col justify-center'}>
                        <div onClick={() => setModalType(userModal)} className={'mb-5 mx-auto'}><UserAvatar
                        /></div>
                        <div className={'flex justify-between items-center mb-2'}>
                            <div className={'mx-auto w-40%'}><UploadContainer/></div>
                            <div className={'mx-auto w-40%'}><RemoveAllBtnContainer/></div>
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
                </BurgerMenu>
                {homePage && <Home
                    smallScreen={smallScreen}
                    currentTheme={currentTheme}/>}
                <Routes>
                    {!homePage && <Route path={currentRoute}
                                         element={<MediaContainer {...{
                                             currentRoute,
                                             currentMediaSet,
                                             mediaToShow,
                                             isPaginatorEnabled,
                                             searchMode,
                                             searchResults,
                                             smallScreen,
                                             currentTheme,
                                         }}/>}/>}
                </Routes>
                <div
                    className={`
                    w-full  
                    bg-opacity-90 
                     p-2 rounded 
                     relative 
                     flex
                     items-center
                     ${smallScreen ? 'h-mobilePlayerHeight' : 'h-playerHeight'}
                     ${currentTheme.primeBg}
                     ${itemModalType !== imageModal && itemModalType !== videoModal && 'fixed-bottom'

                    }`}>
                    <AudioPlayer currentTheme={currentTheme}
                                 smallScreenMode={smallScreen}
                    /></div>
            </main>
        </>

    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
        currentRoute: state.media.currentRoute,
        currentMediaSet: state.media.currentMediaSet,
        audioSet: state.media.audioSet,
        searchMode: state.media.searchMode,
        searchResults: state.media.searchResults,
        currentModalItemUrl: state.app.currentModalItemUrl,
        modalType: state.app.modalType,
        itemModalType: state.app.itemModalType,
        showMobileSearch: state.media.showMobileSearch,
        currentThemeName: state.app.currentThemeName,
        listMode: state.app.listMode,
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute,
    setModalType, setItemModalType, handleAlertAction,
    toggleCurrentTheme, toggleMobileSearch,
    toggleListMode,
})(Main);






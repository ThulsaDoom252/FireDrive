import React, {useContext, useEffect, useState} from 'react';
import HeaderContainer from "./header/HeaderContainer";
import {
    delay,
    imageModal, lazyMode,
    mainContentId,
    mediaTypes, noModal, paginateMode, renameModal, rootRoute, shareModal,
    signInRoute,
    videoModal,
} from "../common/commonData";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {
    handleMediaName,
    listMedia,
    setCurrentRoute, toggleMobileSearch,
} from "../redux/mediaSlice";
import MediaContainer from "./media/MediaContainer";
import {
    setItemModalType, setModalType, setMountedItemModal, setMountedModal, toggleCurrentTheme, toggleListMode,
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
import ShareModal from "./modals/ShareModal";
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
import MobileVideoMenu from "./modals/Video/MobileVideoMenu";
import VideoModalContainer from "./modals/Video/VideoModalContainer";
import useConfirm from "./hooks/useConfirm";
import {useStyles} from "./mui/styles";
import ProgressBar from 'react-bootstrap/ProgressBar';
import toast from "react-hot-toast";

const Main = ({
                  currentMediaSet,
                  currentRoute,
                  listMedia,
                  isAuth,
                  setCurrentRoute,
                  smallScreen,
                  searchMode,
                  searchResults,
                  modalType,
                  itemModalType,
                  setModalType,
                  setItemModalType,
                  currentTheme,
                  toggleCurrentTheme,
                  showMobileSearch,
                  toggleMobileSearch,
                  currentThemeName,
                  listMode,
                  toggleListMode,
                  alertTitle,
                  alertMessage,
                  mountedItemModal,
                  setMountedItemModal,
                  setMountedModal,
                  mountedModal,
                  handleMediaName,
                  uploadProgress,
                  totalUploadedBytes,
                  totalBytesToUpload,
                  isMediaLoading,
              }) => {

    const location = useLocation()
    const [isThemeBlockOpened, setIsThemeBlockOpened] = useState(false)
    const [isSettingsBlockOpened, setIsSettingsBlockOpened] = useState(false)
    const isVideoModalMounted = mountedItemModal === videoModal
    const isImageModalMounted = mountedItemModal === imageModal
    const isRenameModalMounted = mountedModal === renameModal
    const isShareModalMounted = mountedModal === shareModal
    const animateRenameModal = modalType === renameModal
    const animateImageModal = itemModalType === imageModal
    const animateVideoModal = itemModalType === videoModal
    const animateShareModal = modalType === shareModal

    const pathName = location.pathname
    const homePage = pathName === rootRoute
    const isPaginatorEnabled = listMode === paginateMode
    const noMedia = currentMediaSet.length === 0

    const [Dialog, confirm] = useConfirm(
        alertTitle,
        alertMessage,
    )

    const paginatorContext = useContext(PaginatorContext)
    const {firstItemIndex, lastItemIndex, setItemsPerPage, itemsPerPage} = paginatorContext
    const classes = useStyles()
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

    const nullMountedModal = async (time = 200) => {
        setModalType(noModal)
        await delay(time)
        setMountedModal(noModal)
    }

    const nullItemModal = async (time = 200) => {
        setItemModalType(noModal)
        await delay(200)
        setMountedItemModal(noModal)
    }

    const handleItemModal = async (modalType) => {
        if (modalType === imageModal) {
            if (!isImageModalMounted) {
                setMountedItemModal(imageModal)
                await delay(100)
                setItemModalType(imageModal)

            } else {

                nullItemModal().then(() => void 0)
            }
            return
        }

        if (modalType === videoModal) {

            if (!isVideoModalMounted) {

                setMountedItemModal(videoModal)
                await delay(100)
                setItemModalType(videoModal)
            } else {

                nullItemModal().then(() => void 0)
            }
        }
    }

    const handleModal = async ({modalType, name, oldName}) => {
        if (modalType === renameModal) {
            if (!isRenameModalMounted) {
                handleMediaName({name, oldName})
                await delay(100)
                setMountedModal(renameModal)
                await delay(100)
                setModalType(renameModal)
            } else {
                nullMountedModal().then(() => void 0)
            }
            return
        }

        if (modalType === shareModal) {
            if (!isShareModalMounted) {
                setMountedModal(shareModal)
                await delay(100)
                setModalType(shareModal)
            } else {
                nullMountedModal().then(() => void 0)
            }
        }
    }

    const paginatedMedia = currentMediaSet.slice(firstItemIndex, lastItemIndex)
    const mediaToShow = searchMode ? searchResults : listMode === paginateMode ? paginatedMedia : currentMediaSet


    if (!isAuth) {
        return <Navigate to={signInRoute}/>
    }

    return (
        <>
            <Dialog/>
            {/*<div className={'relative bottom-20 z-max'}>*/}
            {/*    <MobileVideoMenu/>*/}
            {/*</div>*/}
            {isRenameModalMounted &&
                <RenameModal toggleModal={handleModal} showModal={animateRenameModal}/>}
            {isShareModalMounted && <ShareModal toggleModal={handleModal} animateModal={animateShareModal}/>}
            {isVideoModalMounted && <VideoModalContainer
                handleCurrentModal={handleItemModal}
                toggleModal={handleModal}
                animateModal={animateVideoModal}
                confirm={confirm}
                classes={classes}
            />}

            {isImageModalMounted &&
                <ImageModalContainer toggleModal={setItemModalType} animateModal={animateImageModal}
                                     confirm={confirm} handleCurrentModal={handleItemModal} handleModal={handleModal}
                />}
            <UserModal toggleModal={setModalType}
                       showModal={modalType === userModal}/>
            <HeaderContainer
                currentTheme={currentTheme}
                showMobileSearch={showMobileSearch}
                toggleMobileSearch={toggleMobileSearch}
                noMedia={noMedia}
                classes={classes}
            />
            <main className={'w-full h-full overflow-y-scroll relative'} id={mainContentId} onClick={hideMobileSearch}>
                <BurgerMenu smallScreen={smallScreen} onClick={hideMobileSearch}>
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
                                             confirm,
                                             handleItemModal,
                                             handleModal,
                                             itemModalType,
                                             classes,
                                             noMedia,
                                         }}/>}/>}
                </Routes>
                <div
                    className={`
                    w-full  
                    bg-opacity-90 
                     p-2 rounded 
                  fixed bottom-0 left-0 right-0
                     flex
                     items-center
                     ${currentTheme.primeBg}

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
        modalType: state.app.modalType,
        itemModalType: state.app.itemModalType,
        showMobileSearch: state.media.showMobileSearch,
        currentThemeName: state.app.currentThemeName,
        listMode: state.app.listMode,
        alertMessage: state.app.alertMessage,
        alertTitle: state.app.alertTitle,
        mountedItemModal: state.app.mountedItemModal,
        mountedModal: state.app.mountedModal,
        uploadProgress: state.media.uploadProgress,
        totalUploadedBytes: state.media.totalUploadedBytes,
        totalBytesToUpload: state.media.totalBytesToUpload,
        isMediaLoading: state.media.mediaLoading,
    }
}

export default connect(mapStateToProps, {
    listMedia, setCurrentRoute,
    setModalType, setItemModalType,
    toggleCurrentTheme, toggleMobileSearch,
    toggleListMode, setMountedItemModal,
    setMountedModal, handleMediaName,
})(Main);






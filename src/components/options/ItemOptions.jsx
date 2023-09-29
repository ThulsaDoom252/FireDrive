import React, {useState} from 'react';
import {connect} from "react-redux";
import {deleteCurrentItem, handleMediaName} from "../../redux/mediaSlice";
import {BsDownload, BsPencilFill, BsThreeDots, BsTrash} from "react-icons/bs";
import {TelegramShareButton, ViberShareButton} from "react-share";
import {FaTelegram, FaViber} from "react-icons/fa";
import {handleAlertModal, setModalType} from "../../redux/appSlice";
import {
    delay,
    removeCurrentItemMsg,
    removeCurrentItemTitle,
    renameModal,
    stopPropagation
} from "../../common/commonData";
import MyCustomTransition from "../common/MyCustomTransition";


const ItemOptions = ({
                         handleMediaName,
                         hoveredMediaIndex,
                         deleteCurrentItem,
                         setModalType,
                         showIcons = true,
                         iconBgColor,
                         iconBgActiveColor,
                         displayInCol = false,
                         name,
                         oldName,
                         tgIconColor = 'rgb(77, 171, 247)',
                         vbIconColor = 'rgb(193, 122, 250)',
                         renameIconColor = 'blue',
                         deleteIconColor = 'red',
                         iconsSize = 20,
                         url, index, searchMode, currentRoute,
                         animate = true,
                         shouldAnimate,
                         initialMode = 'hide',
                         showBg = true,
                         setItemOptionsHovered,
                         handleAlertModal,
    confirm,
                     }) => {


    const [showOptions, setShowOptions] = useState(initialMode !== 'hide')


    const handleRenameModal = async () => {
        handleMediaName({name, oldName})
        await delay(50)
        setModalType(renameModal)
    }


    const handleMouseEnter = () => {
        index === hoveredMediaIndex && setShowOptions(true)
        setItemOptionsHovered(true)
    }

    const handleMouseLeave = () => {
        if (initialMode === 'hide') {
            setShowOptions(false)
            setItemOptionsHovered(false)
        }
    }


    const handleDeleteCurrentItem = async () => {
        await handleAlertModal({message: removeCurrentItemMsg, title: removeCurrentItemTitle})
        const userAction = await confirm()
        if (userAction) {
            deleteCurrentItem({url, index, searchMode, route: currentRoute})
        }



    }

    const iconBlockClass = `${iconBgColor ? ` 
    mx-1  
    bg-opacity-50 
    rounded md 
    h-8 
    w-8
    flex 
    justify-center 
    items-center 
    transition-all
    duration-500
    ${iconBgColor} 
    ${iconBgActiveColor}
    hover:cursor-pointer
    z-10
    `
        : void 0}`

    return (
        <div
            onClick={stopPropagation}
            className={`
             p-1 
             h-fit 
               flex 
               justify-center 
               items-center 
               rounded
                hover:cursor-pointer
             ${(showOptions && showBg) && 'bg-settingsBar'} 
           `}
            onMouseLeave={handleMouseLeave}>
            <MyCustomTransition shouldAnimate={shouldAnimate} show={showOptions}>
                <div className={`flex ${displayInCol && 'flex-col'}`}>
                    <div className={iconBlockClass}>
                        <TelegramShareButton
                            url={url}
                            title={''}>
                            {showIcons ?
                                <FaTelegram
                                    title={"share via telegram"}
                                    size={iconsSize}
                                    color={tgIconColor}/> : <p>Share via Telegram</p>}</TelegramShareButton>
                    </div>

                    <div className={iconBlockClass}>
                        <ViberShareButton url={url}>
                            {showIcons ?
                                <FaViber
                                    title={"share via viber"}
                                    size={iconsSize}
                                    color={vbIconColor}/> :
                                <p>Share via Viber</p>}


                        </ViberShareButton>
                    </div>
                    <div className={iconBlockClass} onClick={handleRenameModal}>
                        {showIcons ?
                            <BsPencilFill size={iconsSize}
                                          title={"edit current item name"}
                                          color={renameIconColor}/> : 'Rename item'}
                    </div>
                    <div className={iconBlockClass}
                         onClick={handleDeleteCurrentItem}>
                        {showIcons ?
                            < BsTrash title={'delete current item'} size={iconsSize}
                                      color={deleteIconColor}
                            /> : 'Delete Item'}
                    </div>
                    {/*<BsDownload className="text-gray-200" size={iconsSize}/>*/}

                </div>
            </MyCustomTransition>
            {initialMode === 'hide' &&
                <div onMouseEnter={handleMouseEnter} className={showOptions ? `text-black` : 'text-gray-500'}>
                    <BsThreeDots
                        size={25}/></div>}


        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute

    }
}


export default connect(mapStateToProps, {
    handleMediaName,
    setModalType,
    deleteCurrentItem,
    handleAlertModal
})(ItemOptions);
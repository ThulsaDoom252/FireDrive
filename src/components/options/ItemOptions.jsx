import React, {useState} from 'react';
import {connect} from "react-redux";
import {deleteCurrentItem} from "../../redux/mediaSlice";
import {BsDownload, BsPencilFill, BsThreeDots, BsTrash} from "react-icons/bs";
import {TelegramShareButton, ViberShareButton} from "react-share";
import {FaTelegram, FaViber} from "react-icons/fa";
import {handleAlertModal} from "../../redux/appSlice";
import {
    removeCurrentItemMsg,
    removeCurrentItemTitle,
    renameModal,
    stopPropagation
} from "../../common/common";
import {Button, Fade} from "@mui/material";
import FittedThemeBtn from "../common/theme/FittedThemeBtn";


const ItemOptions = ({
                         hoveredMediaIndex,
                         deleteCurrentItem,
                         showIcons = true,
                         iconBgColor,
                         iconBgActiveColor,
                         displayInCol = false,
                         name,
                         oldName,
                         tgIconColor = 'black',
                         vbIconColor = 'black',
                         renameIconColor = 'black',
                         deleteIconColor = 'black',
                         iconsSize = 20,
                         url, index, searchMode, currentRoute,
                         initialMode = 'hide',
                         showBg = true,
                         setItemOptionsHovered,
                         handleAlertModal,
                         confirm,
                         handleModal,
                     }) => {

    const [showOptions, setShowOptions] = useState(initialMode !== 'hide')

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
    bg-opacity-5
    rounded md 
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
        : ''}`

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
             ${(showOptions && showBg) && 'bg-gray-300 bg-opacity-50'} 
           `}
            onMouseLeave={handleMouseLeave}>
            <Fade in={showOptions} timeout={200}>
                <div className={`flex ${displayInCol && 'flex-col'}`}>
                    <FittedThemeBtn className={iconBlockClass}>
                        <TelegramShareButton
                            url={url}
                            title={''}>
                            {showIcons ?
                                <FaTelegram
                                    title={"share via telegram"}
                                    size={iconsSize}
                                    color={tgIconColor}/> : <p>Share via Telegram</p>}</TelegramShareButton>
                    </FittedThemeBtn>
                    <FittedThemeBtn className={iconBlockClass}>
                        <ViberShareButton url={url}>
                            {showIcons ?
                                <FaViber
                                    title={"share via viber"}
                                    size={iconsSize}
                                    color={vbIconColor}/> :
                                <p>Share via Viber</p>}
                        </ViberShareButton>
                    </FittedThemeBtn>
                    <FittedThemeBtn className={iconBlockClass}
                                    onClick={() => handleModal({modalType: renameModal, name, oldName})}>
                        {showIcons ?
                            <BsPencilFill size={iconsSize}
                                          title={"edit current item name"}
                                          color={renameIconColor}/> : 'Rename item'}
                    </FittedThemeBtn>
                    <FittedThemeBtn className={iconBlockClass}
                                    onClick={handleDeleteCurrentItem}>
                        {showIcons ?
                            < BsTrash title={'delete current item'} size={iconsSize}
                                      color={deleteIconColor}
                            /> : 'Delete Item'}
                    </FittedThemeBtn>
                    {/*<BsDownload className="text-gray-200" size={iconsSize}/>*/}

                </div>
            </Fade>
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
    deleteCurrentItem,
    handleAlertModal
})(ItemOptions);
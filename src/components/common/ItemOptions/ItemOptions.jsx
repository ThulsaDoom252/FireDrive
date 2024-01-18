import React, {useRef, useState} from 'react';
import {connect} from "react-redux";
import {deleteCurrentItem} from "../../../redux/mediaSlice";
import {BsDownload, BsPencilFill, BsThreeDots, BsTrash} from "react-icons/bs";
import {TelegramShareButton, ViberShareButton} from "react-share";
import {FaTelegram, FaViber} from "react-icons/fa";
import {handleAlertModal} from "../../../redux/appSlice";
import {
    removeCurrentItemMsg,
    removeCurrentItemTitle,
    renameModal,
    stopPropagation
} from "../../../common/common";
import {Box, Fade} from "@mui/material";
import FittedThemeBtn from "../theme/FittedThemeBtn";
import {download} from "../../../dal"
import {tgShareBtn, viberShareBtn} from './btnTypes';

const ItemOptions = ({
                         hoveredMediaIndex,
                         deleteCurrentItem,
                         showIcons = true,
                         iconBgColor,
                         iconBgActiveColor,
                         displayInCol = false,
                         fullWidth,
                         name,
                         oldName,
                         bgColor = 'bg-gray-300',
                         tgIconColor = 'black',
                         vbIconColor = 'black',
                         renameIconColor = 'black',
                         bgOpacity = 'bg-opacity-50',
                         deleteIconColor = 'black',
                         downloadIconColor = 'black',
                         iconsSize = 20,
                         url, index, searchMode, currentRoute,
                         initialMode = 'hide',
                         showBg = true,
                         setItemOptionsHovered,
                         handleAlertModal,
                         onlyDeleteOption,
                         confirm,
                         handleModal,
                     }) => {

        const [showOptions, setShowOptions] = useState(initialMode !== 'hide')
        const tgBtnRef = useRef(null)
        const vbBtnRef = useRef(null)

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


        const handleShare = (type) => {
            type === tgShareBtn ? tgBtnRef.current.click() : vbBtnRef.current.click()
        }


        return (
            <React.Fragment>
                <TelegramShareButton ref={tgBtnRef} url={url} hidden/>
                <ViberShareButton ref={vbBtnRef} url={url} hidden/>
                <Box
                    onClick={stopPropagation}
                    className={`
             p-1 
             h-fit 
               flex 
               items-center
               rounded
                hover:cursor-pointer
               ${(showOptions && showBg) && `${bgColor} ${bgOpacity}`} 
               ${fullWidth && 'w-full'}
           `}
                    onMouseLeave={handleMouseLeave}>
                    <Fade in={showOptions} timeout={200}>
                        <div className={`flex ${fullWidth && 'w-full'} justify-between ${displayInCol && 'flex-col'}`}>
                            {!onlyDeleteOption &&
                                <FittedThemeBtn className={iconBlockClass} onClick={() => handleShare(tgShareBtn)}>
                                    {showIcons ?
                                        <FaTelegram
                                            title={"share via telegram"}
                                            size={iconsSize}
                                            color={tgIconColor}/> :
                                        <p>Share via Telegram</p>} </FittedThemeBtn>
                            }

                            {!onlyDeleteOption &&
                                <FittedThemeBtn className={iconBlockClass} onClick={() => handleShare(viberShareBtn)}>
                                    {showIcons ?
                                        <FaViber
                                            title={"share via viber"}
                                            size={iconsSize}
                                            color={vbIconColor}/> :
                                        <p>Share via Viber</p>}
                                </FittedThemeBtn>

                            }
                            {!onlyDeleteOption && <FittedThemeBtn className={iconBlockClass}
                                                                  onClick={() => handleModal({
                                                                      modalType: renameModal,
                                                                      name,
                                                                      oldName
                                                                  })}>
                                {showIcons ?
                                    <BsPencilFill size={iconsSize}
                                                  title={"edit current item name"}
                                                  color={renameIconColor}/> : 'Rename item'}
                            </FittedThemeBtn>}
                            <FittedThemeBtn className={iconBlockClass}
                                            onClick={handleDeleteCurrentItem}>
                                {showIcons ?
                                    < BsTrash title={'delete current item'} size={iconsSize}
                                              color={deleteIconColor}
                                    /> : 'Delete Item'}
                            </FittedThemeBtn>
                            {!onlyDeleteOption &&
                                <FittedThemeBtn isHidden={onlyDeleteOption}
                                                onClick={() => download(url, name, currentRoute)}><BsDownload
                                    size={iconsSize}
                                    color={downloadIconColor}/></FittedThemeBtn>}
                        </div>
                    </Fade>
                    {initialMode === 'hide' &&
                        <div onMouseEnter={handleMouseEnter} className={showOptions ? `text-black` : 'text-gray-500'}>
                            <BsThreeDots size={25}/></div>}
                </Box>
            </React.Fragment>

        );

    }
;

const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute
    }
}


export default connect(mapStateToProps, {
    deleteCurrentItem,
    handleAlertModal
})(ItemOptions);
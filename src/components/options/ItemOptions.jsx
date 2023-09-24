import React, {useState} from 'react';
import {connect} from "react-redux";
import {deleteCurrentItem, handleMediaName} from "../../redux/mediaSlice";
import {BsDownload, BsPencilFill, BsThreeDots, BsTrash} from "react-icons/bs";
import {TelegramShareButton, ViberShareButton} from "react-share";
import {FaTelegram, FaViber} from "react-icons/fa";
import {setModalType} from "../../redux/appSlice";
import {delay, renameModal, stopPropagation} from "../../common/commonData";
import MyCustomTransition from "../common/MyCustomTransition";


const ItemOptions = ({
                         handleMediaName,
                         hoveredMediaIndex,
                         deleteCurrentItem,
                         setModalType,
                         iconBgColor,
                         iconBgActiveColor,
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
            className={`hover:cursor-pointer p-1 h-fit ${(showOptions && showBg) && 'bg-settingsBar'} flex justify-center items-center rounded`}
            onMouseLeave={handleMouseLeave}>
            <MyCustomTransition shouldAnimate={shouldAnimate} show={showOptions}>
                <div className={'flex'}>
                    <div className={iconBlockClass}>
                        <TelegramShareButton
                            url={url}
                            title={''}><FaTelegram
                            title={"share via telegram"}
                            size={iconsSize}
                            color={tgIconColor}/></TelegramShareButton>
                    </div>

                    <div className={iconBlockClass}>
                        <ViberShareButton url={url}><FaViber
                            title={"share via viber"}
                            size={iconsSize}
                            color={vbIconColor}/></ViberShareButton>
                    </div>
                    <div className={iconBlockClass}>
                        <BsPencilFill size={iconsSize}
                                      title={"edit current item name"}
                                      color={renameIconColor} onClick={handleRenameModal}/>
                    </div>
                    <div className={iconBlockClass}>
                        < BsTrash title={'delete current item'} size={iconsSize}
                                  color={deleteIconColor}
                                  onClick={() => deleteCurrentItem({url, index, searchMode, route: currentRoute})}/>
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


export default connect(mapStateToProps, {handleMediaName, setModalType, deleteCurrentItem})(ItemOptions);
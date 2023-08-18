import React, {useState} from 'react';
import {connect} from "react-redux";
import {deleteCurrentItem, handleMediaName} from "../../redux/mediaSlice";
import {BsDownload, BsPencilFill, BsThreeDots, BsTrash} from "react-icons/bs";
import {TelegramShareButton, ViberShareButton} from "react-share";
import {FaTelegram, FaViber} from "react-icons/fa";
import {toggleRenameModal} from "../../redux/appSlice";
import {delay} from "../../common/commonData";
import MyCustomTransition from "../common/MyCustomTransition";


const MediaOptions = ({
                          handleMediaName,
                          deleteCurrentItem,
                          toggleRenameModal,
                          name,
                          oldName,
                          tgIconColor = 'rgb(77, 171, 247)',
                          vbIconColor = 'rgb(193, 122, 250)',
                          renameIconColor = 'blue',
                          deleteIconColor = 'red',
                          iconsSize = 20,
                          url, index, searchMode, currentRoute,
                          animate = true, shouldAnimate,
                          initialMode = 'hide',
                          showBg = true,
                          itemOptionsHovered = true, setItemOptionsHovered
                      }) => {


    const handleRenameModal = async () => {
        handleMediaName({name, oldName})
        await delay(50)
        toggleRenameModal(true)
    }

    const handleMouseEnter = () => {
        setItemOptionsHovered(true)
    }

    const handleMouseLeave = () => {
        initialMode === 'hide' && setItemOptionsHovered(false)
    }

    const stopPropagation = e => {
        e.stopPropagation()
    }
    return (
        <div
            onClick={stopPropagation}
            className={`hover:cursor-pointer p-1 h-fit ${(itemOptionsHovered && showBg) && 'bg-settingsBar'} flex justify-center items-center rounded`}
            onMouseLeave={handleMouseLeave}>
            <MyCustomTransition shouldAnimate={shouldAnimate} show={itemOptionsHovered}>
                <div className={'flex'}>

                    <TelegramShareButton url={url} title={''}><FaTelegram className={'mx-2'}
                                                                          title={"share via telegram"}
                                                                          size={iconsSize}
                                                                          color={tgIconColor}/></TelegramShareButton>
                    <ViberShareButton url={url}><FaViber
                        title={"share via viber"}
                        className={'mx-2'} size={iconsSize}
                        color={vbIconColor}/></ViberShareButton>
                    <BsPencilFill size={iconsSize} className={'mx-2'}
                                  title={"edit current item name"}
                                  color={renameIconColor} onClick={handleRenameModal}/>
                    < BsTrash title={'delete current item'} size={iconsSize} className={'mx-2'} color={deleteIconColor}
                              onClick={() => deleteCurrentItem({url, index, searchMode, route: currentRoute})}/>
                    {/*<BsDownload className="text-gray-200" size={iconsSize}/>*/}

                </div>
            </MyCustomTransition>
            {initialMode === 'hide' &&
                <div onMouseEnter={handleMouseEnter} className={itemOptionsHovered ? `text-black` : 'text-gray-500'}>
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


export default connect(mapStateToProps, {handleMediaName, toggleRenameModal, deleteCurrentItem})(MediaOptions);
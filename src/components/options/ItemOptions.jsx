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

    return (
        <div
            onClick={stopPropagation}
            className={`hover:cursor-pointer p-1 h-fit ${(showOptions && showBg) && 'bg-settingsBar'} flex justify-center items-center rounded`}
            onMouseLeave={handleMouseLeave}>
            <MyCustomTransition shouldAnimate={shouldAnimate} show={showOptions}>
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
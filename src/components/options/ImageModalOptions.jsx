import React from 'react';
import {BiSolidPencil} from "react-icons/bi";
import {FaShare, FaTrash} from "react-icons/fa";
import {renameModal, shareModal} from "../../common/commonData";
import Button from '@mui/material/Button';
import {BsFullscreen} from "react-icons/bs";
import {AiOutlineFullscreenExit} from "react-icons/ai";

const ImageModalOptions = ({
                          handleFullScreen,
                          handleDeleteCurrentModalItem,
                          smallScreen,
                          iconSize = 30,
                          handleModal,
                          currentModalItemName,
                          currentModalOldName,
                          fullScreen,
                      }) => {

    return (
        <>
            <Button className='text-white'
                    onClick={handleFullScreen}>{smallScreen ? (!fullScreen ? <BsFullscreen size={iconSize}/> :
                <AiOutlineFullscreenExit size={iconSize}/>) : 'FullScreen'}
            </Button>
            <Button className='text-white' onClick={() => handleModal({
                modalType: renameModal,
                name: currentModalItemName, oldName: currentModalOldName
            })}>{smallScreen ?
                <BiSolidPencil size={iconSize}/> : 'Rename'}</Button>
            <Button className='text-white' onClick={() => handleModal({modalType: shareModal})}>{smallScreen ?
                <FaShare size={iconSize}/> : 'Share'}</Button>
            <Button className='text-white' onClick={handleDeleteCurrentModalItem}>{smallScreen ?
                <FaTrash size={iconSize}/> : 'Delete'}</Button>
        </>
    );
};

export default ImageModalOptions;
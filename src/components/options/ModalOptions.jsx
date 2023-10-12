import React from 'react';
import {BiSolidPencil} from "react-icons/bi";
import {FaShare, FaTrash} from "react-icons/fa";
import {renameModal, shareModal} from "../../common/commonData";
import Button from '@mui/material/Button';

const ModalOptions = ({
                          handleFullScreen,
                          handleDeleteCurrentModalItem,
                          smallScreen,
                          iconSize = 30,
                          handleModal,
                          currentModalItemName,
                          currentModalOldName,
                      }) => {
    return (
        <>
            <Button className='text-white' hidden={smallScreen}
                    onClick={handleFullScreen}>FullScreen
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

export default ModalOptions;
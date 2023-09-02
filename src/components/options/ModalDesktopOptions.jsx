import React from 'react';
import {BiSolidPencil} from "react-icons/bi";
import {FaShare, FaTrash} from "react-icons/fa";

const ModalDesktopOptions = ({
                                 handleFullScreen,
                                 handleRenameModal,
                                 handleDeleteCurrentModalItem,
                                 smallScreen,
                                 handleShareModal,
                                 iconSize = 30
                             }) => {

    return (
        <>
            <div hidden={smallScreen} className='hover:cursor-pointer'
                 onClick={handleFullScreen}>FullScreen
            </div>
            <div className='hover:cursor-pointer' onClick={handleRenameModal}>{smallScreen ?
                <BiSolidPencil size={iconSize}/> : 'Rename'}</div>
            <div className='hover:cursor-pointer' onClick={handleShareModal}>{smallScreen ?
                <FaShare size={iconSize}/> : 'Share'}</div>
            <div className='hover:cursor-pointer' onClick={handleDeleteCurrentModalItem}>{smallScreen ?
                <FaTrash size={iconSize}/> : 'Delete'}</div>
        </>


    );
};

export default ModalDesktopOptions;
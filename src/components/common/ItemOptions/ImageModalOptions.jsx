import React from 'react';
import {BiSolidPencil} from "react-icons/bi";
import {FaDownload, FaShare, FaTrash} from "react-icons/fa";
import {renameModal, shareModal} from "../../../common/common";
import {BsFullscreen} from "react-icons/bs";
import {AiOutlineFullscreenExit} from "react-icons/ai";
import FittedThemeBtn from "../theme/FittedThemeBtn";
import {download} from "../../../dal"

const ImageModalOptions = ({
                               handleFullScreen,
                               handleDeleteCurrentModalItem,
                               smallScreen,
                               iconSize = 30,
                               handleModal,
                               currentModalItemUrl,
                               currentRoute,
                               currentModalItemName,
                               currentModalOldName,
                               fullScreen,
                           }) => {

    const optionItems = [
        {
            type: 'fullscreen',
            icon: <BsFullscreen size={iconSize}/>,
            exitIcon: <AiOutlineFullscreenExit size={iconSize}/>,
            onClick: () => handleFullScreen(), label: `${fullScreen ? 'Exit fullscreen' : 'Fullscreen'}`,
        },
        {
            type: 'rename',
            icon: <BiSolidPencil size={iconSize}/>,
            onClick: () => handleModal({
                modalType: renameModal,
                name: currentModalItemName,
                oldName: currentModalOldName
            }),
            label: 'Rename'
        },
        {
            type: 'share',
            icon: <FaShare size={iconSize}/>,
            onClick: () => handleModal({modalType: shareModal}),
            label: 'Share'
        },
        {
            type: 'download',
            icon: <FaDownload size={iconSize}/>,
            onClick: () => download(currentModalItemUrl, currentModalItemName, currentRoute),
            label: 'Download'
        },
        {
            type: 'delete',
            icon: <FaTrash size={iconSize}/>,
            onClick: () => handleDeleteCurrentModalItem(),
            label: 'Delete'
        },
    ]

    return (
        <>
            {optionItems.map((item, index) =>
                <React.Fragment key={index}>
                    <FittedThemeBtn
                        onClick={item.onClick} imgModalBtn>
                        {smallScreen ? (fullScreen && item.exitIcon ? item.exitIcon : item.icon) : item.label}
                    </FittedThemeBtn>
                </React.Fragment>
            )}
        </>
    );
};

export default ImageModalOptions;
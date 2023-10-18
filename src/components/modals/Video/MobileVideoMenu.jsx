import React, {useContext} from 'react';
import {Menu} from '@mui/material';
import MediaOptions from "../../options/ItemOptions";
import {ItemsModalContext} from "../../../context/ItemsModalContext";

const MobileVideoMenu = () => {

    const ModalContext = useContext(ItemsModalContext)


    const {
        currentModalItemUrl,
        currentModalItemIndex,
        currentModalItemName,
        currentModalItemOldName,
        showVideoMobileSettings,
        toggleVideoMobileSettings,
    } = ModalContext


    const handleClose = () => {
        toggleVideoMobileSettings(false)
    }

    return (
        <div className="fixed bottom-0 w-screen" onClick={handleClose}>
            <Menu
                id="menu"
                open={showVideoMobileSettings}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >

                <MediaOptions initialMode={'show'}
                              shouldAnimate={false}
                              showIcons={false}
                              url={currentModalItemUrl}
                              index={currentModalItemIndex}
                              displayInCol={true}
                              name={currentModalItemName}
                              oldName={currentModalItemOldName}
                              showBg={false}
                              tgIconColor={'black'}
                              vbIconColor={'black'}
                              deleteIconColor={'black'}
                              renameIconColor={'black'}

                />
            </Menu>
        </div>
    );
};

export default MobileVideoMenu;

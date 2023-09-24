import React, {useContext, useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {MoreVert as MoreVertIcon} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {toggleVideoMobileMenu} from "../../redux/appSlice";
import MediaOptions from "../options/ItemOptions";
import {ItemsModalContext} from "../../context/ItemsModalContext";

const MobileVideoMenu = () => {

    const showMenu = useSelector(state => state.app.showVideoMobileMenu)
    const dispatch = useDispatch()

    const ModalContext = useContext(ItemsModalContext)


    const {
        currentModalItemUrl,
        currentModalItemIndex,
        currentModalItemName,
        currentModalItemOldName,
    } = ModalContext


    const handleClose = () => {
        dispatch(toggleVideoMobileMenu(false))
    }
    // const [anchorEl, setAnchorEl] = useState(null);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    //
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <div className="fixed bottom-0 w-screen">
            <Menu
                id="menu"
                open={showMenu}
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

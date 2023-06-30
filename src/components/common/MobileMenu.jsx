import React from 'react';
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import {AiOutlineMenu} from "react-icons/ai";
import UploadBtn from "./UploadBtn";
import RemoveAllBtn from "./RemoveAllBtn";
import {connect} from "react-redux";
import {rootRoute} from "../../common/commonData";

const MobileMenu = ({opacity = 30, zIndex = 0, currentRoute}) => {
    const disabled = currentRoute === rootRoute
    return (<>
            <div hidden={disabled}>
                <ContextMenuTrigger  mouseButton={0} id="header-mobile-menu">
                    <AiOutlineMenu className={`text-xl`}/>
                </ContextMenuTrigger>
                <ContextMenu className={`flex flex-col items-center justify-center bg-opacity-${opacity}
                bg-blue-700 w-20 p-5 rounded z-${zIndex}`}
                             id="header-mobile-menu">
                    <MenuItem divider/>
                    <div className={'mb-5'}>
                        <UploadBtn/>
                    </div>
                    <MenuItem divider/>
                    <RemoveAllBtn/>
                    <MenuItem divider/>
                </ContextMenu>
            </div>
        </>
    );
};


const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute
    }
}

export default connect(mapStateToProps, null)(MobileMenu);
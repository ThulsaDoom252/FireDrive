import React from 'react';
import Overlay from "../Overlay";

const Modal = ({children, showOverlay = true, modalZIndex = 'max', overlayZIndex,}) => {
    return (
        <>
        {showOverlay && <Overlay zIndex={overlayZIndex}/>}
        <div
            className={`
            bg-white
            fixed
           top-1/2
        left-1/2
        p-3
            transform -translate-x-1/2 -translate-y-1/2
            rounded
            w-modal
            flex
            flex-col
            items-center
            justify-center
            z-${modalZIndex}`}>

            {children}
        </div>
        </>
    );
};

export default Modal;
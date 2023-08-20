import React from 'react';

const ModalContainer = ({handleClose, children, zIndex = 'z-1', pointerCursor = 'cursor-pointer'}) => {
    return (
        <div
            onClick={handleClose}
            className={`
            w-screen
            h-screen
            absolute
            flex
            flex-col
            items-center
            justify-center
            ${pointerCursor || 'cursor-default'}
            ${zIndex}
            `}>{children}</div>
    );
};

export default ModalContainer;
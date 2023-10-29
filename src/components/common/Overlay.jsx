import React from 'react';

const Overlay = ({
                     bg = 'bg-gray-600',
                     position = 'absolute',
                     opacity = 'bg-opacity-50',
                     zIndex = 'z-0',
                     toggleModal,
                 }) => {

    const handleClose = (e) => {
        e.stopPropagation()
        if (toggleModal)
            toggleModal(false)
    }
    return (
        <div className={`
        inset-0
        ${position}
        ${bg}
        ${opacity}
        ${zIndex}
        `}
             onClick={handleClose}
        />
    );
};

export default Overlay;
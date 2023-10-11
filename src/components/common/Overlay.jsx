import React from 'react';

const Overlay = ({
                     bg = 'bg-gray-600',
                     position = 'absolute',
                     width = 'w-full',
                     height = 'h-full',
                     opacity = 'bg-opacity-50',
                     zIndex = 'z-0',
                     toggleModal,
                 }) => {

    const handleClose = () => {
        if (toggleModal)
            toggleModal(false)
    }
    return (
        <div className={`
        ${position}
        ${width}
        ${height} 
        ${bg}
        ${opacity}
        ${zIndex}
        `}
             onClick={handleClose}
        />
    );
};

export default Overlay;
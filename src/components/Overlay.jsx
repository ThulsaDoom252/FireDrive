import React from 'react';

const Overlay = ({
                     zIndex = 'z-max',
                     toggleModal,
                     color = 'bg-black',
                     opacity = 'bg-opacity-50',
                     width = 'w-full',
                     height = 'h-full',
                     position = 'absolute'
                 }) => {
    const handleClose = () => toggleModal ? toggleModal(false) : void 0
    return (
        <div onClick={handleClose}
             className={`
             ${position}
             ${zIndex} 
             ${toggleModal && 'cursor-pointer'}
             ${width}
             ${height}
             ${color}
             ${opacity}                   
             `}/>
    );
};

export default Overlay;

import React from 'react';

const Overlay = ({zIndexValue = 'max', toggleModal, color = 'black', opacity = '50'}) => {
    const handleClose = () => toggleModal ? toggleModal(false) : void 0
    return (
        <div onClick={handleClose}
             className={`h-full w-full absolute bg-${color} bg-opacity-${opacity} z-${zIndexValue} ${toggleModal && 'cursor-pointer'}`}/>
    );
};

export default Overlay;

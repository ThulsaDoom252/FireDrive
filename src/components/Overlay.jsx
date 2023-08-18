import React from 'react';

const Overlay = ({zIndexValue = 'max', toggleModal}) => {
    const handleClose = () => toggleModal ? toggleModal(false) : void 0
    return (
        <div onClick={handleClose}
             className={`h-full w-full absolute bg-black opacity-50 z-${zIndexValue} ${toggleModal && 'cursor-pointer'}`}/>
    );
};

export default Overlay;

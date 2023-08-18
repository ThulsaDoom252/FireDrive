import React from 'react';

const Overlay = ({zIndex = 10}) => {
    return (
        <div className={`w-screen h-screen bg-black opacity-50 z-${zIndex}`}/>
    );
};

export default Overlay;
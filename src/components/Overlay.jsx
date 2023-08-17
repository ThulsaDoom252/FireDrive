import React from 'react';

const Overlay = ({zIndex = 0}) => {
    return (
        <div className={`h-full w-full bg-black opacity-75 z-${zIndex}`}>

        </div>
    );
};

export default Overlay;

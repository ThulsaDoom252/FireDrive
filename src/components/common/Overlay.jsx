import React from 'react';

const Overlay = ({bg = 'bg-gray-600', opacity = 'opacity-50'}) => {
    return (
        <div className={`absolute w-full h-full
        ${bg}
        ${opacity}
        `}/>
    );
};

export default Overlay;
import React from 'react';

const ItemsModalContainer = ({
                                 showOverlay = true,
                                 overlayColor = 'bg-gray-600',
                                 overlayOpacity = 'bg-opacity-50',
                                 children
                             }) => {
    return (
        <div className={`inset-0 absolute  ${showOverlay && `${overlayOpacity} ${overlayColor}`} `}>
            {children}
        </div>
    );
};

export default ItemsModalContainer;
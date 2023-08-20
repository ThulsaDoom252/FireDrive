import React from 'react';
import {stopPropagation} from "../../common/commonData";

const MyModal = ({
                     children,
                     width = 'w-modal',
                     height = '',
                     padding = 'p-2',


                 }) => {
    return (
        <div
            onClick={stopPropagation}
            className={`
        ${width} 
        ${padding} 
        bg-white 
        fixed   
        rounded 
        opacity-100
        `}>{children}</div>
    );
};

export default MyModal;
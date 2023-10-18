import React from 'react';
import {AiOutlinePlayCircle} from "react-icons/ai";

const CentralPlayBtn = ({iconSize = 50}) => {
    return (
        <div className={`
            flex
            absolute inset-0 
             items-center justify-center`}>
            <button className={`flex 
                            items-center 
                            justify-center 
                            bg-blue-300 
                            rounded
                            text-white
                            h-20
                            w-20
                            hover:bg-opacity-50
                            transition-all duration-100
                            `}><AiOutlinePlayCircle size={iconSize}/></button>
        </div>
    );
};

export default CentralPlayBtn;
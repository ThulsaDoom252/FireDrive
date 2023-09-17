import React from 'react';
import {BsSpeedometer} from "react-icons/bs";
import {MdKeyboardArrowRight} from "react-icons/md";

const SpeedBtn = ({handleSpeedSubMenu, currentSpeedValue}) => {
    return (
        <div className={`
                                        w-full 
                                        flex 
                                        justify-between 
                                        items-center 
                                        mt-2 
                                        cursor-pointer
                                         hover:bg-gray-600
                                    transition-all duration-100
                                        `}
             onClick={handleSpeedSubMenu}

        >
            <div className={'flex items-center justify-center'}>
                <BsSpeedometer size={20}/>
                <div className={'ml-1 text-lg'}>Speed</div>
            </div>
            <div className={'flex justify-between items-center text-blue-400'}>
                <div>{currentSpeedValue}</div>
                <div><MdKeyboardArrowRight/></div>
            </div>
        </div>
    );
};

export default SpeedBtn;
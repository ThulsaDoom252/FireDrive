import React from 'react';
import {MdKeyboardArrowLeft} from "react-icons/md";
import {formatValueAsPercentage} from "../../../../common/common";

const ScaleMenu = ({handleClearSubMenu, changeVideoScale, currentScaleValue}) => {
    return (
        <div className='
                            w-full
                             h-full
                             flex
                             flex-col
                             justify-start
                             items-center
                             '>
            <div className='
                                w-full
                                flex
                                justify-between
                                items-center
                                border-b
                                border-b-white
                                hover:bg-gray-700
                                hover:cursor-pointer
                                transition-all duration-100
                                '
                 onClick={handleClearSubMenu}
            >
                <div className={'flex items-center mr-2'}>
                    <div>
                        <MdKeyboardArrowLeft/>
                    </div>
                    <div>Scale</div>
                </div>
                <div
                    className={'text-blue-300'}>{formatValueAsPercentage(currentScaleValue)}</div>
            </div>
            <div className={'w-full flex flex-col items-end justify-start'}>
                <div className='mt-1  w-full  hover:bg-gray-700 text-right
                                hover:cursor-pointer
                                transition-all duration-100'
                     onClick={() => changeVideoScale(currentScaleValue + 0.03)}>+3%
                </div>
                <div className='mt-1  w-full hover:bg-gray-700 text-right
                                hover:cursor-pointer
                                transition-all duration-100'
                     onClick={() => changeVideoScale(currentScaleValue - 0.03)}>-3%
                </div>
                <div className='mt-1 w-full  hover:bg-gray-700 text-right
                                hover:cursor-pointer
                                transition-all duration-100' onClick={() => changeVideoScale(1)}>100%
                </div>
            </div>
        </div>
    );
};

export default ScaleMenu;
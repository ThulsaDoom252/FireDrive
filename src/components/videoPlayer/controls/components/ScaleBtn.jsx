import React from 'react';
import {MdKeyboardArrowRight} from "react-icons/md";
import {RxMagnifyingGlass} from "react-icons/rx";
import {formatValueAsPercentage} from "../../../../common/common";

const ScaleBtn = ({handleScaleSubMenu, currentScaleValue}) => {
    return (
        <div className={`
                                          w-full
                                    flex
                                    justify-between
                                    items-center
                                    mt-2
                                    cursor-pointer
                                    bg-opacity-50
                                    hover:bg-gray-600
                                    transition-all duration-100
                                   
                                        `}

             onClick={handleScaleSubMenu}
        >
            <div className={'flex items-center justify-center mr-4'}>
                <RxMagnifyingGlass size={20}/>
                <div className={'ml-1 text-lg'}>Scale</div>
            </div>

            <div className={'flex justify-between items-center text-blue-400'}>
                <div>{formatValueAsPercentage(currentScaleValue)}</div>
                <div><MdKeyboardArrowRight/></div>

            </div>
        </div>
    );
};

export default ScaleBtn;
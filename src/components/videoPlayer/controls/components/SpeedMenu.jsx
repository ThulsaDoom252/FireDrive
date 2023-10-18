import React from 'react';
import {MdKeyboardArrowLeft} from "react-icons/md";

const SpeedMenu = ({handleClearSubMenu, playBackValues, handlePlayBackRate, currentSpeedValue}) => {
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
                                justify-center
                                items-center
                                border-b
                                border-b-white
                                hover:bg-gray-700
                                hover:cursor-pointer
                                transition-all duration-100
                                '
                 onClick={handleClearSubMenu}

            >
                <div>
                    <MdKeyboardArrowLeft/>
                </div>
                <div>Speed</div>
            </div>
            <div className={'w-full flex flex-col items-end justify-start'}>
                {playBackValues.map((value, index) => (
                    <div key={index} className={`
                                            mt-1
                                            hover:bg-gray-700
                                            hover:cursor-pointer
                                            transition-all duration-100
                                            ${currentSpeedValue === value && 'text-blue-400'}
                                            `}
                         onClick={() => handlePlayBackRate(value)}>
                        {value === 1 ? 'Normal' : `${value}x`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpeedMenu;
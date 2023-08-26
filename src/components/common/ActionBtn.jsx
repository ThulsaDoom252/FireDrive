import React from 'react';
import clsx from "clsx";

const ActionBtn = ({
                       isDropDown = false,
                       switchToIconIfSmallScreen = false,
                       btnStyle = 'primary',
                       smallScreenIcon,
                       children,
                       smallScreen,
                       type = 'button',
                       height,
                       isFullWidth = false,
                       isDisabled,
                       handleClick
                   }) => {

    return (
        <button
            type={type}
            disabled={isDisabled}
            onClick={handleClick}
            className={clsx(`
            relative
        text-white 
        border-none
       flex
       justify-center
       items-center
       p-2
       font-bold py-2
       transition-all duration-300
        rounded
         `,
                height,
                isFullWidth && 'w-full',
                btnStyle === 'warning' ? 'bg-yellow-500 hover:bg-yellow-400' : btnStyle === 'danger' ? 'bg-red-600 hover:bg-red-500' : btnStyle === 'auth' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-purple-500 : hover:bg-purple-400',
                isDisabled && 'opacity-50 cursor-not-allowed',
            )}>
            {switchToIconIfSmallScreen && smallScreen ? smallScreenIcon : children}
        </button>
    );
};

export default ActionBtn;
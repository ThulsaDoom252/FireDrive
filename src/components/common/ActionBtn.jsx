import React from 'react';
import clsx from "clsx";

const ActionBtn = ({
                       isDropDown = false,
                       switchToIconIfSmallScreen = false,
                       btnStyle = 'primary',
                       smallScreenIcon,
                       children,
                       smallScreen,
                       height,
                       isFullWidth = false,
                       isDisabled,
                       handleClick
                   }) => {

    return (
        <button
            type={"button"}
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
        rounded
         `,
                height,
                isFullWidth && 'w-full',
                btnStyle === 'warning' ? 'bg-yellow-500' : btnStyle === 'danger' ? 'bg-red-600' : 'bg-purple-500',
                isDisabled && 'opacity-50 cursor-not-allowed',
            )}>
            {switchToIconIfSmallScreen && smallScreen ? smallScreenIcon : children}
        </button>
    );
};

export default ActionBtn;
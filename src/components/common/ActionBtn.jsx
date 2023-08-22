import React from 'react';
import clsx from "clsx";
import {GoTrash} from "react-icons/go";

const ActionBtn = ({
                       label = 'button',
                       switchToIconIfSmallScreen = false,
                       btnStyle = 'primary',
                       smallScreenIcon,
                       children,
                       smallScreen,
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
        text-white 
        border-none
       flex
       justify-center
       items-center
       p-2
       font-bold py-2
        rounded
         `,
                isFullWidth && 'w-full',
                btnStyle === 'warning' ? 'bg-yellow-500' : btnStyle === 'danger' ? 'bg-red-600' : 'bg-purple-500',
                isDisabled && 'opacity-50 cursor-not-allowed',
            )}>
            {switchToIconIfSmallScreen && smallScreen ? smallScreenIcon : label}
        </button>
    );
};

export default ActionBtn;
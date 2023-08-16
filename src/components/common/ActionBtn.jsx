import React from 'react';
import clsx from "clsx";


const actionBtnStyles = {
    primary: 'bg-purple-500'
}

const ActionBtn = ({
                       label = 'button',
                       switchToIconIfSmallScreen = false,
                       btnStyle = 'primary',
                       icon,
                       children,
                       smallScreen,
                       isFullWidth = false,
                       isDisabled,
                       handleClick
                   }) => {

    return (
        <>
            <>
                <button
                    type="button"
                    disabled={isDisabled}
                    onClick={handleClick}
                    className={clsx(`
                     ${btnStyle === 'warning' ? 'bg-yellow-500' : btnStyle === 'danger' ? 'bg-red-600' : 'bg-purple-500'}
                      text-white 
                      font-bold py-2
                       px-4 rounded 
                        hover:bg-purple-60`,
                        isDisabled && 'opacity-50 cursor-not-allowed',
                        isFullWidth && 'w-full',
                    )}
                >
                    {switchToIconIfSmallScreen && smallScreen ? icon : label}
                </button>
            </>
        </>
    );
};

export default ActionBtn;
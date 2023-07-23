import React from 'react';
import clsx from "clsx";

const ActionBtn = ({label = 'button', icon, smallScreen, isFullWidth = false, isDisabled, handleClick}) => {

    return (
        <>
            <>
                <button
                    type="button"
                    disabled={isDisabled}
                    onClick={handleClick}
                    className={clsx(`
                     bg-purple-500
                      text-white 
                      font-bold py-2
                       px-4 rounded 
                        hover:bg-purple-60`,
                        isDisabled && 'opacity-50 cursor-not-allowed',
                        isFullWidth && 'w-full',
                    )}
                >
                    {smallScreen ? icon : label}
                </button>
            </>
        </>
    );
};

export default ActionBtn;
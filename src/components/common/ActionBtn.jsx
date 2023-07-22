import React from 'react';

const ActionBtn = ({label = 'button', icon, smallScreen, isFullWidth = false, isDisabled, handleClick}) => {

    return (
        <>
            <>
                <button
                    type="button"
                    disabled={isDisabled}
                    onClick={handleClick}
                    className={`${isFullWidth && 'w-full'} bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {smallScreen ? icon : label}

                </button>
            </>
        </>
    );
};

export default ActionBtn;
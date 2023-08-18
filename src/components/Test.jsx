import React, {useState} from 'react';

const Component = () => {
    const [showOptions, setShowOptions] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    return (
        <div className={'w-screen h-screen flex justify-end items-start'}>
            <div className='relative w-200 h-300' onMouseLeave={handleMouseLeave}>
                <button className={'absolute top-0'}  onMouseEnter={handleMouseEnter}>Hover me</button>
                {showOptions && (
                    <div className={'absolute top-5 w-150 h-200 border border-black'}>
                        Options
                    </div>
                )}
            </div>

        </div>
    );
};

export default Component;
import React from 'react';

const ActionInput = ({type, id, onChange, placeholder, errorType, value}) => {
    return (
        <input
            className={`
            p-2 
            w-full 
            mt-5 
            h-10 
            rounded-xl 
            text-left 
            bg-customInputColor 
            ${errorType &&
            'border-2 border-rose-600'}`}
            onChange={onChange}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}/>


    );
};

export default ActionInput;
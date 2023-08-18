import React from 'react';
import {PiMaskSadDuotone} from "react-icons/pi";

const NoSearchResults = () => {
    return (
        <div
            className={`flex text-xl items-center justify-center`}>
            <span>No results...</span><PiMaskSadDuotone/></div>
    );
}

export default NoSearchResults;
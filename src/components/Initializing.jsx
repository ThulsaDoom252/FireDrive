import React from 'react';
import {ClipLoader} from "react-spinners";

const Initializing = ({background}) => {
    return (
        <div style={background} className={' bg-center bg-over bg-no-repeat w-screen h-screen flex justify-center items-center'}>
            <ClipLoader size={200}/>
        </div>
    );
};

export default Initializing;
import React from 'react';
import {connect} from "react-redux";
import {handleMediaName} from "../../redux/mediaSlice";
import {BsPencilFill} from "react-icons/bs";

const MediaOptions = ({handleMediaName, name}) => {
    return (
        <div className={'hover:cursor-pointer'}>
            <BsPencilFill onClick={() => handleMediaName({name})}/>
        </div>
    );
};


export default connect(null, {handleMediaName})(MediaOptions);
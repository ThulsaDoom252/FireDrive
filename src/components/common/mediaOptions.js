import React from 'react';
import {connect} from "react-redux";
import {handleMediaName} from "../../redux/mediaSlice";
import {BsPencilFill} from "react-icons/bs";

const MediaOptions = ({handleMediaName, name}) => {
    return (
        <div className={'hover:cursor-pointer p-1 h-5 bg-gray-300 flex justify-center items-center rounded'}>
            <BsPencilFill className={'mx-1'} color={'blue'} onClick={() => handleMediaName({name})}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute

    }
}


export default connect(mapStateToProps, {handleMediaName,})(MediaOptions);
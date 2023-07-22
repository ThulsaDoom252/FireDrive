import React from 'react';
import {connect} from "react-redux";
import {deleteCurrentItem, handleMediaName} from "../../redux/mediaSlice";
import {BsPencilFill, BsTrash} from "react-icons/bs";

const MediaOptions = ({handleMediaName, deleteCurrentItem, name, url, index, searchMode, currentRoute}) => {
    return (
        <div className={'hover:cursor-pointer p-1 h-5 bg-gray-300 flex justify-center items-center rounded'}>
            <BsPencilFill className={'mx-1'} color={'blue'} onClick={() => handleMediaName({name})}/>
            <BsTrash className={'mx-1'} color={'red'}
                     onClick={() => deleteCurrentItem({url, index, searchMode, route: currentRoute})}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute

    }
}


export default connect(mapStateToProps, {handleMediaName, deleteCurrentItem})(MediaOptions);
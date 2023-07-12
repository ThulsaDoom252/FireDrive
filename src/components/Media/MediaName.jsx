import React from 'react';
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";
import {truncate} from "../../common/commonData";

const MediaName = ({
                       name,
                       oldName,
                       editingName,
                       newName,
                       currentRoute,
                       renameMedia,
                       setNewMediaName,
                       handleMediaName,
                   }) => {

    const handleRenameMedia = () => {
        handleMediaName({name: null})
        renameMedia({newName, currentRoute, editingName, originalName: oldName})
    }

    return (
        <div className={'w-full'}>
            {editingName === name ?
                <input className={'w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-300'} type={"text"} value={newName} autoFocus={true}
                       onBlur={handleRenameMedia}
                       onChange={e => setNewMediaName(e.currentTarget.value)}

                /> :
                <span>{truncate(name, 15)}</span>}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        editingName: state.media.editingMediaName,
        newName: state.media.newMediaName,
        currentRoute: state.media.currentRoute,
        editMediaNameMode: state.media.editMediaNameMode,

    }
}

export default connect(mapStateToProps, {renameMedia, setNewMediaName, handleMediaName})(MediaName);
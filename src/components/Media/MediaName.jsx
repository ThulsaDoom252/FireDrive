import React from 'react';
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";
import {truncate} from "../../common/commonData";

const MediaName = ({
                       name,
                       oldName,
                       editingName,
                       newName,
                       renameMedia,
                       setNewMediaName,
                       handleMediaName,
                       textColor = 'base'
                   }) => {

    const handleRenameMedia = () => {
        handleMediaName({name: null})
        renameMedia({newName, editingName, originalName: oldName})
    }

    return (
        <div className={'w-full'}>
            {/*{editingName === name ?*/}
            {/*    <input*/}
            {/*        className={`w-full rounded focus:outline-none text-${textColor} focus:ring-1  focus:ring-blue-300`}*/}
            {/*        type={"text"}*/}
            {/*        value={newName} autoFocus={true}*/}
            {/*        onBlur={handleRenameMedia}*/}
            {/*        onChange={e => setNewMediaName(e.currentTarget.value)}*/}

            {/*    /> :*/}
                <span title={name}>{truncate(name, 15)}</span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        editingName: state.media.editingMediaName,
        newName: state.media.newMediaName,
        editMediaNameMode: state.media.editMediaNameMode,
    }
}

export default connect(mapStateToProps, {renameMedia, setNewMediaName, handleMediaName})(MediaName);

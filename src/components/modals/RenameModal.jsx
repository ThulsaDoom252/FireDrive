import React from 'react';
import {CgCloseR} from "react-icons/cg";
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";

const RenameModal = ({
                         oldName,
                         handleMediaName,
                         renameMedia,
                         toggleModal,
                         newName,
                         editingName,
                         setNewMediaName,
                         isItemRenaming,
                     }) => {

    const handleRenameMedia = () => {
        handleMediaName({name: null, oldName: null})
        renameMedia({newName, editingName, originalName: oldName})
    }

    return (
        <div
            className='
            bg-white
            fixed
           top-1/2
        left-1/2
            transform -translate-x-1/2 -translate-y-1/2
            rounded
            w-userModal
            h-24
            flex
            flex-col
            items-center
            justify-center
            z-10
            transition'>
            <div className="
            absolute
            top-0
            right-0
            "
                 onClick={() => toggleModal(false)}
            ><CgCloseR size={20} color={'gray'}/></div>
            <div className={'mx-auto'}>
                <input className='border-b-2 border-gray-300 focus:outline-none' value={newName}
                       autoFocus={true}
                       type='text'
                       onChange={e => setNewMediaName(e.currentTarget.value)}/>
            </div>

            <button
                disabled={isItemRenaming || newName === editingName || newName === ''}
                onClick={handleRenameMedia}
                className='absolute bottom-1 right-0 disabled:bg-gray-400 bg-blue-500 text-white rounded mr-8'>Rename
            </button>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        newName: state.media.newMediaName,
        editingName: state.media.editingMediaName,
        oldName: state.media.oldMediaName,
        isItemRenaming: state.media.isItemRenaming,
    }

}

export default connect(mapStateToProps, {setNewMediaName, renameMedia, handleMediaName})(RenameModal);
import React from 'react';
import {CgCloseR} from "react-icons/cg";
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";
import Modal from "./Modal";
import MyCustomTransition from "../common/MyCustomTransition";

const RenameModal = ({
                         oldName,
                         handleMediaName,
                         renameMedia,
                         toggleModal,
                         newName,
                         editingName,
                         setNewMediaName,
                         isItemRenaming,
                         showModal,
                     }) => {

    const handleRenameMedia = () => {
        handleMediaName({name: null, oldName: null})
        renameMedia({newName, editingName, originalName: oldName})
    }

    const isRenameBtnDisabled = isItemRenaming || newName === editingName || newName === ''

    return (
        <>
            <MyCustomTransition show={showModal}>
                <Modal modalZIndex={'20'}>
                    <div className="
            absolute
            top-0
            right-0
            text-gray-400
            hover:text-black
            cursor-pointer
            "
                         onClick={() => toggleModal(false)}
                    ><CgCloseR size={20}/></div>
                    <div className={'mx-auto'}>
                        <input className='border-b-2
                        border-gray-300
                        focus:outline-none'
                               value={newName}
                               autoFocus={true}
                               type='text'
                               onChange={e => setNewMediaName(e.currentTarget.value)}/>
                    </div>

                    <button
                        disabled={isRenameBtnDisabled}
                        onClick={handleRenameMedia}
                        className={`absolute bottom-1 right-0 disabled:bg-gray-400 bg-blue-500 text-white rounded mr-8 ${isRenameBtnDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Rename
                    </button>
                </Modal>
            </MyCustomTransition>
        </>
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
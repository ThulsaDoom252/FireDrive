import React from 'react';
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";
import MyCustomTransition from "../common/MyCustomTransition";
import {IoClose} from "react-icons/io5";
import Overlay from "../common/Overlay";
import MyModal from "../common/MyModal";
import ModalContainer from "./ModalContainer";
import {noModal} from "../../common/commonData";

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
                <ModalContainer zIndex={'z-2'}>
                    <Overlay/>
                    <div className={'absolute  top-5 right-5 text-white'}
                         onClick={() => toggleModal(noModal)}><IoClose/></div>
                    <MyModal>
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
                            className={`disabled:bg-gray-400 bg-blue-500 text-white rounded mr-8 ${isRenameBtnDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Rename
                        </button>
                    </MyModal>
                </ModalContainer>
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
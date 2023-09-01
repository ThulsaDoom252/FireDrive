import React from 'react';
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";
import {Dialog} from "@headlessui/react";
import ActionBtn from "../common/ActionBtn";
import TransitionCommonParrent from "../common/TransitionCommonParrent";

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
            <TransitionCommonParrent appear={showModal} show={showModal} toggleModal={toggleModal}>
                <Dialog.Title className={'underline text-lg'}>
                    Rename item
                </Dialog.Title>
                <div>
                    <input className='border-b-2
                                rounded-b
                            border-gray-300
                            focus:outline-none'
                           value={newName}
                           autoFocus={true}
                           type='text'
                           onChange={e => setNewMediaName(e.currentTarget.value)}/>
                </div>
                <div className={'flex justify-end mt-1 '}>
                    <ActionBtn height={'h-8'}
                               isDisabled={isRenameBtnDisabled}
                               handleClick={handleRenameMedia}>
                        Rename
                    </ActionBtn>
                </div>
            </TransitionCommonParrent>
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
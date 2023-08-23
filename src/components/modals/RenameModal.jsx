import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";
import MyCustomTransition from "../common/MyCustomTransition";
import Overlay from "../common/Overlay";
import MyModal from "../common/MyModal";
import ModalContainer from "./ModalContainer";
import {noModal, stopPropagation} from "../../common/commonData";
import {Dialog, Transition} from "@headlessui/react";
import ActionBtn from "../common/ActionBtn";


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

    const handleRenameMedia = e => {
        handleMediaName({name: null, oldName: null})
        renameMedia({newName, editingName, originalName: oldName})
    }

    const isRenameBtnDisabled = isItemRenaming || newName === editingName || newName === ''

    return (
        <>
            <Transition appear={showModal} show={showModal}
                        onClick={() => toggleModal(noModal)}
                        className='absolute bg-opacity-50 z-2 w-screen h-screen bg-gray-500'>
                <Dialog as='div' className='
                absolute
                inset-1/2
                z-2
                bg-white
                w-fit
                h-fit
                rounded
                transform -translate-x-1/2 -translate-y-1/2
                '
                        onClose={() => toggleModal(false)}>
                    <Transition.Child
                        as={'div'}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Panel className={'relative z-2 w-300 p-2'}
                                      onClick={stopPropagation}>
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
                            <div className={'absolute  bottom-0 right-1'}>
                                <ActionBtn height={'h-8'}
                                           isDisabled={isRenameBtnDisabled}
                                           handleClick={handleRenameMedia}>
                                    Rename
                                </ActionBtn>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
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
import React from 'react';
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";
import {Button, Fade} from "@mui/material";
import TextField from '@mui/material/TextField';
import Overlay from "../common/Overlay";
import {renameModal, stopPropagation} from "../../common/commonData";

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

    const handleRenameMedia = async () => {
        handleMediaName({name: null, oldName: null})
        await renameMedia({newName, editingName, originalName: oldName})
        toggleModal({modalType: renameModal})
    }

    const isRenameBtnDisabled = isItemRenaming || newName === editingName || newName === ''

    return (
        <Fade in={showModal}>
            <div className='
            w-screen
            h-screen
             absolute
             z-10
             flex
             justify-center
             items-center
             '>
                <Overlay toggleModal={() => toggleModal({modalType: renameModal})}/>
                <div className='
                bg-white
                relative
                w-80
                h-36
                flex
                flex-col
                p-3
                rounded-md'
                     onClick={stopPropagation}>
                    <h6 className={'mx-auto'}>Rename item</h6>
                    <TextField
                        placeholder={'Enter name'}
                        className={'w-'}
                        id="outlined-basic"
                        variant="outlined"
                        autoFocus={true}
                        value={newName}
                        type={'text'}
                        onChange={e => setNewMediaName(e.currentTarget.value)}

                    />
                    <div className='w-20  absolute right-5 bottom-1'>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            disabled={isRenameBtnDisabled}
                            onClick={handleRenameMedia}>
                            Rename
                        </Button>
                    </div>

                </div>
            </div>
        </Fade>
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
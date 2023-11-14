import React, {useState} from 'react';
import {connect} from "react-redux";
import {handleMediaName, renameMedia, setNewMediaName} from "../../redux/mediaSlice";
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import {noModal, stopPropagation} from "../../common/common";
import AnimatedContainer from '../../common/AnimatedContainer';

const RenameModal = ({
                         oldName,
                         handleMediaName,
                         renameMedia,
                         newName,
                         editingName,
                         setNewMediaName,
                         isItemRenaming,
                         handleModal,
                     }) => {

    // Should modal auto close  after renaming is done
    const [shouldModalClose, setShouldModalClose] = useState(false)

    const handleRenameMedia = async () => {
        handleMediaName({name: null, oldName: null})
        await renameMedia({newName, editingName, originalName: oldName})
        setShouldModalClose(true)
    }

    const isRenameBtnDisabled = isItemRenaming || newName === editingName || newName === ''

    const closeModal = () => !isItemRenaming && handleModal({modalType: noModal})

    return (
        <AnimatedContainer onCLick={closeModal} shouldClose={shouldModalClose} zIndex='z-20'>
            <div className='
            w-screen
            h-screen
             absolute
             z-10
             flex
             justify-center
             items-center
             '>
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
        </AnimatedContainer>

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
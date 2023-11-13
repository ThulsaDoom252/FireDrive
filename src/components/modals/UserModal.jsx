import React, {useRef, useState} from 'react';
import {CgCloseR} from "react-icons/cg";
import {connect} from "react-redux";
import {changeAvatar} from "../../redux/authSlice";
import CurrentUser from "../user/CurrentUser";
import {noModal} from "../../common/common"
import ThemeBtn from "../common/theme/ThemeBtn";
import AnimatedContainer from '../../common/AnimatedContainer';
import {Box} from '@mui/material';
import {userModalStyles} from '../../common/styles';

const UserModal = ({
                       handleModal,
                       changeAvatar,
                       isAvatarLoading,
                   }) => {

    const hiddenFileInput = useRef(null)

    const [shouldModalClose, setShouldModalClose] = useState(false)

    const uploadPhoto = (e) => {
        e.stopPropagation()
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            changeAvatar({avatar: file});
        };
        input.click();
    };

    const handleClose = () => handleModal({modalType: noModal})

    return (
        <AnimatedContainer zIndex={'z-max'} onCLick={handleClose} shouldClose={shouldModalClose}>
            <Box
                style={userModalStyles}
            >
                <input type="file" hidden={true} ref={hiddenFileInput} onChange={uploadPhoto}/>
                <div className="
            absolute
            top-1
            right-2
            "
                     onClick={() => setShouldModalClose(true)}
                ><CgCloseR size={20} color={'gray'}/></div>
                <div className={'flex flex-col justify-center items-center'}>
                    <CurrentUser/>
                    <hr/>
                    <div className="w-full flex justify-end">
                        <ThemeBtn disabled={isAvatarLoading} className={'h-8'} onClick={uploadPhoto}>
                            Change Avatar
                        </ThemeBtn>
                    </div>

                </div>
            </Box>
        </AnimatedContainer>
    );
};


const mapStateToProps = (state) => {
    return {
        isAvatarLoading: state.auth.isAvatarLoading,
    }
}

export default connect(mapStateToProps, {changeAvatar})(UserModal);
import React, {useRef} from 'react';
import {CgCloseR} from "react-icons/cg";
import {connect} from "react-redux";
import {changeAvatar} from "../../redux/authSlice";
import CurrentUser from "../user/CurrentUser";
import {noModal} from "../../common/commonData";
import TransitionCommonParrent from "../common/TransitionCommonParrent";
import ActionBtn from "../common/ActionBtn";
import ThemeBtn from "../../common/theme/ThemeBtn";

const UserModal = ({
                       toggleModal,
                       changeAvatar,
                       isAvatarLoading,
                       showModal,
                   }) => {

    const hiddenFileInput = useRef(null)

    const uploadPhoto = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            changeAvatar({avatar: file});
        };
        input.click();
    };

    const handleClose = () => toggleModal(noModal)

    return (
        <TransitionCommonParrent show={showModal} toggleModal={toggleModal} zIndex={'z-max'}>
            <input type="file" hidden={true} ref={hiddenFileInput} onChange={uploadPhoto}/>
            <div className="
            absolute
            top-0
            right-0
            "
                 onClick={handleClose}
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
        </TransitionCommonParrent>


    );
};


const mapStateToProps = (state) => {
    return {
        isAvatarLoading: state.auth.isAvatarLoading,
    }
}

export default connect(mapStateToProps, {changeAvatar})(UserModal);
import React, {useRef} from 'react';
import {CgCloseR} from "react-icons/cg";
import {connect} from "react-redux";
import {changeAvatar} from "../../redux/authSlice";
import CurrentUser from "../user/CurrentUser";
import Modal from "./Modal";
import MyCustomTransition from "../common/MyCustomTransition";

const UserModal = ({
                       toggleModal,
                       changeAvatar,
                       isAvatarLoading,
                       modal,
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

    const handleClose = () => toggleModal(!modal)

    return (
        <MyCustomTransition show={modal}>
            <Modal>
                <input type="file" hidden={true} ref={hiddenFileInput} onChange={uploadPhoto}/>
                <div className="
            absolute
            top-0
            right-0
            "
                     onClick={handleClose}
                ><CgCloseR size={20} color={'gray'}/></div>
                <CurrentUser/>
                <hr/>
                <div className="w-full flex justify-end">
                    <button disabled={isAvatarLoading} onClick={uploadPhoto}
                            className='disabled:bg-gray-400 mb-3 bg-blue-500 text-white rounded mr-8'>Change
                        avatar
                    </button>
                </div>
            </Modal>
        </MyCustomTransition>


    );
};


const mapStateToProps = (state) => {
    return {
        isAvatarLoading: state.auth.isAvatarLoading,
    }
}

export default connect(mapStateToProps, {changeAvatar})(UserModal);
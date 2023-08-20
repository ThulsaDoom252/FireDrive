import React, {useRef} from 'react';
import {CgCloseR} from "react-icons/cg";
import {connect} from "react-redux";
import {changeAvatar} from "../../redux/authSlice";
import CurrentUser from "../user/CurrentUser";
import MyCustomTransition from "../common/MyCustomTransition";
import MyModal from "../common/MyModal";
import ModalContainer from "./ModalContainer";
import {noModal} from "../../common/commonData";

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
        <MyCustomTransition show={showModal}>
            <ModalContainer zIndex={'z-max'} handleClose={handleClose}>
                <MyModal width={'w-auto'} padding={'p-5'}>
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
                            <button disabled={isAvatarLoading} onClick={uploadPhoto}
                                    className='disabled:bg-gray-400 mb-3 bg-blue-500 text-white rounded mr-8'>Change
                                avatar
                            </button>
                        </div>

                    </div>
                </MyModal>
            </ModalContainer>
        </MyCustomTransition>


    );
};


const mapStateToProps = (state) => {
    return {
        isAvatarLoading: state.auth.isAvatarLoading,
    }
}

export default connect(mapStateToProps, {changeAvatar})(UserModal);
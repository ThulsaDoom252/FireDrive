import React, {useRef} from 'react';
import {CgCloseR} from "react-icons/cg";
import {connect} from "react-redux";
import {changeAvatar} from "../../redux/authSlice";
import CurrentUser from "../user/CurrentUser";

const UserModal = ({
                       toggleModal,
                       changeAvatar,
                       isAvatarLoading,
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

    return (
        <div
            className='
            bg-white
            fixed
           top-1/2
        left-1/2
            transform -translate-x-1/2 -translate-y-1/2
            rounded
            w-userModal
            flex
            flex-col
            items-center
            justify-center
            transition'>
            <input type="file" hidden={true} ref={hiddenFileInput} onChange={uploadPhoto}/>
            <div className="
            absolute
            top-0
            right-0
            "
                 onClick={() => toggleModal(false)}
            ><CgCloseR size={20} color={'gray'}/></div>
            <CurrentUser/>
            <hr/>
            <div className="w-full flex justify-end">
                <button disabled={isAvatarLoading} onClick={uploadPhoto}
                        className='disabled:bg-gray-400 mb-3 bg-blue-500 text-white rounded mr-8'>Change
                    avatar
                </button>
            </div>


        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        isAvatarLoading: state.auth.isAvatarLoading,
    }
}

export default connect(mapStateToProps, {changeAvatar})(UserModal);
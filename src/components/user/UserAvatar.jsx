import React from 'react';
import noAvatar from "../../images/noAvatar.png"
import {connect} from "react-redux";

const UserAvatar = ({avatar}) => {
    return (
        <div>
            <img className='rounded h-20 w-20' src={avatar || noAvatar} alt="avatar"/></div>
    );
};


const mapStateToProps = state => {
    return {
        avatar: state.auth.avatar
    }
}


export default connect(mapStateToProps, null)(UserAvatar);
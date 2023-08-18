import React from 'react';
import {connect} from "react-redux";

const UserEmail = ({email}) => {
    return (
        <span>
            {email}
        </span>
    );
};


const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
}

export default connect(mapStateToProps, null)(UserEmail);
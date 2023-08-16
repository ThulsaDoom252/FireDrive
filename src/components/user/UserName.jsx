import React from 'react';
import {connect} from "react-redux";

const UserName = ({
                      username
                  }) => {
    return (
        <span>
            {username}
        </span>
    );
};

const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps, null)(UserName);
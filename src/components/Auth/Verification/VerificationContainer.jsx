import React from 'react';
import Verification from "./Verification";
import {connect} from "react-redux";
import {
    handleLogout,
    sendVerificationEmail,
} from "../../../redux/authSlice";
import {Navigate} from "react-router-dom";
import {signInRoute} from "../../../common/commonData";

const VerificationContainer = ({
                                   verificationMode,
                                   handleLogout,
                                   sendVerificationEmail,
                                   email,
                                   username,
                                   verificationTimerValue,
                                   startVerificationTimer,
                                   isVerificationEmailSend,

                               }) => {


    if (!verificationMode) {
        return <Navigate to={signInRoute}/>
    }

    return <Verification {...{
        sendVerificationEmail,
        handleLogout,
        email,
        username,
        verificationTimerValue,
        startVerificationTimer,
        isVerificationEmailSend,
    }}/>
};

const mapStateToProps = state => {
    return {
        isVerificationEmailSend: state.auth.isVerificationEmailSend,
        email: state.auth.email,
        verificationMode: state.auth.verificationMode,
        username: state.auth.username,
        verificationTimerValue: state.auth.verificationTimerValue,
    }
}


export default connect(mapStateToProps, {
    sendVerificationEmail,
    handleLogout,
})(VerificationContainer);
import React, {useState} from 'react';
import Restore from "./Restore";
import {connect} from "react-redux";
import {sendRestoreEmail} from "../../../redux/authSlice";

const RestoreContainer = ({sendRestoreEmail, isRestoreEmailSend, restoreTimerValue}) => {
    const [restoreEmail, setRestoreEmail] = useState('')
    const [restoreEmailTypeError, setRestoreEmailTypeError] = useState(false)

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return new Promise ((r) => {
            const isValidEmail =  emailPattern.test(email);
            r(isValidEmail)
        } )


    };

    const handleSendEmail = async () => {
        const isEmailValidate = await validateEmail(restoreEmail)
        if (isEmailValidate) {
            sendRestoreEmail(restoreEmail)
        } else {
            setRestoreEmailTypeError(true)
        }
    }

    const handleInputChange = e => {
        restoreEmailTypeError && setRestoreEmailTypeError(false)
        setRestoreEmail(e.currentTarget.value)
    }


    return <Restore {...{isRestoreEmailSend, restoreTimerValue, restoreEmail, restoreEmailTypeError,
        handleSendEmail, handleInputChange}}/>;
};

const mapStateToProps = state => {
    return {
        isRestoreEmailSend: state.auth.isRestoreEmailSend,
        restoreTimerValue: state.auth.restoreTimerValue,
    }
}


export default connect(mapStateToProps, {sendRestoreEmail})(RestoreContainer);
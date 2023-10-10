import React, {useEffect} from 'react';
import SignUp from "./SignUp";
import {rootRoute, verificationRoute} from "../../../common/commonData";
import {Navigate} from "react-router-dom"
import {handleEmailAndPasswordSignUp, setAuthError} from "../../../redux/authSlice";
import {connect} from "react-redux";

const SignUpContainer = ({
                             isAuth,
                             emailPasswordSignup,
                             isAuthBtnFetching,
                             setAuthError,
                             verificationMode

}) => {
    useEffect(() => {
        setAuthError('')
    }, [])

    if (verificationMode) {
        return <Navigate to={verificationRoute}/>
    }

    if (isAuth) {
        return <Navigate to={rootRoute}/>
    }

    return <SignUp {...{emailPasswordSignup, isAuthBtnFetching}}/>
};

const mapStateToProps = (state) => {
    return {
        verificationMode: state.auth.verificationMode,
        isAuthBtnFetching: state.auth.isAuthBtnFetching,
    }
}

export default connect(mapStateToProps, {
    emailPasswordSignup: handleEmailAndPasswordSignUp,
    setAuthError
})(SignUpContainer);
import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import {rootRoute, verificationRoute} from "../../../common/commonData";
import SignIn from "./SignIn";
import {connect} from "react-redux";
import {githubAuth, googleAuth, handleLogin, setAuthError} from "../../../redux/authSlice";
import {useNavigate} from "react-router";

const SignInContainer = ({
                             isAuth,
                             handleLogin,
                             authError,
                             isAuthBtnFetching,
                             setAuthError,
                             verificationMode,
                             githubAuth,
                         }) => {
    useEffect(() => {
        setAuthError('')
    }, [])

    const navigate = useNavigate()

    useEffect(() => {
        if (verificationMode) {
            navigate(verificationRoute);
        }
    }, [verificationMode]);

    if (isAuth) {
        debugger
        return <Navigate to={rootRoute}/>
    }

    return <SignIn {...{
        handleLogin, authError, isAuthBtnFetching, googleAuth,
        githubAuth,
    }}/>
};

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        isAuthBtnFetching: state.auth.isAuthBtnFetching,
        verificationMode: state.auth.verificationMode,
    }
}

export default connect(mapStateToProps, {
    handleLogin,
    setAuthError,
    githubAuth,
})(SignInContainer);
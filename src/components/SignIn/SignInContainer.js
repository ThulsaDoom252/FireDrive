import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import {rootRoute,} from "../../common/commonData";
import SignIn from "./SignIn";
import {connect} from "react-redux";
import {githubAuth, googleAuth, handleLogin, setAuthError} from "../../redux/authSlice";

const SignInContainer = ({
                             isAuth, handleLogin, authError, isAuthBtnFetching, setAuthError,
                         }) => {
    useEffect(() => {
        setAuthError('')
    }, [])


    if (isAuth) {
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
    }
}

export default connect(mapStateToProps, {
    handleLogin,
    setAuthError,
})(SignInContainer);
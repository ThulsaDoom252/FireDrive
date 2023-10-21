import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {delay, rootRoute} from "../../common/common";
import Auth from "./Auth";
import {
    checkUserVerification,
    githubAuth,
    googleAuth,
    handleEmailAndPasswordSignUp,
    handleLogin, handleLogout, sendRestoreEmail,
    sendVerificationEmail,
    setAuthError, setAuthMode
} from "../../redux/authSlice";
import {connect} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {restoreMode, signInMode, signUpMode, verificationMode} from "./authTypes";

const AuthContainer = ({
                           isAuth,
                           handleLogin,
                           authError,
                           isAuthBtnFetching,
                           currentUserEmail,
                           setAuthError,
                           githubAuth,
                           smallScreen,
                           handleEmailAndPasswordSignUp,
                           sendVerificationEmail,
                           handleLogout,
                           isVerificationEmailSend,
                           verificationTimerValue,
                           username,
                           authMode,
                           setAuthMode,
                           isRestoreEmailSend,
                           isVerificationCheckBtnFetching,
                           checkUserVerification,
                           restoreTimerValue,
                           sendRestoreEmail,
                       }) => {

    const isSignInMode = authMode === signInMode
    const isSignUpMode = authMode === signUpMode
    const isRestoreMode = authMode === restoreMode
    const isVerificationMode = authMode === verificationMode

    const [showPassword, setShowPassword] = useState(false)


    const authForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
            password2: '',
            passwordsMismatch: false,
        },
        validationSchema: Yup.object({
            email: (isSignInMode || isSignUpMode || isRestoreMode) && Yup.string().email('use email format').required('email required'),
            password: (isSignInMode || isSignUpMode) && Yup.string().min(10, 'Password must contain minimum 10 characters').required('password required'),
            password2: isSignUpMode && Yup.string().required(`Can't be empty`),
            username: isSignUpMode && Yup.string().min(5).max(20).required('username required'),
        }),
        onSubmit: ({email, password, username}) => {
            if (isSignInMode) {
                handleLogin({email, password})
                return
            }

            if (isSignUpMode) {
                values.passwordsMismatch === true && authForm.setValues({passwordsMismatch: false})
                if (values.password === values.password2) {
                    handleEmailAndPasswordSignUp({email, password, username})
                } else {
                    authForm.setValues({passwordsMismatch: true})
                }
                return
            }

            if (isVerificationMode) {
                sendVerificationEmail({isVerificationMode})
                return
            }

            if (isRestoreMode) {
                sendRestoreEmail(email)
            }
        },

        validateOnChange: false,
        validateOnBlur: false,
    })

    useEffect(() => {

        const setSignUpData = async () => {
            await delay(200)
            authForm.setFieldValue('email', 'thulsaDev@proton.me')
            authForm.setFieldValue('password', 'devastator252')
            authForm.setFieldValue('password2', 'devastator252')
            authForm.setFieldValue('username', 'thulsa')
        }


        if (isSignUpMode) {
            setSignUpData().then(() => void 0)
        }

    }, [authMode])

    useEffect(() => {
        setAuthError('')
        authForm.resetForm()
    }, [authMode])

    const values = authForm.values
    const errors = authForm.errors
    const handleChange = authForm.handleChange
    const handleSubmit = authForm.handleSubmit

    if (isAuth) {
        return <Navigate to={rootRoute}/>
    }

    return (
        <>
            <Auth {...{
                email: currentUserEmail,
                authError,
                isAuthBtnFetching,
                googleAuth,
                githubAuth,
                smallScreen,
                isSignInMode,
                isSignUpMode,
                isVerificationMode,
                isRestoreMode,
                setAuthMode,
                handleLogout,
                username,
                isVerificationEmailSend,
                verificationTimerValue,
                handleSubmit,
                errors,
                handleChange,
                values,
                showPassword,
                setShowPassword,
                isRestoreEmailSend,
                isVerificationCheckBtnFetching,
                checkUserVerification,
                restoreTimerValue,
            }}/>
        </>
    )
};
const mapStateToProps = (state) => {
    return {
        authMode: state.auth.authMode,
        isAuthBtnFetching: state.auth.isAuthBtnFetching,
        isVerificationEmailSend: state.auth.isVerificationEmailSend,
        verificationTimerValue: state.auth.verificationTimerValue,
        restoreTimerValue: state.auth.restoreTimerValue,
        username: state.auth.username,
        authError: state.auth.authError,
        isRestoreEmailSend: state.auth.isRestoreEmailSend,
        currentUserEmail: state.auth.email,
        isVerificationCheckBtnFetching: state.auth.isVerificationCheckBtnFetching,

    }
}

export default connect(mapStateToProps, {
    handleLogin,
    githubAuth,
    handleEmailAndPasswordSignUp,
    setAuthError,
    sendVerificationEmail,
    sendRestoreEmail,
    handleLogout,
    setAuthMode,
    checkUserVerification,
})(AuthContainer);


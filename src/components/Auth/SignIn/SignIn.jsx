import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";
import {restoreRoute, signUpRoute} from "../../../common/commonData";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import ActionBtn from "../../common/ActionBtn";
import SocialAuth from "../SocialAuth";
import ActionInput from "../../common/ActionInput";

const SignIn = ({
                    handleLogin, authError, isAuthBtnFetching, googleAuth,
                    githubAuth,
                }) => {
    const signInForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('use email format').required('email required'),
            password: Yup.string().min(10, 'Password must contain minimum 10 characters').required('password required'),
        }),
        onSubmit: ({email, password}) => {
            handleLogin({email, password})
        },

        validateOnChange: false,
        validateOnBlur: false,
    })

    const values = signInForm.values
    const errors = signInForm.errors
    const handleChange = signInForm.handleChange
    const handleSubmit = signInForm.handleSubmit

    return (
        <div
            className='
            font-sans
            font-serif
            container-fluid
            h-screen
            mx-auto
            flex
            flex-col
            justify-center
            items-center
            max-w-lg'>
            <form className='
            mx-auto
            w-full
            h-fit
            flex
            justify-center
            items-center
            rounded'
                  onSubmit={handleSubmit}>
                <div className={'container-fluid max-auto max-w-screen-sm p-2'}>
                    <h4 className='text-center mb-2 text-2xl'>Welcome guest</h4>
                    <ActionInput
                        type={'text'}
                        placeholder={'email'}
                        errorType={errors.email}
                        onChange={handleChange}
                        id={'email'}
                        value={values.email}
                    />

                    {<span className={'text-red-500'}>{errors.email}</span>}
                    <ActionInput
                        type={'password'}
                        placeholder={'password'}
                        errorType={errors.password}
                        onChange={handleChange}
                        id={'password'}
                        value={values.password}
                    />
                    {<span className={'text-red-500'}>{errors.password}</span>}
                    <div className='w-full mt-10'>
                        <button type={"submit"}
                                className={' btn btn-outline-primary w-full'}
                                disabled={isAuthBtnFetching}
                                onClick={handleSubmit}>Log in
                        </button>
                    </div>
                    <SocialAuth {...{googleAuth, githubAuth}}/>
                    <hr/>
                    {<div className={'text-red-500 text-center  text-lg'}>{authError}</div>}
                    <div className={'text-center'}>Not registered? <NavLink to={signUpRoute}
                                                                            className={'text-blue-300'}>Create an
                        account</NavLink></div>
                    <div className={'text-center mt-3'}>
                        <NavLink to={restoreRoute} className={'no-underline'}>
                            Forgot login/password?
                        </NavLink>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default SignIn;
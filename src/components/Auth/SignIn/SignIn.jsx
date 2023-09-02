import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";
import {restoreRoute, signUpRoute} from "../../../common/commonData";
import SocialAuth from "../SocialAuth";
import ActionInput from "../../common/ActionInput";
import ActionBtn from "../../common/ActionBtn";
import Logo from "../../../images/logo.png"
import Image from "../../media/Image"

const SignIn = ({
                    handleLogin, authError, isAuthBtnFetching, googleAuth,
                    githubAuth, smallScreen,
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

    const inputContainerStyle = 'relative flex flex-col h-inputContainerHeight mt-3'
    const errorStyle = 'absolute bottom-0 left-1 text-red-600'

    return (
        <div
            className='
            font-sans
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
                    <div className={'w-full h-fit flex justify-center items-center'}>
                        <Image
                            height={'h-50'}
                            width={'w-40'}
                            url={Logo}
                            imageIsClickable={false}
                        />
                    </div>
                    <div className={inputContainerStyle}>
                        <ActionInput
                            type={'email'}
                            placeholder={'email'}
                            errorType={errors.email}
                            onChange={handleChange}
                            id={'email'}
                            value={values.email}
                        />
                        {<span className={errorStyle}>{errors.email}</span>}
                    </div>

                    <div className={inputContainerStyle}>
                        <ActionInput
                            type={'password'}
                            placeholder={'password'}
                            errorType={errors.password}
                            onChange={handleChange}
                            id={'password'}
                            value={values.password}
                        />
                        {<span className={errorStyle}>{errors.password}</span>}
                    </div>

                    <div className='w-full mt-3 relative'>
                        <ActionBtn type={'submit'}
                                   btnStyle={'auth'}
                                   isFullWidth={true}
                                   isDisabled={isAuthBtnFetching}
                                   handleClick={handleSubmit}>Log in
                        </ActionBtn>
                        {<div className={`
                        text-red-500 
                        text-center
                        w-full 
                        text-lg 
                        absolute 
                        top-minus30`}>{authError}</div>}
                    </div>
                    <SocialAuth {...{googleAuth, githubAuth, smallScreen}}/>
                    <hr/>

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
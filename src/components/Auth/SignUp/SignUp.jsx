import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {signInRoute} from "../../../common/commonData";
import {NavLink} from "react-router-dom";
import ActionBtn from "../../common/ActionBtn";
import ActionInput from "../../common/ActionInput";
import Image from "../../Media/Image";
import Logo from "../../../images/logo.png";


const testEmail = 'thulsaDev@proton.me'
const testPassword = 'devastator252'
const testUserName = 'teta252'

const SignUp = ({emailPasswordSignup, isAuthBtnFetching}) => {
    const signUpForm = useFormik({
        initialValues: {
            email: testEmail,
            password: testPassword,
            password2: testPassword,
            passwordsMismatch: false,
            username: testUserName,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('use email format').required('email required'),
            password: Yup.string().required('password required'),
            username: Yup.string().min(5).max(20).required('username required'),
            password2: Yup.string().required(`Can't be empty`),
        }),
        onSubmit: ({email, password, username}) => {
            values.passwordsMismatch === true && signUpForm.setValues({passwordsMismatch: false})
            if (values.password === values.password2) {
                emailPasswordSignup({email, password, username})
            } else {
                signUpForm.setValues({passwordsMismatch: true})
                values.passwordsMismatch = true
            }

        },
        validateOnChange: false,
        validateOnBlur: false,
    })

    const values = signUpForm.values
    const errors = signUpForm.errors
    const handleChange = signUpForm.handleChange
    const handleSubmit = signUpForm.handleSubmit


    return (
        <div
            className={'container-fluid h-screen max-w-xl mx-auto flex flex-col justify-center items-center max-w-2xl'}>
            <form className={'mx-auto w-full h-fit  flex justify-center items-center rounded'}
                  onSubmit={handleSubmit}>
                <div className={'max-auto max-w-screen-sm p-3 relative'}>
                    <div className={'w-full h-fit flex justify-center items-center'}>
                        <Image
                            height={'h-50'}
                            width={'w-40'}
                            url={Logo}
                            imageIsClickable={false}
                        />
                    </div>
                    <ActionInput
                        errorType={errors.email}
                        onChange={handleChange}
                        id={'email'}
                        value={values.email}
                        type={'text'}
                        placeholder={'email'}/>
                    {<span className={'text-red-500'}>{errors.email}</span>}
                    <ActionInput
                        errorType={errors.password}
                        onChange={handleChange}
                        id={'password'}
                        value={values.password}
                        type={'password'}
                        placeholder={'password'}/>
                    {<span className={'text-red-500'}>{errors.password}</span>}
                    <ActionInput
                        errorType={errors.password2}
                        onChange={handleChange}
                        id={'password2'}
                        value={values.password2}
                        type={'password'}
                        placeholder={'Repeat password'}/>
                    {<span className={'text-red-500'}>{errors.password2}</span>}
                    <ActionInput
                        errorType={errors.username}
                        onChange={handleChange}
                        id={'username'}
                        value={values.username}
                        type={'text'}
                        placeholder={'username'}/>
                    {<span className={'text-red-500'}>{errors.username}</span>}
                    <div className={'mt-5'}>
                        <ActionBtn isDisabled={isAuthBtnFetching} isFullWidth={true} btnStyle={'auth'}
                                   type={'submit'}>Sign
                            up
                        </ActionBtn>
                    </div>
                    <div
                        className={'text-center mt-2 text-red-500'}>{values.passwordsMismatch && 'Passwords mismatch'}</div>
                    <div className={'text-center mt-5'}>Have an account? <NavLink to={signInRoute}
                                                                                  className={'text-blue-300'}>Log in
                        account</NavLink></div>
                </div>
            </form>
        </div>

    );
};

export default SignUp;
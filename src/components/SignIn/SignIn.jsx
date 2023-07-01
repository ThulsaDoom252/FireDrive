import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";
import {signUpRoute} from "../../common/commonData";

const SignIn = ({handleLogin, authError, isAuthBtnFetching}) => {
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
            className={'container-fluid h-screen max-w-xl mx-auto flex flex-col justify-center items-center max-w-2xl'}>
            <form className={'mx-auto w-full h-fit bg-white flex justify-center items-center rounded'}
                  onSubmit={handleSubmit}>
                <div className={'container-fluid max-auto max-w-screen-sm p-2'}>
                    <h5 className={'text-center mb-2 font-mono '}>Welcome to FireDrive</h5>
                    <input onChange={handleChange} id={'email'}
                           className={`p-2 w-full mt-5 h-10 rounded text-left bg-customInputColor ${errors.email ? 'border-2 border-rose-600' : ''}`}
                           value={values.email}
                           type={'text'}
                           placeholder={'email'}/>
                    {<span className={'text-red-500'}>{errors.email}</span>}
                    <input onChange={handleChange} id={'password'}
                           className={`p-2 w-full mt-5 h-10 rounded text-left bg-customInputColor ${errors.password ? 'border-2 border-rose-600' : ''}`}
                           value={values.password}
                           type={'password'}
                           placeholder={'password'}/>
                    {<span className={'text-red-500'}>{errors.password}</span>}
                    <button disabled={isAuthBtnFetching} className={'w-full btn btn-success mt-5 mb-2'} type={'submit'}
                            onClick={handleSubmit}>Log
                        in
                    </button>
                    {<div className={'text-red-500 text-center text-lg'}>{authError}</div>}
                    <div className={'text-center'}>Not registered? <NavLink to={signUpRoute}
                                                                            className={'text-blue-300'}>Create an
                        account</NavLink></div>
                </div>
            </form>
        </div>

    );
};

export default SignIn;
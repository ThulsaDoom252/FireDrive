import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";
import {signUpRoute} from "../../common/commonData";

const SignIn = () => {
    const signInForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('use email format').required('email is required field'),
            password: Yup.string().required('password is required field'),
        }),
        onSubmit: ({email, password}) => {
            console.log('submitted!')
        },

        validateOnChange: false,
        validateOnBlur: false,
    })

    const values = signInForm.values
    const errors = signInForm.errors
    const handleChange = signInForm.handleChange
    const handleSubmit = signInForm.handleSubmit
    const handleBlur = signInForm.handleBlur

    return (
        <div
            className={'container-fluid h-screen max-w-xl mx-auto flex flex-col justify-center items-center max-w-2xl'}>
            <form className={'mx-auto w-full h-fit bg-white flex justify-center items-center rounded'}>
                <div className={'max-auto max-w-screen-sm p-3 relative'}>
                    <div className={'text-center mb-2 font-mono '}>Welcome to FireDrive</div>
                    {<p className={'text-red-500 absolute top-custom-20'}>{errors.email}</p>}
                    <input onChange={handleChange} id={'login'}
                           className={`p-2 w-full mb-5 h-10 rounded text-left bg-customInputColor ${errors.email ? 'border-2 border-rose-600' : ''}`}
                           type={'text'}
                           placeholder={'email'}/>
                    {<p className={'text-red-500  absolute bottom-custom-50'}>{errors.password}</p>}
                    <input onChange={handleChange} id={'password'}
                           className={`p-2 w-full h-10 rounded text-left bg-customInputColor ${errors.email ? 'border-2 border-rose-600' : ''}`}
                           type={'text'}
                           placeholder={'password'}/>
                    <button className={'w-full btn btn-success mt-5 mb-5'} onClick={handleSubmit}>Log in</button>
                    <div className={'text-center'}>Not registered? <NavLink to={signUpRoute}
                                                                            className={'text-blue-300'}>Create an
                        account</NavLink></div>
                </div>
            </form>
        </div>

    );
};

export default SignIn;
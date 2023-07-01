import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {signInRoute} from "../../common/commonData";
import {NavLink} from "react-router-dom";

const SignUp = () => {
    const signUpForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            userName: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('use email format').required('email is required'),
            password: Yup.string().required('password is required'),
            username: Yup.string().min(5).max(10).required('username is required')
        }),
        onSubmit: ({email, password}) => {
            console.log('submitted!')
        },

        validateOnChange: false,
        validateOnBlur: false,
    })

    const values = signUpForm.values
    const errors = signUpForm.errors
    const handleChange = signUpForm.handleChange
    const handleSubmit = signUpForm.handleSubmit
    const handleBlur = signUpForm.handleBlur

    return (
        <div
            className={'container-fluid h-screen max-w-xl mx-auto flex flex-col justify-center items-center max-w-2xl'}>
            <form className={'mx-auto w-full h-fit bg-white flex justify-center items-center rounded'}>
                <div className={'max-auto max-w-screen-sm p-3 relative'}>
                    <div className={'text-center mb-2 font-mono '}>Create an account</div>
                    {<p className={'text-red-500 absolute top-custom-20'}>{errors.email}</p>}
                    <input onChange={handleChange} id={'login'}
                           className={`p-2 w-full  h-10 rounded text-left bg-customInputColor ${errors.email ? 'border-2 border-rose-600' : ''}`}
                           type={'text'}
                           placeholder={'email'}/>
                    {<p className={'text-red-500  absolute bottom-custom-50'}>{errors.password}</p>}
                    <input onChange={handleChange} id={'password'}
                           className={`p-2 w-full h-10 mt-5 rounded text-left bg-customInputColor ${errors.password ? 'border-2 border-rose-600' : ''}`}
                           type={'text'}
                           placeholder={'password'}/>

                    <input onChange={handleChange} id={'text'}
                           className={`p-2 w-full h-10 rounded  mt-5 text-left bg-customInputColor ${errors.password ? 'border-2 border-rose-600' : ''}`}
                           type={'text'}
                           placeholder={'username'}/>

                    <button className={'w-full btn btn-success mt-5 mb-5'} onClick={handleSubmit}>Sign up</button>
                    <div className={'text-center'}>Have an account? <NavLink to={signInRoute}
                                                                             className={'text-blue-300'}>Log in
                        account</NavLink></div>
                </div>
            </form>
        </div>

    );
};

export default SignUp;
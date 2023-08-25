import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {signInRoute} from "../../../common/commonData";
import {NavLink} from "react-router-dom";


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
            <form className={'mx-auto w-full h-fit bg-white flex justify-center items-center rounded'}
                  onSubmit={handleSubmit}>
                <div className={'max-auto max-w-screen-sm p-3 relative'}>
                    <h5 className={'text-center mb-2 font-mono '}>Create an account</h5>
                    <input onChange={handleChange} id={'email'}
                           className={`p-2 w-full  h-10 rounded text-left bg-customInputColor ${errors.email ? 'border-2 border-rose-600' : ''}`}
                           value={values.email}
                           type={'text'}
                           placeholder={'email'}/>
                    {<span className={'text-red-500'}>{errors.email}</span>}
                    <input onChange={handleChange} id={'password'}
                           className={`p-2 w-full h-10 mt-5 rounded text-left bg-customInputColor ${errors.password ? 'border-2 border-rose-600' : ''}`}
                           value={values.password}
                           type={'password'}
                           placeholder={'password'}/>
                    {<span className={'text-red-500'}>{errors.password}</span>}
                    <input onChange={handleChange} id={'password2'}
                           className={`p-2 w-full h-10 mt-5 rounded text-left bg-customInputColor ${errors.password2 ? 'border-2 border-rose-600' : ''}`}
                           value={values.password2}
                           type={'password'}
                           placeholder={'repeat password'}/>
                    {<span className={'text-red-500'}>{errors.password2}</span>}
                    <input onChange={handleChange} id={'username'}
                           className={`p-2 w-full h-10 rounded  mt-5 text-left bg-customInputColor ${errors.password ? 'border-2 border-rose-600' : ''}`}
                           value={values.username}
                           type={'text'}
                           placeholder={'username'}/>
                    {<span className={'text-red-500'}>{errors.username}</span>}
                    <button disabled={isAuthBtnFetching} className={'w-full btn btn-success mt-5'}
                            type={'submit'}>Sign
                        up
                    </button>
                    <div
                        className={'text-center mt-2 text-red-500'}>{values.passwordsMismatch && 'Passwords mismatch'}</div>
                    <div className={'text-center'}>Have an account? <NavLink to={signInRoute}
                                                                             className={'text-blue-300'}>Log in
                        account</NavLink></div>
                </div>
            </form>
        </div>

    );
};

export default SignUp;
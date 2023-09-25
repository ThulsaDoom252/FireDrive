import React, {useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {signInRoute} from "../../../common/commonData";
import {NavLink} from "react-router-dom";
import ActionBtn from "../../common/ActionBtn";
import ActionInput from "../../common/ActionInput";
import Image from "../../media/Image";
import Logo from "../../../images/logo.png";
import {Button, IconButton, TextField, Tooltip} from "@mui/material";
import {authInput} from "../../mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import {Visibility, VisibilityOff} from "@mui/icons-material";


const testEmail = 'thulsaDev@proton.me'
const testPassword = 'devastator252'
const testUserName = 'teta252'

const SignUp = ({emailPasswordSignup, isAuthBtnFetching}) => {

    const [showPassword, setShowPassword] = useState(false)
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
            }

        },
        validateOnChange: false,
        validateOnBlur: false,
    })

    const values = signUpForm.values
    const errors = signUpForm.errors
    const handleChange = signUpForm.handleChange
    const handleSubmit = signUpForm.handleSubmit
    const inputContainerStyle = 'h-signUpInputContainerHeight mt-4  w-full'


    return (
        <div
            className={'container-fluid h-screen max-w-xl mx-auto flex flex-col justify-center items-center max-w-2xl'}>
            <form className={'mx-auto w-full h-fit  flex justify-center items-center rounded'}
                  onSubmit={handleSubmit}>
                <div className={'max-auto max-w-screen-sm container-fluid p-3 relative'}>
                    <div className={'w-full h-fit flex justify-center items-center'}>
                        <Image
                            height={'h-50'}
                            width={'w-40'}
                            url={Logo}
                            imageIsClickable={false}
                        />
                    </div>
                    <div className={inputContainerStyle}>
                        <TextField id="email"
                                   fullWidth
                                   label="Email"
                                   error={errors.email}
                                   helperText={errors.email}
                                   variant="outlined"
                                   onChange={handleChange}
                                   value={values.email}
                                   sx={authInput.textField}
                        />
                    </div>
                    <div className={inputContainerStyle}>
                        <TextField id="password"
                                   label="Password"
                                   fullWidth
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <Tooltip title={showPassword ? "Hide password" : "Show password"}>
                                                   <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                       {showPassword ? <VisibilityOff/> :
                                                           <Visibility/>}
                                                   </IconButton>
                                               </Tooltip>
                                           </InputAdornment>
                                       ),
                                       classes: {
                                           input: "text-base border-2 border-blue-500 bg-gray-500", // Установите размер шрифта для текстового поля
                                       },
                                   }}
                                   FormHelperTextProps={{
                                       classes: {
                                           root: "text-base", // Установите размер шрифта для helperText
                                       },
                                   }}
                                   error={errors.password || errors.passwordsMismatch}
                                   helperText={errors.password || errors.passwordsMismatch}
                                   type={showPassword ? 'text' : 'password'}
                                   variant="outlined"
                                   sx={authInput.textField}
                                   onChange={handleChange}
                                   value={values.password}/>
                    </div>
                    <div className={inputContainerStyle}>
                        <TextField id="password2"
                                   label="Repeat password"
                                   fullWidth
                                   error={errors.password2 || errors.passwordsMismatch}
                                   helperText={errors.password2}
                                   type={showPassword ? 'text' : 'password'}
                                   variant="outlined"
                                   sx={authInput.textField}
                                   onChange={handleChange}
                                   value={values.password2}/>
                    </div>
                    <div className={inputContainerStyle}>
                        <TextField id="username"
                                   fullWidth
                                   label="Username"
                                   error={errors.username}
                                   helperText={errors.username}
                                   variant="outlined"
                                   onChange={handleChange}
                                   value={values.username}
                                   sx={authInput.textField}
                        />
                    </div>
                    <div className={'w-full mt-4'}>
                        <Button disabled={isAuthBtnFetching} fullWidth variant={'contained'} type={'submit'}
                                color={'primary'}>
                            Sign up
                        </Button>
                    </div>
                    {/*<div*/}
                    {/*    className={'text-center mt-2 text-red-500'}>{values.passwordsMismatch && 'Passwords mismatch'}</div>*/}
                    <div className={'text-center mt-3'}>Have an account? <NavLink to={signInRoute}
                                                                                  className={'text-blue-300'}>Log in
                        account</NavLink></div>
                </div>
            </form>
        </div>

    );
};

export default SignUp;
import React, {useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";
import {restoreRoute, signUpRoute} from "../../../common/commonData";
import SocialAuth from "../SocialAuth";
import ActionInput from "../../common/ActionInput";
import ActionBtn from "../../common/ActionBtn";
import Logo from "../../../images/logo.png"
import Image from "../../media/Image"
import {Button, IconButton, TextField, Tooltip} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import {LockOpen, Visibility, VisibilityOff} from "@mui/icons-material";
import {authInput, useStyles} from "../../mui/styles";

const SignIn = ({
                    handleLogin, authError, isAuthBtnFetching, googleAuth,
                    githubAuth, smallScreen,
                }) => {

        const [showPassword, setShowPassword] = useState(false)

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

        const classes = useStyles()

        const inputContainerStyle = 'mt-4 h-inputContainerHeight'

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
                            <TextField id="email"
                                       fullWidth
                                       className={classes.input}
                                       label="Email"
                                       error={errors.email || authError}
                                       helperText={errors.email}
                                       variant="outlined"
                                       InputLabelProps={{
                                           shrink: false,
                                       }}
                                       onChange={handleChange}
                                       value={values.email}
                                       // sx={authInput.textField}
                            />
                            {/*<ActionInput*/}
                            {/*    type={'email'}*/}
                            {/*    placeholder={'email'}*/}
                            {/*    errorType={errors.email}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    id={'email'}*/}
                            {/*    value={values.email}*/}
                            {/*/>*/}
                            {/*{<span className={errorStyle}>{errors.email}</span>}*/}
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
                                       error={errors.password || authError}
                                       helperText={errors.password}
                                       type={showPassword ? 'text' : 'password'}
                                       variant="outlined"
                                       sx={authInput.textField}
                                       onChange={handleChange}
                                       value={values.password}/>
                            {/*<ActionInput*/}
                            {/*    type={'password'}*/}
                            {/*    placeholder={'password'}*/}
                            {/*    errorType={errors.password}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    id={'password'}*/}
                            {/*    value={values.password}*/}
                            {/*/>*/}
                            {/*{<span className={errorStyle}>{errors.password}</span>}*/}
                        </div>

                        <div className='w-full mt-4 relative'>
                            <Button variant="contained" color="primary" type={'submit'} className={'w-full'}
                                    disabled={isAuthBtnFetching}>
                                Login
                            </Button>
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
    }
;

export default SignIn;
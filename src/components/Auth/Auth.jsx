import React from 'react';
import SocialAuth from "./SocialAuth";
import Logo from "../../images/logo.png"
import {Button, IconButton, TextField, Tooltip} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {customInput} from "../mui/styles";
import {restoreMode, signInMode, signUpMode} from "./authModes";

const Auth = ({
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
                  username,
                  email,
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
              }) => {
        const inputContainerStyle = 'mt-4 h-inputContainerHeight'

        const isFieldValid = (error) => typeof error === 'string'
        const isAuthError = (error) => error.length > 0

        const handleMode = () => {
            if (isSignUpMode || isVerificationMode || isRestoreMode) {
                setAuthMode(signInMode)
                return
            }
            if (isSignInMode) {
                setAuthMode(signUpMode)
            }
        }

        const screenWidth = window.innerWidth

        return (
            <div
                className={`
            font-sans
            ${screenWidth > 500 && 'mt-5'}
            pb-2
            rounded-md
            bg-gray-200
            bg-opacity-80
            max-w-lg
            mx-auto
            ${smallScreen && 'mb-20'}
            `}>
                <form onSubmit={handleSubmit}>
                    <div className={'container-fluid max-auto  max-w-screen-sm p-2'}>
                        <div className={'w-full h-fit flex justify-center items-center'}>
                            <img className='h-50 w-40' src={Logo} alt='logo'/>
                        </div>
                        {isVerificationMode &&
                            <div className={`
                        w-full 
                        flex 
                        flex-col 
                        justify-center 
                        items-center`}>
                                <h4 className='
                mt-2
                '>Welcome {username}</h4>
                                <h4 className='
                mt-2
                text-center
                '>Confirm link has been send to {email}</h4>
                                <p className='
                text-lg
                mt-2
                '>
                                    To ensure the security of our platform and protect our users from spam and bot
                                    registrations, we
                                    require
                                    all new users to verify their email address before they can access the full features of
                                    our
                                    site.

                                    To get started, please check your email inbox for a message from FireDrive containing
                                    your
                                    verification
                                    link. If you don't see the email, please check your spam folder or contact our support
                                    team for
                                    assistance.

                                    Once you have received your verification link, simply click on it to complete the
                                    verification process. You will then be able to access all of the features and services
                                    that
                                    FireDrive
                                    has to offer.</p>
                                <div>{isVerificationEmailSend && verificationTimerValue && `Dont get the link? Request another in: ${verificationTimerValue}`}</div>
                                <Button disabled={isVerificationCheckBtnFetching} onClick={checkUserVerification}>Check
                                    verification</Button>
                            </div>}

                        {!isVerificationMode &&
                            <div className={inputContainerStyle}>
                                <TextField id="email"
                                           sx={customInput.authField}
                                           disabled={isRestoreMode && isRestoreEmailSend}
                                           fullWidth
                                           label="Email"
                                           error={isFieldValid(errors.email) || isAuthError(authError)}
                                           helperText={errors.email}
                                           variant="outlined"
                                           onChange={handleChange}
                                           value={values.email}
                                />
                            </div>}
                        {(isSignInMode || isSignUpMode) &&
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
                                           error={isFieldValid(errors.password) || isAuthError(authError)}
                                           helperText={errors.password}
                                           type={showPassword ? 'text' : 'password'}
                                           variant="outlined"
                                           sx={customInput.authField}
                                           onChange={handleChange}
                                           value={values.password}/>
                            </div>}
                        {isSignUpMode && <>
                            <div className={inputContainerStyle}>
                                <TextField id="password2"
                                           label="Repeat password"
                                           fullWidth
                                           error={isFieldValid(errors.password2) || errors.passwordsMismatch}
                                           helperText={errors.password2}
                                           type={showPassword ? 'text' : 'password'}
                                           variant="outlined"
                                           sx={customInput.authField}
                                           onChange={handleChange}
                                           value={values.password2}/>
                            </div>
                            <div className={inputContainerStyle}>
                                <TextField id="username"
                                           fullWidth
                                           label="Username"
                                           error={isFieldValid(errors.username)}
                                           helperText={errors.username}
                                           variant="outlined"
                                           onChange={handleChange}
                                           value={values.username}
                                           sx={customInput.authField}
                                />
                            </div>
                        </>}
                        {isRestoreMode && <div className={'w-full flex flex-col justify-center items-center'}>
                            {isRestoreEmailSend && <>
                                <div className={'text-green-500'}>Restoration link has been sent</div>
                                <div>Dont receive it? You can request another in: {restoreTimerValue}</div>
                            </>}
                        </div>}

                        <div className='w-full mt-5 relative'>
                            <Button variant="contained"
                                    color="primary"
                                    type={'submit'}
                                    className={'w-full'}
                                    disabled={isVerificationMode ? isVerificationEmailSend : isRestoreMode ? isRestoreEmailSend : isAuthBtnFetching}>
                                {isSignUpMode ? 'Sign up'
                                    : (isVerificationMode || isRestoreMode) ? 'Send email'
                                        : 'Log in'}
                            </Button>
                            <div className={`
                        text-red-500 
                        text-center
                        w-full 
                        text-lg 
                        absolute 
                        top-minus30`}>{authError}</div>
                        </div>
                        {!isVerificationMode && <div className={'mt-2'}>
                            <SocialAuth {...{googleAuth, githubAuth, smallScreen}}/>
                            <hr className={'mt-2 h-0.5 bg-black'}/>
                        </div>}
                    </div>
                </form>
                <div className={'text-center flex justify-center items-center w-full mt-2'}>
                    <div hidden={isVerificationMode || isRestoreMode}>
                        {isSignUpMode ? 'Have an account?' : "Not with us yet?"}
                    </div>
                    <Button className={'text-blue-300 ml-2 cursor-pointer'}
                            onClick={handleMode}>
                        {isSignUpMode ? 'Login' : (isVerificationMode || isRestoreMode) ? 'Go back to login page' : 'Create an account'}
                    </Button>
                </div>
                {isSignInMode &&
                    <div className={`
                w-full 
                flex 
                mt-2
                justify-center 
                items-center`}>
                        <div>Forgot password?</div>
                        <Button
                            onClick={() => setAuthMode(restoreMode)}
                            className={`
                    ml-2 
                    text-blue-300 
                    cursor-pointer`}>
                            Restore
                        </Button>
                    </div>}
            </div>
        );
    }
;

export default Auth;
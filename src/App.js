import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {
    restoreRoute,
    signInRoute,
    signUpRoute,
    smallScreenWidth,
    verificationRoute,
    wrapperId
} from "./common/commonData";
import {connect, useDispatch, useSelector} from "react-redux";
import Main from "./components/Main";
import SignInContainer from "./components/Auth/SignIn/SignInContainer";
import SignUpContainer from "./components/Auth/SignUp/SignUpContainer";
import Initializing from "./components/Initializing";
import {
    authCheck, getRestoreCountDownInfo, getVerificationLinkStatusInfo, startRestoreTimer,
    startVerificationTimer,
    toggleRestoreEmailSendStatus,
    toggleVerificationEmailSendStatus
} from "./redux/authSlice";
import {Toaster} from "react-hot-toast";
import {getAuth} from "firebase/auth";
import VerificationContainer from "./components/Auth/Verification/VerificationContainer";
import BG from './images/BG.jpg'
import DESERT from './images/DESERT.jpg'
import {mainDayBg} from "./common/themes";
import RestoreContainer from "./components/Auth/RestoreContainer/RestoreContainer";
import {toggleSmallScreen} from "./redux/appSlice";

const App = ({
                 authCheck,
                 isAuth,
                 currentTheme,
                 smallScreen,
                 startVerificationTimer,
                 toggleVerificationEmailSendStatus,
                 toggleRestoreEmailSendStatus,
                 toggleSmallScreen,
             }) => {

    const auth = getAuth()
    const user = auth.currentUser
    const initializing = useSelector(state => state.app.initializing)

    const background = {
        background: `url(${currentTheme === mainDayBg ? BG : DESERT}) no-repeat`,
        backgroundSize: '100vw 100vh',
        backgroundPosition: 'center',
    }

    const dispatch = useDispatch()
    //
    // useEffect(() => {
    //     const isVerificationEmailSend = localStorage.getItem('isVerificationEmailSend')
    //     if (isVerificationEmailSend) {
    //         toggleVerificationEmailSendStatus(true)
    //         startVerificationTimer()
    //     }
    //
    //
    // }, [])
    //
    // useEffect(() => {
    //     const isRestoreEmailSend = localStorage.getItem('isRestoreEmailSend')
    //     if (isRestoreEmailSend) {
    //         toggleRestoreEmailSendStatus(true)
    //         startRestoreTimer()
    //     }
    //
    // }, [])

    useEffect(() => {
        getRestoreCountDownInfo({dispatch})
    }, []);

    useEffect(() => {
        if (user && !user?.emailVerified) {
            const email = user.email
            getVerificationLinkStatusInfo({email, dispatch})
                .then(() => void 0)
        }

    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    const handleResize = () => {
        toggleSmallScreen(window.innerWidth <= smallScreenWidth)
    }

    useEffect(() => {
        authCheck()
    }, [user])


    if (initializing) {
        return <Initializing {...{background}}/>
    }

    return (
        <BrowserRouter>
            <Toaster/>
            <div id={wrapperId}
                 className={`
                 ${currentTheme.mainBg}
                 bg-cover
                 bg-over 
                 bg-no-repeat
             w-screen 
             h-screen 
             relative 
             overflow-hidden`}>
                <Routes>
                    <Route exact path={signInRoute} element={<SignInContainer {...{isAuth, smallScreen}}/>}/>
                    <Route path={signUpRoute} element={<SignUpContainer  {...{isAuth}}/>}/>
                    <Route path={verificationRoute} element={<VerificationContainer/>}/>
                    <Route path={restoreRoute} element={<RestoreContainer/>}/>
                    <Route path={'*'} element={<Main {...{isAuth, currentTheme}}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {
        currentTheme: state.app.currentTheme,
        isAuth: state.auth.isAuthorized,
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {
    authCheck,
    startVerificationTimer,
    startRestoreTimer,
    toggleRestoreEmailSendStatus,
    toggleVerificationEmailSendStatus,
    toggleSmallScreen,
})(App)








































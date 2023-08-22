import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {signInRoute, signUpRoute, verificationRoute, wrapperId} from "./common/commonData";
import {connect, useSelector} from "react-redux";
import Main from "./components/Main";
import SignInContainer from "./components/Auth/SignIn/SignInContainer";
import SignUpContainer from "./components/Auth/SignUp/SignUpContainer";
import Initializing from "./components/Initializing";
import {authCheck} from "./redux/authSlice";
import {Toaster} from "react-hot-toast";
import {getAuth} from "firebase/auth";
import VerificationContainer from "./components/Auth/Verification/VerificationContainer";
import BG from './images/BG.jpg'
import DESERT from './images/DESERT.jpg'
import {dayTheme} from "./common/themes";

const App = ({authCheck, isAuth, currentTheme}) => {


    window.current = currentTheme

    const auth = getAuth()
    const user = auth.currentUser
    const initializing = useSelector(state => state.app.initializing)

    const background = {
        background: `url(${currentTheme === dayTheme ? BG : DESERT}) no-repeat`,
        backgroundSize: '100vw 100vh',
        backgroundPosition: 'center',
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
                 ${currentTheme}
                 bg-cover
                 bg-over 
                 bg-no-repeat
             w-screen 
             h-screen 
             relative 
             overflow-hidden`}>
                <Routes>
                    <Route exact path={signInRoute} element={<SignInContainer {...{isAuth}}/>}/>
                    <Route path={signUpRoute} element={<SignUpContainer  {...{isAuth}}/>}/>
                    <Route path={verificationRoute} element={<VerificationContainer/>}/>
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
    }
}

export default connect(mapStateToProps, {authCheck})(App)








































import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {signInRoute, signUpRoute, verificationRoute, wrapperId} from "./common/commonData";
import {connect, useSelector} from "react-redux";
import BG from "./components/BG.jpg";
import Main from "./components/Main";
import SignInContainer from "./components/Auth/SignIn/SignInContainer";
import SignUpContainer from "./components/Auth/SignUp/SignUpContainer";
import Initializing from "./components/Initializing";
import {authCheck} from "./redux/authSlice";
import {Toaster} from "react-hot-toast";
import {getAuth} from "firebase/auth";
import VerificationContainer from "./components/Auth/Verification/VerificationContainer";

const App = ({authCheck, isAuth}) => {

    const auth = getAuth()
    const user = auth.currentUser
    const initializing = useSelector(state => state.app.initializing)
    const background = {
        background: `url(${BG}) no-repeat`,
        backgroundSize: '100vw 100vh',
        backgroundPosition: 'center',
    }

    useEffect(() => {
        authCheck()
    }, [user])

    window.user = user


    if (initializing) {
        return <Initializing {...{background}}/>
    }

    return (
        <BrowserRouter>
            <Toaster/>
            <div style={background}
                 id={wrapperId}
                 className={`bg-center bg-over bg-no-repeat
             w-screen h-screen relative overflow-hidden`}>
                <Routes>
                    <Route exact path={signInRoute} element={<SignInContainer {...{isAuth}}/>}/>
                    <Route path={signUpRoute} element={<SignUpContainer  {...{isAuth}}/>}/>
                    <Route path={verificationRoute} element={<VerificationContainer/>}/>
                    <Route path={'*'} element={<Main {...{isAuth}}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuthorized,
    }
}

export default connect(mapStateToProps, {authCheck})(App);


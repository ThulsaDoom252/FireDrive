import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {
    signInRoute,
    smallScreenWidth,
    wrapperId
} from "./common/commonData";
import {connect, useSelector} from "react-redux";
import Main from "./components/Main";
import Initializing from "./components/Initializing";
import {
    authCheck, startRestoreTimer,
} from "./redux/authSlice";
import {Toaster} from "react-hot-toast";
import {getAuth} from "firebase/auth";
import BG from './images/BG.jpg'
import DESERT from './images/DESERT.jpg'
import {mainDayBg} from "./components/common/theme/themes";
import {toggleSmallScreen} from "./redux/appSlice";
import AuthContainer from "./components/Auth/AuthContainer";
import {Scrollbars} from "react-custom-scrollbars";

const App = ({
                 authCheck,
                 isAuth,
                 currentTheme,
                 smallScreen,
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

    useEffect(() => {
        const handleResize = () => {
            toggleSmallScreen(window.innerWidth
                <=
                smallScreenWidth
            )
        }
        window.addEventListener('resize', handleResize)
    }, [])

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
            overflow-y-hidden`}>
                <Scrollbars>
                    <Routes>
                        <Route exact path={signInRoute} element={<AuthContainer {...{isAuth, smallScreen}}/>}/>
                        {/*<Route path={signUpRoute} element={<SignUpContainer  {...{isAuth}}/>}/>*/}
                        {/*<Route path={verificationRoute} element={<VerificationContainer/>}/>*/}
                        {/*<Route path={restoreRoute} element={<RestoreContainer/>}/>*/}
                        <Route path={'*'} element={<Main {...{isAuth, currentTheme}}/>}/>
                    </Routes>
                </Scrollbars>
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
    startRestoreTimer,
    toggleSmallScreen,
})(App)








































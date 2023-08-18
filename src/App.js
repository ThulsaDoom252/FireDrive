import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {signInRoute, signUpRoute, wrapperId} from "./common/commonData";
import {connect, useSelector} from "react-redux";
import BG from "./components/BG.jpg";
import Main from "./components/Main";
import SignInContainer from "./components/SignIn/SignInContainer";
import SignUpContainer from "./components/SignUp/SignUpContainer";
import Initializing from "./components/Initializing";
import {authCheck} from "./redux/authSlice";
import {getAuth} from "firebase/auth";
import {Toaster} from "react-hot-toast";

const App = ({authCheck, isAuth}) => {
    const user = getAuth().currentUser
    const initializing = useSelector(state => state.app.initializing)
    const background = {
        background: `url(${BG}) no-repeat`,
        backgroundSize: '100vw 100vh',
        backgroundPosition: 'center',
    }


    window.user = user

    useEffect(() => {
        authCheck()
    }, [user])

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
                    <Route path={signUpRoute} element={<SignUpContainer {...{isAuth}}/>}/>
                    <Route path={'*'} element={<Main {...{isAuth}}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuthorized
    }
}

export default connect(mapStateToProps, {authCheck})(App);


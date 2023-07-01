import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {signInRoute, signUpRoute} from "./common/commonData";
import {useSelector} from "react-redux";
import BG from "./components/BG.jpg";
import Main from "./components/Main";
import SignInContainer from "./components/SignIn/SignInContainer";
import SignUpContainer from "./components/SignUp/SignUpContainer";
import Initializing from "./components/Initializing";


const App = () => {
    const isAuth = useSelector(state => state.auth.isAuthorized)
    const initializing = useSelector(state => state.app.initializing)
    const background = {
        background: `url(${BG}) no-repeat`,
        backgroundSize: '100vw 100vh',
        backgroundPosition: 'center',
    }

    if (initializing) {
        return <Initializing {...{background}}/>
    }

    return (
        <BrowserRouter>
            <div style={background}
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

export default App;


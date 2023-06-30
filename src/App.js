import React from 'react'
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Main from "./components/Main";


const App = () => {
    return (
        <BrowserRouter>
            <div className={'w-screen h-screen relative overflow-hidden'}>
                <Routes>
                    <Route path={'*'} element={<Main/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;


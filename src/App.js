import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./components/Main";

const App = () => {
    return (
        <BrowserRouter>
            <div className={'w-screen h-screen relative overflow-x-hidden overflow-y-hidden'}>
                <Routes>
                    <Route path={'*'} element={<Main/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;

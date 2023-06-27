import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./components/Main";

const App = () => {
    return (
        <BrowserRouter>
            <div className={'w-screen mx-auto h-screen'}>
                <Routes>
                    <Route path={'*'} element={<Main/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './config';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {AudioPlayerContextProvider} from "./context/AudioPlayerContext";
import {PagesContextProvider} from "./context/PagesContext";
import {BurgerMenuContextProvider} from "./context/BurgerMenuContext";
import PaginatorContextProvider from "./context/PaginatorContext";
import {ItemsModalContextProvider} from "./context/ItemsModalContext";
import {VideoControlsContextProvider} from "./context/VideoControlsContext";
import GridLayoutContextProvider from './context/GridLayoutContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AudioPlayerContextProvider>
            <VideoControlsContextProvider>
                <PagesContextProvider>
                    <BurgerMenuContextProvider>
                        <PaginatorContextProvider>
                            <ItemsModalContextProvider>
                                <GridLayoutContextProvider>
                                    <App/>
                                </GridLayoutContextProvider>
                            </ItemsModalContextProvider>
                        </PaginatorContextProvider>
                    </BurgerMenuContextProvider>
                </PagesContextProvider>
            </VideoControlsContextProvider>
        </AudioPlayerContextProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

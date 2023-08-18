import {combineReducers, configureStore} from '@reduxjs/toolkit'
import mediaSlice from "./mediaSlice";
import appSlice from "./appSlice";
import authSlice from "./authSlice";


const reducer = combineReducers({
    media: mediaSlice,
    app: appSlice,
    auth: authSlice,
})

export const store = configureStore({
    reducer
})

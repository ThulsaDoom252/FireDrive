import {combineReducers, configureStore} from '@reduxjs/toolkit'
import mediaSlice from "./mediaSlice";
import appSlice from "./appSlice";

const reducer = combineReducers({
    media: mediaSlice,
    app: appSlice,
})

export const store = configureStore({reducer})

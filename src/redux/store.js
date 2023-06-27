import {combineReducers, configureStore} from '@reduxjs/toolkit'
import mediaSlice from "./mediaSlice";

const reducer = combineReducers({
    media: mediaSlice,
})

export const store = configureStore({reducer})

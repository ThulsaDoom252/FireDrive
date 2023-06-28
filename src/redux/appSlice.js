import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {alertRemoveAll, delay} from "../common/commonData";
import {deleteAllMedia} from "./mediaSlice";


const appSlice = createSlice({
    name: 'app-slice',
    initialState: {
        smallScreen: window.innerWidth < 768,
        overlay: false,
        alert: false,
        alertMode: '',
        alertStyle: '',
    },
    reducers: {
        toggleSmallScreen(state, action) {
            state.smallScreen = action.payload
        },
        toggleOverlay(state, action) {
            state.overlay = action.payload
        },
        toggleAlert(state, action) {
            state.alert = action.payload
        },
        setAlertMode(state, action) {
            const {alertMode, style} = action.payload
            state.alertMode = alertMode
            if (style) {
                state.alertStyle = style
            }
        },
    }
})

export default appSlice.reducer
export const {toggleSmallScreen, toggleAlert, toggleOverlay, setAlertMode} = appSlice.actions


export const handleAlertAction = createAsyncThunk('alert-action-thunk', async ({
                                                                                   alertMode,
                                                                                   currentRoute,
                                                                                   currentMediaSet,
                                                                               }, {dispatch}) => {
    switch (alertMode) {
        case alertRemoveAll:
            dispatch(deleteAllMedia({currentRoute, currentMediaSet}))
            dispatch(handleAlert({overlayMode: true, toggle: false}))
            break

    }
})


export const handleAlert = createAsyncThunk('alert-thunk', async ({
                                                                      overlayMode,
                                                                      alertMode,
                                                                      alertStyle,
                                                                      toggle = true
                                                                  }, {dispatch}) => {
    dispatch(setAlertMode({mode: '', alertStyle: ''}))
    if (overlayMode) {
        dispatch(toggleOverlay(toggle))
    }
    if (alertMode) {
        dispatch(setAlertMode({alertMode, style: alertStyle}))
    }
    delay(500)
    dispatch(toggleAlert(toggle))
})

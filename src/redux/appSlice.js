import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {delay, removeAllMsg} from "../common/commonData";
import {deleteAllMedia} from "./mediaSlice";

const appSlice = createSlice({
    name: 'app-slice',
    initialState: {
        initializing: false,
        smallScreen: window.innerWidth < 768,
        horizontalMode: false,
        overlay: false,
        alert: false,
        alertStyle: '',
        alertContent: '',
    },
    reducers: {
        toggleSmallScreen(state, action) {
            state.smallScreen = action.payload
        },
        setAlertContent(state, action) {
            const {content, style} = action.payload
            state.alertContent = content
            if (style) {
                state.alertStyle = style
            }
        },
        toggleHorizontalMode(state, action) {
            state.horizontalMode = action.payload
        },
        toggleOverlay(state, action) {
            state.overlay = action.payload
        },
        toggleAlert(state, action) {
            state.alert = action.payload
        },
        toggleInitializing(state, action) {
            state.initializing = action.payload
        }
    }
})

export default appSlice.reducer
export const {
    toggleSmallScreen,
    toggleAlert,
    toggleOverlay,
    toggleInitializing,
    toggleHorizontalMode,
    setAlertContent,
} = appSlice.actions


export const handleAlertAction = createAsyncThunk('alert-action-thunk', async ({
                                                                                   alertContent,
                                                                               }, {dispatch}) => {

    switch (alertContent) {
        case removeAllMsg:
            dispatch(deleteAllMedia())
            dispatch(handleAlert({overlayMode: true, toggle: false}))
            break
        default:
            void 0

    }
})

export const handleAlert = createAsyncThunk('alert-thunk', async ({
                                                                      overlayMode = false,
                                                                      alertContent = '',
                                                                      alertStyle = null,
                                                                      toggle = true
                                                                  }, {dispatch}) => {
    dispatch(setAlertContent({content: '', alertStyle: ''}))
    if (overlayMode) {
        dispatch(toggleOverlay(toggle))
    }
    dispatch(setAlertContent({content: alertContent, style: alertStyle}))
    delay(50)
    dispatch(toggleAlert(toggle))
})

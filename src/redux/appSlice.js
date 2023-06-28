import {createSlice} from "@reduxjs/toolkit";


const appSlice = createSlice({
    name: 'app-slice',
    initialState: {
        smallScreen: window.innerWidth < 768
    },
    reducers: {
        toggleSmallScreen(state, action) {
            state.smallScreen = action.payload
        },
    }
})

export default appSlice.reducer
export const {toggleSmallScreen} = appSlice.actions
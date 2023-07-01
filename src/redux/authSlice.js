import {createSlice} from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth-slice',
    initialState: {
        email: '',
        userName: '',
        isAuthorized: false,
    },

    reducers: {
        setUserData(state, action) {
            const {email, userName} = action.payload
            state.userName = userName
            state.email = email
        },
        toggleAuthStatus(state, action) {
            state.isAuthorized = action.payload
        }
    }
})


export default authSlice.reducer
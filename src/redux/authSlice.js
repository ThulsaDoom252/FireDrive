import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    updateProfile,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'
import {handleAlert, toggleInitializing} from "./appSlice";


const authSlice = createSlice({
    name: 'auth-slice',
    initialState: {
        email: '',
        username: '',
        isAuthorized: false,
        isAuthBtnFetching: false,
        authError: '',
    },

    reducers: {
        setUserData(state, action) {
            const {email, username} = action.payload
            state.username = username
            state.email = email
        },
        toggleAuthStatus(state, action) {
            state.isAuthorized = action.payload
        },
        toggleFetchAuthBtn(state, action) {
            state.isAuthBtnFetching = action.payload
        },
        setAuthError(state, action) {
            state.authError = action.payload
        }
    }
})

export default authSlice.reducer
export const {setUserData, toggleAuthStatus, toggleFetchAuthBtn, setAuthError} = authSlice.actions

export const handleEmailAndPasswordSignUp = createAsyncThunk('email-password-signup-thunk', async ({
                                                                                                       email,
                                                                                                       password,
                                                                                                       username,
                                                                                                   }, {dispatch}) => {
    dispatch(toggleFetchAuthBtn(true))
    const auth = getAuth()
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password).catch(e => dispatch(setAuthError(e.code)))
        const user = userCredential.user
        await updateProfile(user, {
            displayName: username
        })
        dispatch(handleLogin({email, password}))
    } catch (e) {
        alert('Error in creating new account - see console for details')
        console.log(`error at creating account: ${e} `)
    }
    dispatch(toggleFetchAuthBtn(false))
});

export const handleLogin = createAsyncThunk('login-thunk', async ({email, password}, {dispatch}) => {
    const auth = getAuth()
    dispatch(toggleFetchAuthBtn(true))
    await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            dispatch(setAuthError(error.code))
        })
    dispatch(toggleFetchAuthBtn(false))
})

export const authCheck = createAsyncThunk('auth-check-thunk', async (_, {dispatch}) => {
    dispatch(toggleInitializing(true))
    try {
        const auth = await getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user === null) {
                dispatch(toggleAuthStatus(false))
                dispatch(setUserData({email: '', username: '',}))
            } else {
                const {email, displayName} = user
                dispatch(setUserData({email, username: displayName}))
                dispatch(toggleAuthStatus(true))
            }
            dispatch(toggleInitializing(false))
        })
    } catch (e) {
        handleAlert({dispatch}, error, e.toString())
    }
})

export const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
}



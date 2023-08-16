import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    updateProfile,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'

import {uploadBytes, ref, getDownloadURL} from "firebase/storage";

import {storage,} from "../firebase";
import {handleAlert, toggleInitializing} from "./appSlice";


const authSlice = createSlice({
    name: 'auth-slice',
    initialState: {
        email: '',
        username: '',
        avatar: '',
        isAuthorized: false,
        isAuthBtnFetching: false,
        authError: '',
        isAvatarLoading: false,
    },

    reducers: {
        setUserData(state, action) {
            const {email, username, avatar} = action.payload
            state.username = username
            state.email = email
            state.avatar = avatar
        },
        setUserAvatar(state, action) {
            state.avatar = action.payload
        },
        toggleAvatarLoading(state, action) {
            state.isAvatarLoading = action.payload
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
export const {
    setUserData,
    setUserAvatar,
    toggleAvatarLoading,
    toggleAuthStatus,
    toggleFetchAuthBtn,
    setAuthError
} = authSlice.actions

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

export const googleAuth = async () => {
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider)
        .then(() => console.log('auth goggle success'))
        .catch((e) => console.log(`auth google error: ${e}`))
}

export const githubAuth = async () => {
    const auth = getAuth()
    const githubProvider = new GithubAuthProvider()
    await signInWithPopup(auth, githubProvider).then(() => console.log('success')).catch((e) => {
        console.log(`GITHUB ERROR, ${e}`)
    })
}

export const authCheck = createAsyncThunk('auth-check-thunk', async (_, {dispatch}) => {
    dispatch(toggleInitializing(true))
    try {
        const auth = await getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user === null) {
                dispatch(toggleAuthStatus(false))
                dispatch(setUserData({email: '', username: '',}))
            } else {
                const {email, displayName, photoURL} = user
                debugger
                dispatch(setUserData({email, username: displayName, avatar: photoURL}))
                dispatch(toggleAuthStatus(true))
            }
            dispatch(toggleInitializing(false))
        })
    } catch (e) {
        handleAlert({dispatch}, e, e.toString())
    }
})

export const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
}

export const changeAvatar = createAsyncThunk('change-avatar-thunk', async ({avatar}, {dispatch}) => {
    const user = getAuth().currentUser
    const userName = user.displayName
    if (user) {
        dispatch(toggleAvatarLoading(true))
        const fileRef = ref(storage, `${userName}/userAvatar/${avatar.name}`);
        await uploadBytes(fileRef, avatar);
        const avatarUrl = await getDownloadURL(fileRef);
        await updateProfile(user, {
            displayName: user.displayName,
            photoURL: avatarUrl,
        });
        dispatch(setUserAvatar(avatarUrl));
        dispatch(toggleAvatarLoading(false))
    }


})



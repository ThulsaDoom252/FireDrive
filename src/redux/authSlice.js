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
    sendEmailVerification,
    signOut,
} from 'firebase/auth'
import {uploadBytes, ref, getDownloadURL} from "firebase/storage";
import {storage,} from "../firebase";
import {toggleInitializing} from "./appSlice";
import toast from "react-hot-toast";
import {generateRandomString} from "../common/commonData";


const authSlice = createSlice({
    name: 'auth-slice',
    initialState: {
        email: '',
        username: '',
        avatar: '',
        isVerificationEmailSend: false,
        verificationMode: false,
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
        toggleVerificationEmailSendStatus(state, action) {
            state.isVerificationEmailSend = action.payload
        },
        toggleAuthStatus(state, action) {
            state.isAuthorized = action.payload
        },
        toggleFetchAuthBtn(state, action) {
            state.isAuthBtnFetching = action.payload
        },
        setAuthError(state, action) {
            state.authError = action.payload
        },
        toggleVerificationMode(state, action) {
            state.verificationMode = action.payload
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
    setAuthError,
    toggleVerificationEmailSendStatus,
    toggleVerificationMode,
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
        .then((credentials) => {
            if (!credentials.user.emailVerified) {
                dispatch(sendVerificationEmail({}))
            }

        })
        .catch((error) => {
            dispatch(setAuthError(error.code))
        })
    debugger
    dispatch(toggleFetchAuthBtn(false))
})

export const sendVerificationEmail = createAsyncThunk('send-verification-thunk', async ({resend}, {dispatch}) => {
    debugger
    const auth = getAuth()
    const user = auth.currentUser
    try {
        await sendEmailVerification(user)
        debugger
        toast.success('email send')
    } catch (e) {
        toast.error('error...')
        console.log(`ERROR SENDING VERIFICATION EMAIL: ${e}`)
    }
})

export const googleAuth = async () => {
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider)
        .then(() => console.log('auth goggle success'))
        .catch((e) => console.log(`auth google error: ${e}`))
}

export const githubAuth = createAsyncThunk('github-auth-thunk', async (_, {dispatch}) => {
    const auth = getAuth()
    const githubProvider = new GithubAuthProvider()
    await signInWithPopup(auth, githubProvider)
        .then(async (credentials) => {
            if (credentials.user.displayName === null) {
                const user = credentials.user
                const randomNumber = generateRandomString(4)
                await updateProfile(user, {
                    displayName: `githubUser${randomNumber}`
                })
                dispatch(setUserData({
                    username: auth.currentUser.displayName,
                    email: user.email,
                    avatar: user.photoURL
                }))
                debugger
            }
        })
        .catch((e) => {
            console.log(`GITHUB ERROR, ${e}`)
        })
})

export const authCheck = createAsyncThunk('auth-check-thunk', async (_, {dispatch}) => {
    debugger
    dispatch(toggleInitializing(true))
    debugger
    try {
        debugger
        const auth = await getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user === null) {
                debugger
                dispatch(toggleAuthStatus(false))
                dispatch(setUserData({email: '', username: '', avatar: null}))
            }
            if (user) {
                debugger
                const {email, displayName, photoURL} = user
                dispatch(setUserData({email, username: displayName, avatar: photoURL}))
                if (user.providerData[0].providerId === 'github.com' || user.emailVerified) {
                    debugger
                    dispatch(toggleAuthStatus(true))
                } else {
                    dispatch(toggleVerificationMode(true))
                }
            }

            dispatch(toggleInitializing(false))

        })
    } catch (e) {
        console.log(`AUTH CHECK ERROR: ${e}`)
    }
})


export const handleLogout = createAsyncThunk('logout-thunk', async (_, {dispatch}) => {
    debugger
    const auth = await getAuth()
    if (!auth.currentUser.emailVerified) {
        await dispatch(toggleVerificationMode(false))
    }
    return signOut(auth)
})


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
        toast.success('Avatar changed')
    }


})



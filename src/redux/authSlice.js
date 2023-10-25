import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    updateProfile,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
    signOut,
} from 'firebase/auth'
import {uploadBytes, ref, getDownloadURL} from "firebase/storage";
import {database, storage,} from "../firebase";
import toast from "react-hot-toast";
import {extractUsernameFromEmail, generateRandomString} from "../common/common";
import {getTheme, toggleCurrentTheme, toggleInitializing} from "./appSlice";
import {restoreTimerInitialValue, verificationTimerInitialValue} from "../common/Timers";
import {ref as dbRef, set, query, equalTo, get, orderByChild, remove, update} from 'firebase/database';
import {signInMode, verificationMode} from "../components/Auth/authTypes";
import {dayTheme} from "../components/common/theme/themes";


const authSlice = createSlice({
    name: 'auth-slice',
    initialState: {
        email: '',
        username: '',
        avatar: '',
        lastRestoreLinkSentTo: '',
        isVerificationCheckBtnFetching: false,
        authMode: signInMode,
        isVerificationEmailSend: false,
        isRestoreEmailSend: false,
        verificationMode: false,
        isAuthorized: false,
        isAuthBtnFetching: false,
        authError: '',
        isAvatarLoading: false,
        verificationTimerValue: null,
        restoreTimerValue: null,
        verificationIntervalId: null,
        restoreIntervalId: null,
        isRestoreEmailRequested: false
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
        setLastRestoreLinkSendTo(state, action) {
            state.lastRestoreLinkSentTo = action.payload
        },
        toggleRestoreEmailSendStatus(state, action) {
            state.isRestoreEmailSend = action.payload
        },
        toggleVerificationBtnFetch(state, action) {
            state.isVerificationCheckBtnFetching = action.payload
        },
        setAuthMode(state, action) {
            debugger
            state.authMode = action.payload
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
        },
        setVerificationTimerValue(state, action) {
            state.verificationTimerValue = action.payload
        },
        setRestoreTimerValue(state, action) {
            state.restoreTimerValue = action.payload
        },
        setVerificationIntervalId(state, action) {
            state.verificationIntervalId = action.payload
        },
        setRestoreIntervalId(state, action) {
            state.restoreIntervalId = action.payload
        },
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
    toggleRestoreEmailSendStatus,
    toggleVerificationMode,
    setVerificationTimerValue,
    setRestoreTimerValue,
    toggleVerificationBtnFetch,
    setVerificationIntervalId,
    setLastRestoreLinkSendTo,
    setRestoreIntervalId,
    setAuthMode,
} = authSlice.actions

export const handleEmailAndPasswordSignUp = createAsyncThunk('email-password-signup-thunk', async ({
                                                                                                       email,
                                                                                                       password,
                                                                                                       username,
                                                                                                   }, {dispatch}) => {
    dispatch(toggleFetchAuthBtn(true))
    const auth = getAuth()
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            .catch(e => dispatch(setAuthError(e.code)))
        const user = userCredential.user
        await updateProfile(user, {
            displayName: username
        })
        await createUserInDb({username, email, isVerified: user.emailVerified})
        await dispatch(handleLogin({email, password, isSignedUp: true}))
        dispatch(sendVerificationEmail({}))
    } catch (e) {
        alert('Error in creating new account - see console for details')
        console.log(`error at creating account: ${e} `)
    }
    dispatch(toggleFetchAuthBtn(false))
});

export const handleLogin = createAsyncThunk('login-thunk', async ({
                                                                      email,
                                                                      password,
                                                                      isSignedUp = false
                                                                  }, {dispatch}) => {
    const auth = getAuth()
    dispatch(toggleFetchAuthBtn(true))
    await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            dispatch(setUserData({email, username: auth.currentUser.displayName}))
            !isSignedUp && getVerificationLinkStatusInfo(auth.currentUser.email)
        })
        .catch((error) => {
            dispatch(setAuthError(error.code))
        })
    dispatch(toggleFetchAuthBtn(false))
})

export const sendVerificationEmail = createAsyncThunk('send-verification-thunk', async ({isVerificationMode}, {dispatch}) => {
    const auth = getAuth()
    const user = auth.currentUser
    try {
        await sendEmailVerification(user)
        await updateVerificationLinkStatus(user.email, true)
        dispatch(toggleVerificationEmailSendStatus(true))
        !isVerificationMode && dispatch(setAuthMode(verificationMode))
        localStorage.setItem('verificationCounterValue', verificationTimerInitialValue)
        dispatch(startVerificationTimer())
    } catch (e) {
        console.log(`ERROR SENDING VERIFICATION EMAIL: ${e}`)
    }
})

export const sendRestoreEmail = createAsyncThunk('send-restore-email-thunk', async (email, {dispatch}) => {
    const auth = getAuth()
    const isExist = await isUserExist(email)
    if (isExist) {
        try {
            await sendPasswordResetEmail(auth, email)
            dispatch(setAuthError(''))
            localStorage.setItem('isRestoreEmailSend', true)
            dispatch(toggleRestoreEmailSendStatus(true))
            localStorage.setItem('restoreCounterValue', restoreTimerInitialValue)
            dispatch(startRestoreTimer())
            dispatch(setLastRestoreLinkSendTo(email))
        } catch (e) {
            toast.error('Error sending verification email, see console for details')
            console.log(`Send verification email error (if it persist, contact the developer:  ${e}`)
        }
    } else {
        dispatch(setAuthError('Email no found'))
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

            }
        })
        .catch((e) => {
            console.log(`GITHUB ERROR, ${e}`)
        })
})

export const authCheck = createAsyncThunk('auth-check-thunk', async (_, {dispatch}) => {
    dispatch(toggleInitializing(true))
    const isRestoreEmailRequested = localStorage.getItem('isRestoreEmailSend')
    if (isRestoreEmailRequested === "true") {
        dispatch(toggleRestoreEmailSendStatus(true))
        dispatch(startRestoreTimer())
    }
    try {
        const auth = await getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user === null) {
                dispatch(toggleAuthStatus(false))
                dispatch(toggleCurrentTheme({type: dayTheme}))
                dispatch(setUserData({email: '', username: '', avatar: null}))
            }
            if (user) {
                const {email, displayName, photoURL} = user
                dispatch(setUserData({email, username: displayName, avatar: photoURL}))
                const userTheme = await getTheme()
                dispatch(toggleCurrentTheme({type: userTheme}))
                debugger
                if (user.providerData[0].providerId === 'github.com' || user.emailVerified) {
                    dispatch(toggleAuthStatus(true))
                } else {
                    dispatch(setAuthMode(verificationMode))
                    const isEmailSent = await getVerificationLinkStatusInfo(user.email)
                    if (isEmailSent)
                        dispatch(toggleVerificationEmailSendStatus(true))
                    dispatch(startVerificationTimer())
                }
            }
            dispatch(toggleInitializing(false))

        })
    } catch (e) {
        console.log(`AUTH CHECK ERROR: ${e}`)
    }
})

export const checkUserVerification = createAsyncThunk(
    'check-verification-thunk', async (_, {dispatch}) => {
        dispatch(toggleVerificationBtnFetch(true))
        const auth = getAuth()
        const user = auth.currentUser
        await user.reload()
        if (user.emailVerified) {
            dispatch(toggleAuthStatus(true))
            dispatch(setAuthMode(signInMode))
        } else {
            toast.error('email is not verified!')
        }
        dispatch(toggleVerificationBtnFetch(false))
    })


export const handleLogout = createAsyncThunk('logout-thunk', async (_, {dispatch}) => {

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


/// Verification / Restore Timers
export const startVerificationTimer = createAsyncThunk(
    'verification-timer-thunk',
    async (_, {dispatch}) => {
        const auth = getAuth()
        const currentUser = auth.currentUser
        let currentTime = (localStorage.getItem('verificationCounterValue') || 60)
        const newIntervalId = setInterval(async () => {
            if (currentTime > 0) {
                currentTime = currentTime - 1
                dispatch(setVerificationTimerValue(currentTime));
                localStorage.setItem('verificationCounterValue', currentTime)
            } else {
                await updateVerificationLinkStatus(currentUser.email, false)
                clearInterval(newIntervalId)
                dispatch(setVerificationTimerValue(verificationTimerInitialValue))
                dispatch(toggleVerificationEmailSendStatus(false))
            }
        }, 1000);
        dispatch(setVerificationIntervalId(newIntervalId));
    })


export const startRestoreTimer = createAsyncThunk(
    'restore-timer-thunk',
    async (_, {dispatch}) => {
        let currentTime = localStorage.getItem('restoreCounterValue')
        const newIntervalId = setInterval(async () => {
            if (currentTime > 0) {
                currentTime = currentTime - 1
                dispatch(setRestoreTimerValue(currentTime));
                localStorage.setItem('restoreCounterValue', currentTime)
            } else {
                clearInterval(newIntervalId)
                dispatch(setRestoreTimerValue(verificationTimerInitialValue))
                localStorage.setItem('isRestoreEmailSend', false)
                dispatch(toggleRestoreEmailSendStatus(false))
            }
        }, 1000);
        dispatch(setVerificationIntervalId(newIntervalId));
    })


//Database
export const createUserInDb = async ({username, email, isVerified}) => {
    const data = {
        username,
        email,
        isVerificationLinkSend: false,
        currentTheme: 'DAY',
    };

    const emailKey = extractUsernameFromEmail(email)

    set(dbRef(database, `users/` + emailKey), data)
        .catch((error) => {
            toast.error('Error creating new user...', error);
        });
}


export const isUserExist = async (email) => {
    const emailKey = extractUsernameFromEmail(email)
    const userRef = dbRef(database, 'users/' + emailKey)
    return await get(userRef).then((result) => result.exists())
}

export const getVerificationLinkStatusInfo = async (email) => {
    const emailKey = extractUsernameFromEmail(email)
    const userRef = dbRef(database, `users/` + emailKey)
    return get(userRef)
        .then((result) => {
            if (result.exists()) {
                return result.val().isVerificationLinkSend
            } else {
                console.log(`${email} not found in db`)
            }
        })
};

export const updateVerificationLinkStatus = async (email, status) => {
    const emailKey = extractUsernameFromEmail(email)
    const userRef = dbRef(database, `users/` + emailKey)
    const updates = {
        isVerificationLinkSend: status
    }

    return update(userRef, updates)
        .catch(() => {
            toast.error('error updating verification link status')
        })

};





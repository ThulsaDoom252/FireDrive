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
        alertStyle: '',
        showUserModal: false,
        showRenameModal: false,
        showImageModal: false,
        showVideoModal: false,
        showAlertModal: false,
        alertTitle: 'Delete all items',
        alertMessage: removeAllMsg,
        alertBtnLabel: 'Delete',
        alertBtnStyle: 'danger',
        alertActionType: removeAllMsg,
        showAlertBtn: true,
        currentModalItemUrl: '',
        currentModalItemIndex: 0,
    },
    reducers: {
        toggleSmallScreen(state, action) {
            state.smallScreen = action.payload
        },
        toggleVideoModal(state, action) {
            state.showVideoModal = action.payload
        },
        toggleUserModal(state, action) {
            state.showUserModal = action.payload
        },
        toggleRenameModal(state, action) {
            state.showRenameModal = action.payload
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
        toggleAlertModal(state, action) {
            state.showAlertModal = action.payload
        },
        toggleInitializing(state, action) {
            state.initializing = action.payload
        },
        toggleImageModal(state, action) {
            state.showImageModal = action.payload
        },
        setCurrentModalItemUrl(state, action) {
            state.currentModalItemUrl = action.payload
        },
        setAlertModalContent(state, action) {
            const {message, title, style, btnStyle, btnLabel, actionType, showBtn} = action.payload
            state.alertMessage = message
            state.alertTitle = title
            state.alertStyle = style
            state.alertBtnStyle = btnStyle
            state.alertBtnLabel = btnLabel
            state.alertActionType = actionType
            state.showAlertBtn = showBtn
        },
        setCurrentModalItemIndex(state, action) {
            state.currentModalItemIndex = action.payload

        },
    }
})

export default appSlice.reducer
export const {
    toggleSmallScreen,
    toggleAlertModal,
    toggleOverlay,
    toggleInitializing,
    toggleHorizontalMode,
    setAlertContent,
    toggleUserModal,
    toggleRenameModal,
    setAlertModalContent,
    setCurrentModalItemUrl,
    toggleImageModal,
    toggleVideoModal,
    setCurrentModalItemIndex,
} = appSlice.actions

export const handleAlertModal = createAsyncThunk('alertModal-thunk', async ({
                                                                                type = 'danger',
                                                                                title = 'Delete All items',
                                                                                message = removeAllMsg,
                                                                                btnStyle = 'danger',
                                                                                btnLabel = 'Delete',
                                                                                showBtn = true,
                                                                                actionType = removeAllMsg,
                                                                            }, {dispatch}) => {
    await dispatch(setAlertModalContent({type, title, message, btnStyle, btnLabel, showBtn, actionType}))
    dispatch(toggleAlertModal(true))
})


export const handleAlertAction = createAsyncThunk('alert-action-thunk', async ({
                                                                                   actionType = removeAllMsg,
                                                                               }, {dispatch}) => {

    switch (actionType) {
        case removeAllMsg:
            await dispatch(deleteAllMedia())
            dispatch(toggleAlertModal(false))
            // dispatch(handleAlert({overlayMode: true, toggle: false}))
            break
        default:
            void 0
    }
})

export const handleInitialModalIndex = createAsyncThunk('modal-item-initial-url-thunk', async ({
                                                                                                   index,
                                                                                                   modalType = "Image"
                                                                                               }, {dispatch}) => {
    dispatch(setCurrentModalItemIndex(index))
    await delay(10)
    switch (modalType) {
        case 'Image':
            dispatch(toggleImageModal(true))
            break;
        case 'video':
            dispatch(toggleVideoModal(true))
        default:
            void 0
    }
})


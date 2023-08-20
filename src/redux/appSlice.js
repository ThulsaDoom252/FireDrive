import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {delay, removeAllItems, removeAllMsg, removeCurrentItem, removeCurrentMsg} from "../common/commonData";
import {deleteAllMedia, deleteCurrentItem, setOldMediaName} from "./mediaSlice";

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
        showShareModal: false,
        alertTitle: '',
        alertMessage: '',
        alertBtnLabel: '',
        alertBtnStyle: '',
        alertActionType: '',
        showAlertBtn: true,
        currentModalItemIndex: 0,
        itemOptionsHovered: false,
    },
    reducers: {
        toggleSmallScreen(state, action) {
            state.smallScreen = action.payload
        },
        setItemOptionsHovered(state, action) {
            state.itemOptionsHovered = action.payload
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
        setAlertActionType(state, action) {
            state.alertActionType = action.payload
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
        toggleShareModal(state, action) {
            state.showShareModal = action.payload
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
    toggleShareModal,
    toggleInitializing,
    toggleHorizontalMode,
    setAlertContent,
    toggleUserModal,
    toggleRenameModal,
    setAlertModalContent,
    toggleImageModal,
    toggleVideoModal,
    setCurrentModalItemIndex,
    setItemOptionsHovered,
    setAlertActionType,
} = appSlice.actions

export const handleAlertModal = createAsyncThunk('alertModal-thunk', async ({
                                                                                type = 'danger',
                                                                                title,
                                                                                message,
                                                                                btnStyle = 'danger',
                                                                                btnLabel = 'Delete',
                                                                                showBtn = true,
                                                                                actionType,
                                                                            }, {dispatch}) => {
    debugger
    await dispatch(setAlertModalContent({type, title, message, btnStyle, btnLabel, showBtn, actionType}))
    dispatch(toggleAlertModal(true))
})


export const handleAlertAction = createAsyncThunk('alert-action-thunk', async ({
                                                                                   actionType,
                                                                                   route, url, index, searchMode,
                                                                               }, {dispatch}) => {

    switch (actionType) {
        case removeAllItems:
            await dispatch(deleteAllMedia())
            dispatch(toggleAlertModal(false))
            break
        case removeCurrentItem:
            debugger
            await dispatch(deleteCurrentItem({route, url, index, searchMode}))
            dispatch(toggleAlertModal(false))
        default:
            void 0

    }
})

export const handleInitialModalItem = createAsyncThunk('modal-item-initial-url-thunk', async ({
                                                                                                  index,
                                                                                                  modalType = "Image",
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


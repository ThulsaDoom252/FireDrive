import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    delay,
    imageModal,
    noModal,
    removeAllItems,
    removeCurrentItem,
    smallScreenWidth,
    videoModal
} from "../common/commonData";
import {deleteAllMedia, deleteCurrentItem} from "./mediaSlice";
import alertModal from "../components/modals/AlertModal";
import {dayTheme, desertTheme} from "../common/themes";

const appSlice = createSlice({
    name: 'app-slice',
    initialState: {
        initializing: false,
        smallScreen: window.innerWidth <= smallScreenWidth,
        modalType: '',
        itemModalType: '',
        alertTitle: '',
        alertMessage: '',
        alertStyle: '',
        alertBtnLabel: '',
        alertBtnStyle: '',
        alertActionType: '',
        showAlertBtn: true,
        currentModalItemIndex: 0,
        itemOptionsHovered: false,
        currentTheme: dayTheme,
    },
    reducers: {
        toggleSmallScreen(state, action) {
            state.smallScreen = action.payload
        },
        setItemOptionsHovered(state, action) {
            state.itemOptionsHovered = action.payload
        },
        setAlertActionType(state, action) {
            state.alertActionType = action.payload
        },
        setModalType(state, action) {
            state.modalType = action.payload
        },
        setItemModalType(state, action) {
            state.itemModalType = action.payload
        },
        toggleInitializing(state, action) {
            state.initializing = action.payload
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
    toggleInitializing,
    setAlertModalContent,
    setCurrentModalItemIndex,
    setItemOptionsHovered,
    setModalType,
    setItemModalType,
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
    await dispatch(setAlertModalContent({type, title, message, btnStyle, btnLabel, showBtn, actionType}))
    dispatch(setModalType(alertModal))
})


export const handleAlertAction = createAsyncThunk('alert-action-thunk', async ({
                                                                                   actionType,
                                                                                   route, url, index, searchMode,
                                                                               }, {dispatch}) => {

    switch (actionType) {
        case removeAllItems:
            await dispatch(deleteAllMedia())
            dispatch(setModalType(noModal))
            break
        case removeCurrentItem:
            await dispatch(deleteCurrentItem({route, url, index, searchMode}))
            dispatch(setModalType(noModal))
            break;
        default:
            void 0
            break;

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
            dispatch(setItemModalType(imageModal))
            break;
        case 'video':
            dispatch(setItemModalType(videoModal))
            break;
        default:
            void 0
    }
})


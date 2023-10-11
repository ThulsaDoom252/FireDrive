import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    delay,
    imageModal,
    noModal, paginateMode,
    smallScreenWidth,
    videoModal
} from "../common/commonData";
import {
    dayPrimary, dayTheme, desertPrimary, desertTheme,
    mainDayBg,
    mainDesertBg,
    mainNightBg,
    nightPrimary, nightTheme, primeDayBg, primeDesertBg,
    primeNightBg, secDayBg,
    secDesertBg,
    secNightBg
} from "../common/themes";

const appSlice = createSlice({
    name: 'app-slice',
    initialState: {
        listMode: paginateMode,
        initializing: false,
        smallScreen: window.innerWidth <= smallScreenWidth,
        modalType: '',
        gridSize: 2,
        gridIndex: 5,
        itemModalType: noModal,
        alertTitle: '',
        alertMessage: '',
        showVideoMobileMenu: false,
        showAlertBtn: true,
        currentModalItemIndex: 0,
        itemOptionsHovered: false,
        currentThemeName: '',
        currentTheme: {
            mainBg: mainDayBg,
            primeBg: primeDayBg,
            secBg: secDayBg,
            color: dayPrimary,
        },
    },
    reducers: {
        toggleSmallScreen(state, action) {
            state.smallScreen = action.payload
        },
        setButtonMenuType(state, action) {
            state.buttonMenuType = action.payload
        },
        toggleCurrentTheme(state, action) {
            const {type: themeType} = action.payload
            state.currentThemeName = themeType
            switch (themeType) {
                case dayTheme:
                    state.currentTheme.mainBg = mainDayBg
                    state.currentTheme.primeBg = primeDayBg
                    state.currentTheme.secBg = secDayBg
                    state.currentTheme.color = dayPrimary
                    break
                case nightTheme:
                    state.currentTheme.mainBg = mainNightBg
                    state.currentTheme.primeBg = primeNightBg
                    state.currentTheme.secBg = secNightBg
                    state.currentTheme.color = nightPrimary
                    break
                case desertTheme:
                    state.currentTheme.mainBg = mainDesertBg
                    state.currentTheme.primeBg = primeDesertBg
                    state.currentTheme.secBg = secDesertBg
                    state.currentTheme.color = desertPrimary
                    break
                default:
                    void 0
            }
        },
        setItemOptionsHovered(state, action) {
            state.itemOptionsHovered = action.payload
        },
        setAlertActionType(state, action) {
            state.alertActionType = action.payload
        },
        setGridIndex(state, action) {
            state.gridIndex = action.payload

        },
        setModalType(state, action) {
            state.modalType = action.payload
        },
        setGridSize(state, action) {
            state.gridSize = action.payload
        },
        setItemModalType(state, action) {
            state.itemModalType = action.payload
        },
        toggleInitializing(state, action) {
            state.initializing = action.payload
        },
        toggleListMode(state, action) {
            state.listMode = action.payload
        },
        toggleVideoMobileMenu(state, action) {
            state.showVideoMobileMenu = action.payload
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
    toggleCurrentTheme,
    toggleListMode,
    toggleVideoMobileMenu,
    setGridSize,
    setGridIndex,
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


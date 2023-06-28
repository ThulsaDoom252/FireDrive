import {
    alertMediaUploaded, alertSuccessStyle,
    audio,
    audioOnly,
    audioRoute, defaultRef,
    images,
    imagesOnly,
    imagesRoute, mediaFetchMode, mediaUploadMode,
    rootRoute, videos,
    videosOnly,
    videosRoute
} from "../common/commonData";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDownloadURL, getMetadata, listAll, ref, uploadBytes, deleteObject} from "firebase/storage";
import {storage} from "../firebase";
import {handleAlert} from "./appSlice";

const mediaSlice = createSlice({
    name: 'media-slice',
    initialState: {
        currentRoute: '',
        fetchCurrentMedia: false,
        fetchImages: false,
        fetchVideos: false,
        fetchAudio: false,
        currentMediaSet: [],
        mediaLoading: false,
        mediaDeleting: false,
        imagesSet: [],
        videosSet: [],
        audioSet: [],
    },
    reducers: {
        setCurrentRoute(state, action) {
            state.currentRoute = action.payload
        },
        setMediaSet(state, action) {
            const {mediaType, mediaData} = action.payload
            switch (mediaType) {
                case images:
                    state.imagesSet = [...mediaData]
                    break;
                case  videos:
                    state.videosSet = [...mediaData]
                    break;
                case  audio:
                    state.audioSet = [...mediaData]
            }
        },
        updateMediaSet(state, action) {
            const {currentRoute, uploadedMedia} = action.payload
            switch (currentRoute) {
                case imagesRoute:
                    state.imagesSet = [...state.imagesSet, ...uploadedMedia]
                    break;
                case videosRoute:
                    state.videosSet = [...state.videosSet, ...uploadedMedia]
                    break;
                case audioRoute:
                    state.audioSet = [...state.audioSet, ...uploadedMedia]
                    break;
            }
        },
        toggleIsMediaDeleting(state, action) {
            state.mediaDeleting = action.payload
        },
        toggleIsMediaUploaded(state, action) {
            state.mediaUploaded = action.payload

        },
        toggleFetchMedia(state, action) {
            const {mediaType, toggle} = action.payload
            switch (mediaType) {
                case images:
                    state.fetchImages = toggle
                    break;
                case videos:
                    state.fetchVideos = toggle
                    break;
                case  audio:
                    state.fetchAudio = toggle

            }
        },
        setCurrentMediaSet(state, action) {
            state.currentMediaSet = [...action.payload]
        },

        toggleMediaLoading(state, action) {
            state.mediaLoading = action.payload
        },
        clearMediaSet(state, action) {
            const {route} = action.payload
            switch (route) {
                case imagesRoute:
                    state.imagesSet = []
                    break;
                case videosRoute:
                    state.videosSet = []
                    break;
                case audioRoute:
                    state.audioSet = []
                    break;
                default:
                    void 0
            }
        },
    },
})

export default mediaSlice.reducer

export const {
    updateMediaSet,
    toggleFetchMedia,
    setMediaSet,
    clearMediaSet,
    setCurrentRoute,
    setCurrentMediaSet,
    toggleMediaLoading,
    toggleIsMediaDeleting,
} = mediaSlice.actions;


export const handleCurrentMediaSet = ({dispatch}, mediaData) => {
    if (mediaData) {
        dispatch(toggleFetchMedia(true))
        dispatch(setCurrentMediaSet(mediaData))
        dispatch(toggleFetchMedia(false))
    }
}

const filterMediaData = (array, mode) => {
    let modifiedMedia
    switch (mode) {
        case mediaFetchMode: {
            modifiedMedia = array.map(([url, metadata]) => ({
                url,
                name: metadata.name,
                date: metadata.timeCreated,
                size: metadata.size,
            }))
        }
            break;
        case mediaUploadMode:
            modifiedMedia = [{
                url: array[0],
                date: array[1].timeCreated,
                name: array[1].name,
                size: array[1].size,
            }]
            break;
    }
    return modifiedMedia
}

export const listMedia = createAsyncThunk('listMedia-thunk', async ({userName, mediaType}, {dispatch}) => {
    dispatch(toggleFetchMedia({mediaType, toggle: true}))
    const data = await listAll(ref(storage, `${userName}/${mediaType}`))
    const results = await Promise.all(data.items.map((item) => Promise.all([getDownloadURL(item), getMetadata(item)])))
    const mediaData = filterMediaData(results, mediaFetchMode)
    dispatch(setMediaSet({mediaType, mediaData}))
    dispatch(toggleFetchMedia({mediaType, toggle: false}))
})

export const uploadMedia = createAsyncThunk('uploadMedia-thunk', async ({
                                                                            event,
                                                                            currentRoute,
                                                                            userName
                                                                        }, {dispatch}) => {
    const allowedTypes = {
        [imagesRoute]: imagesOnly,
        [videosRoute]: videosOnly,
        [audioRoute]: audioOnly,
        [rootRoute]: []
    };
    const files = Array.from(event.target.files);
    const filteredFiles = files.filter(file => allowedTypes[currentRoute].includes(file.type));
    if (filteredFiles.length > 0) {
        dispatch(toggleMediaLoading(true))
        await Promise.all(filteredFiles.map(async (file) => {
            const fileRef = ref(storage, `${userName}/${currentRoute === videosRoute ? videos
                : currentRoute === imagesRoute ? images
                    : currentRoute === audioRoute ? audio
                        : defaultRef}/${file.name}`);
            await uploadBytes(fileRef, file);
            const uploadedMedia = await Promise.all([
                getDownloadURL(fileRef), getMetadata(fileRef)
            ])
            const modifiedUploadedMedia = filterMediaData(uploadedMedia, mediaUploadMode)
            dispatch(updateMediaSet({currentRoute, uploadedMedia: modifiedUploadedMedia}))
        }));
        dispatch(toggleMediaLoading(false))
        dispatch(handleAlert({overlayMode: true, alertMode: alertMediaUploaded, alertStyle: alertSuccessStyle}))
    }
});

export const deleteAllMedia = createAsyncThunk('delete-all-media-thunk', async ({
                                                                                    currentMediaSet,
                                                                                    currentRoute
                                                                                }, {dispatch}) => {
    let urlsToDelete = []
    dispatch(toggleIsMediaDeleting(true))
    currentMediaSet.forEach(media => urlsToDelete.push(media.url))
    for (let url of urlsToDelete) {
        let refToDelete = ref(storage, url)
        await deleteObject(refToDelete)
    }
    dispatch(clearMediaSet({route: currentRoute}))
    dispatch(toggleIsMediaDeleting(false))

})





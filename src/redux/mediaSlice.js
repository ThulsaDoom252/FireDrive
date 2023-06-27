import {
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
import {getDownloadURL, getMetadata, listAll, ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase";

const mediaSlice = createSlice({
    name: 'media-slice',
    initialState: {
        currentRoute: '',
        fetchCurrentMedia: false,
        fetchImages: false,
        fetchVideos: false,
        fetchAudio: false,
        currentMediaSet: [],
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
    },
})

export default mediaSlice.reducer

export const {
    updateMediaSet,
    toggleFetchMedia,
    setMediaSet,
    setCurrentRoute,
    setCurrentMediaSet
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
        dispatch(toggleFetchMedia(true));
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
        dispatch(togglemediaFetch(false))
    }
});




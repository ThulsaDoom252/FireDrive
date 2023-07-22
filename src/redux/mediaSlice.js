import {
    alertMediaUploaded, alertSuccessStyle,
    audio,
    audioOnly,
    audioRoute, byDate, byName, bySize, defaultRef, delay,
    images,
    imagesOnly,
    imagesRoute, mediaFetchMode, mediaUploadMode,
    rootRoute, videos,
    videosOnly,
    videosRoute
} from "../common/commonData";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDownloadURL, getMetadata, listAll, ref, uploadBytes, deleteObject, updateMetadata} from "firebase/storage";
import {storage} from "../firebase";
import {handleAlert} from "./appSlice";
import {getAuth} from "firebase/auth";

const mediaSlice = createSlice({
    name: 'media-slice',
    initialState: {
        currentAudioIndex: 0,
        currentRoute: '',
        fetchCurrentMedia: false,
        fetchImages: false,
        fetchVideos: false,
        fetchAudio: false,
        lastPlayedAudioNameBeforeSort: null,
        deletedItemUrl: null,
        newMediaName: null,
        editingMediaName: null,
        sortBy: byDate,
        searchResults: [],
        searchRequest: '',
        noSearchResults: false,
        searchMode: false,
        sortOptions: [
            {value: byDate, label: byDate},
            {value: byName, label: byName},
            {value: bySize, label: bySize},
        ],
        mediaSortedBy: byDate,
        deletingMediaIndex: null,
        deletingAudioIndex: null,
        currentMediaSet: [],
        mediaLoading: false,
        mediaDeleting: false,
        imagesSet: [],
        videosSet: [],
        audioSet: [],
    },
    reducers: {
        setDeletedItemUrl(state, action) {
            state.deletedItemUrl = action.payload
        },
        setCurrentRoute(state, action) {
            state.currentRoute = action.payload
        },
        setCurrentAudioIndex(state, action) {
            state.currentAudioIndex = action.payload
        },
        toggleSortByValue(state, action) {
            state.sortBy = action.payload
        },
        addAudioIndex(state) {
            const updatedAudioRefs = state.currentMediaSet.map((audio, index) => ({...audio, index}));
            state.currentMediaSet = updatedAudioRefs;
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
        toggleSearchMode(state, action) {
            state.searchMode = action.payload
        },
        updateSearchResults(state, action) {
            state.searchResults = state.searchResults.filter(item => item.url !== action.payload)
        },
        setNewMediaName(state, action) {
            state.newMediaName = action.payload
        },
        searchItems(state, action) {
            state.searchResults = state.currentMediaSet.filter(media => media.name.toLowerCase().includes(action.payload))
        },
        toggleNoSearchResults(state, action) {
            state.noSearchResults = action.payload
        },
        filterMediaSet(state, action) {
            const {url, route} = action.payload
            switch (route) {
                case imagesRoute:
                    state.imagesSet = state.imagesSet.filter(media => media.url !== url)
                    break;
                case videosRoute:
                    state.videosSet = state.videosSet.filter(video => video.url !== url)
                    break;
                case audioRoute:
                    state.audioSet = state.audioSet.filter(audio => audio.url !== url)
                    break;
                default:
                    break;
            }
        },
        setSearchRequest(state, action) {
            state.searchRequest = action.payload
        },
        changeMediaOldNameToNew(state, action) {
            const {newName, editingName, route} = action.payload
            switch (route) {
                case imagesRoute:
                    state.imagesSet = state.imagesSet.map((image) => image.name === editingName ? {
                        ...image,
                        name: newName,
                    } : image)

                    break;
                case videosRoute:
                    state.videosSet = state.videosSet.map(video => video.name === editingName ? {
                        ...video,
                        name: newName,
                    } : video)
                    break;
                case audioRoute:
                    state.audioSet = state.audioSet = state.audioSet.map((audio) => audio.name === editingName ? {
                        ...audio,
                        name: newName
                    } : audio)
            }

        },
        setEditingMediaName(state, action) {
            state.editingMediaName = action.payload
        },
        clearSearchResults(state) {
            state.searchResults = []
        },
        setLastPlayedAudioNameBeforeSort(state, action) {
            state.lastPlayedAudioNameBeforeSort = action.payload
        },
        sortCurrentMediaSet(state, action) {
            const {sortType, isAudio} = action.payload
            switch (sortType) {
                case byDate:
                    state.currentMediaSet.sort((a, b) => a.date.localeCompare(b.date))
                    if (isAudio) {
                        state.audioSet.sort((a, b) => a.date.localeCompare(b.date))
                    }
                    break;
                case byName:
                    state.currentMediaSet.sort((a, b) => a.name.localeCompare(b.name))
                    if (isAudio) {
                        state.audioSet.sort((a, b) => a.name.localeCompare(b.name))
                    }

                    break;
                case bySize:
                    state.currentMediaSet.sort((a, b) => b.size - a.size)
                    if (isAudio) {
                        state.audioSet.sort((a, b) => b.size - a.size)
                    }
                    break;
                default:
                    void 0
            }
        },
        changeListedMediaName(state, action) {
            const {mediaType} = action.payload;
            switch (mediaType) {
                case audio:
                    state.audioSet = state.audioSet.map(audio => audio.newName ? {
                            ...audio,
                            name: audio.newName
                        }
                        : audio)
                    break;
                case images:
                    state.imagesSet = state.imagesSet.map(image => image.newName ? {
                            ...image,
                            name: image.newName
                        }
                        : image)
                    break;
                case videos:
                    state.videosSet = state.videosSet.map(image => image.newName ? {
                            ...image,
                            name: image.newName
                        }
                        : image)
                    break;
                default:
                    void 0
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
    setCurrentAudioIndex,
    toggleMediaLoading,
    toggleIsMediaDeleting,
    addAudioIndex,
    toggleSortByValue,
    filterMediaSet,
    updateSearchResults,
    searchItems,
    clearSearchResults,
    changeMediaOldNameToNew,
    setNewMediaName,
    setEditingMediaName,
    changeListedMediaName,
    toggleSearchMode,
    setSearchRequest,
    toggleNoSearchResults,
    sortCurrentMediaSet,
    setDeletedItemUrl,
    setLastPlayedAudioNameBeforeSort,
} = mediaSlice.actions;


export const handleCurrentMediaSet = createAsyncThunk('handle-current-media-set-thunk', async (mediaData, {dispatch}) => {
    if (mediaData) {
        dispatch(toggleFetchMedia(true))
        dispatch(setCurrentMediaSet(mediaData))
        dispatch(addAudioIndex())
        dispatch(toggleFetchMedia(false))
    }
})

export const handleSearchMedia = createAsyncThunk('search-thunk', async (request, {dispatch}) => {
    if (request === '') {
        dispatch(clearSearchResults())
    } else {
        const searchRequest = request.toLowerCase()
        dispatch(searchItems(searchRequest))
    }
})


const filterMediaData = (array, mode) => {
    let modifiedMedia
    switch (mode) {
        case mediaFetchMode: {
            modifiedMedia = array.map(([url, metadata]) => ({
                url,
                name: metadata.name,
                date: metadata.timeCreated,
                newName: metadata.cacheControl,
                oldName: metadata.name,
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
                newName: array[1].cacheControl,
                oldName: array[1].name,
            }]
            break;
    }
    return modifiedMedia
}

export const listMedia = createAsyncThunk('listMedia-thunk', async ({mediaType}, {dispatch}) => {
    const auth = getAuth()
    const username = auth.currentUser.displayName
    dispatch(toggleFetchMedia({mediaType, toggle: true}))
    const data = await listAll(ref(storage, `${username}/${mediaType}`))
    const results = await Promise.all(data.items.map((item) => Promise.all([getDownloadURL(item), getMetadata(item)])))
    const mediaData = filterMediaData(results, mediaFetchMode)
    dispatch(setMediaSet({mediaType, mediaData}))
    dispatch(changeListedMediaName({mediaType}))
    dispatch(toggleFetchMedia({mediaType, toggle: false}))
})


export const uploadMedia = createAsyncThunk('uploadMedia-thunk', async ({
                                                                            event,
                                                                            currentRoute,
                                                                        }, {dispatch}) => {
    const auth = getAuth()
    const username = auth.currentUser.displayName
    const allowedTypes = {
        [imagesRoute]: imagesOnly,
        [videosRoute]: videosOnly,
        [audioRoute]: audioOnly,
        [rootRoute]: []
    };
    const audioPage = currentRoute === audioRoute
    const files = Array.from(event.target.files);
    const filteredFiles = files.filter(file => allowedTypes[currentRoute].includes(file.type));
    if (filteredFiles.length > 0) {
        dispatch(toggleMediaLoading(true))
        await Promise.all(filteredFiles.map(async (file) => {
            const fileRef = ref(storage, `${username}/${currentRoute === videosRoute ? videos
                : currentRoute === imagesRoute ? images
                    : currentRoute === audioRoute ? audio
                        : defaultRef}/${file.name}`);
            await uploadBytes(fileRef, file);
            const uploadedMedia = await Promise.all([
                getDownloadURL(fileRef), getMetadata(fileRef)
            ])
            const uploadedMediaWithAdditionalData = filterMediaData(uploadedMedia, mediaUploadMode)
            dispatch(updateMediaSet({currentRoute, uploadedMedia: uploadedMediaWithAdditionalData}))
            if (audioPage) {
                dispatch(addAudioIndex())
            }
        }));
        dispatch(toggleMediaLoading(false))
        dispatch(handleAlert({overlayMode: true, alertMode: alertMediaUploaded, alertStyle: alertSuccessStyle}))
    }
});

export const renameMedia = createAsyncThunk('rename-thunk', async ({
                                                                       editingName,
                                                                       newName,
                                                                       currentRoute,
                                                                       originalName,
                                                                   }, {dispatch}) => {
    const auth = getAuth()
    const username = auth.currentUser.displayName
    const cacheControl = newName
    const imagesPage = currentRoute === imagesRoute
    const videosPage = currentRoute === videosRoute
    const folder = imagesPage ? imagesRoute : videosPage ? videosRoute : audioRoute
    const oldRef = ref(storage, `${username}/${folder}/${cacheControl ? originalName : editingName}`)
    const updatedName = `${newName !== '' ? newName : editingName}`
    if (updatedName !== editingName) {
        await updateMetadata(oldRef, {cacheControl: updatedName})
        dispatch(changeMediaOldNameToNew({editingName, newName, route: currentRoute}))
    }
})


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

export const handleMediaName = createAsyncThunk('handle-media-name-thunk', async ({name}, {dispatch}) => {
    dispatch(setNewMediaName(name))
    dispatch(setEditingMediaName(name))
})


export const deleteCurrentItem = createAsyncThunk('delete-current-media-thunk', async ({
                                                                                           route,
                                                                                           url,
                                                                                           index,
                                                                                           searchMode
                                                                                       }, {dispatch}) => {
    const mediaRef = ref(storage, url);
    await dispatch(setDeletedItemUrl(url))
    await deleteObject(mediaRef)
    await dispatch(filterMediaSet({url, route}))
    searchMode && dispatch(updateSearchResults(url))
    dispatch(setDeletedItemUrl(null))

})









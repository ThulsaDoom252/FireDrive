export const truncate = (name, maxCharacters = 15) => {
    const maxNumber = maxCharacters
    const mediaLength = name?.length
    if (mediaLength > maxNumber) {
        let slicedMedia = name.slice(0, maxNumber)
        return slicedMedia + '...'
    } else {
        return name
    }
}


export const setLocalStorageItem = (key, value) => {
    localStorage.setItem(`${key}`, `${value}`)
}

export const getLocalStorageItem = (key) => {
    const currentValue = localStorage.getItem(key)
    return currentValue
    debugger
}

export const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

//Format time in mm:ss format
export const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
};


export const stopPropagation = e => e.stopPropagation()


// Generate random string for github username, base on length (Whe authorizing with github -  username no settings up automatically"
export const generateRandomString = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// containers id's
export const wrapperId = 'wrapper'
export const mainContentId = 'content'

//ListModes
export const paginateMode = 'PAGINATE'
export const lazyMode = 'LAZY'


//Sort media types
    export
const byDate = 'by date'
export const byName = 'by name'
export const bySize = 'by size'


//SmallScreenMode
export const smallScreenWidth = 1024


//Modals
//Types
export const AlertModal = 'ALERT MODAL'
export const UserModal = 'USER MODAL'
export const renameModal = 'RENAME MODAL'
export const imageModal = 'IMAGES MODAL'
export const videoModal = 'VIDEO MODAL'

export const shareModal = 'SHARE MODAL'
export const noModal = 'NO MODAL'


//ALERT

//Styles
export const alertSuccessStyle = 'success'

//Title
export const removeAllItemsTitle = 'Delete all items'
export const removeCurrentItemTitle = 'Delete item'

//Messages
export const removeAllMsg = 'This will delete all media on current page. Sure you want to continue?'
export const removeCurrentMsg = 'This will delete current item. Sure you want to continue?'

//Actions
export const removeCurrentItem = 'REMOVE CURRENT ITEM'
export const removeAllItems = 'REMOVE ALL'

//Routes Refs
export const imagesRoute = '/images'
export const videosRoute = '/videos'
export const audioRoute = '/audio'
export const rootRoute = '/'
export const verificationRoute = '/verification'
export const restoreRoute = '/restore'
export const signInRoute = '/signIn'
export const signUpRoute = '/signUp'

// media types
export const images = 'images'
export const videos = 'videos'
export const audio = 'audio'
export const defaultRef = 'default'
export const mediaTypes = [images, videos, audio]

// media filter modes
export const mediaUploadMode = 'mediaUploadMode'
export const mediaFetchMode = 'mediaFetchMode'

// media file extensions
export const imageFiles = '.jpg,.jpeg,.png'
export const videoFiles = '.mpeg, .mp4, .mkv, .avi, .mpeg4'
export const audioFiles = '.mp3'

//FileTypes allowed for upload
export const imagesOnly = ['image/jpeg', 'image/png']
export const videosOnly = ['video/mp4',
    'video/mpeg',
    'video/ogg',
    'video/webm',
    'video/quicktime',
    'video/x-ms-wmv',
    'video/x-msvideo',
    'video/x-matroska',
    'video/3gpp',
    'video/3gpp2',
    'video/vnd.vivo',
    'video/vnd.dlna.mpeg-tts',
    'video/x-ms-asf',]
export const audioOnly = ['audio/mpeg', 'audio/wav']
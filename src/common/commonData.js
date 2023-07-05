export const truncate = (name, maxCharacters = 15) => {
    const maxNumber = maxCharacters
    const mediaLength = name.length
    if (mediaLength > maxNumber) {
        let slicedMedia = name.slice(0, maxNumber)
        return slicedMedia + '...'
    } else {
        return name
    }
}

export const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

// containers id's
export const wrapperId = 'wrapper'
export const mainContentId = 'content'

//Sort media types
export const byDate = 'by date'
export const byName = 'by name'
export const bySize = 'by size'


//SmallScreenMode
export const smallScreenWidth = 768

//AlertStyles
export const alertWarningStyle = 'warning'
export const alertSuccessStyle = 'success'

//AlertModes
export const alertRemoveAll = 'removeAll'
export const alertMediaUploaded = `alertMediaUploaded`
export const alertMediaRemoved = 'alertMediaRemoved'

//AlertMessages
export const removeAllMsg = 'This will delete all media on current page. Sure you want to continue?'
export const mediaUploadedMsg = 'Uploaded! \u{1F600}'

//Routes Refs
export const imagesRoute = '/images'
export const videosRoute = '/videos'
export const audioRoute = '/audio'
export const rootRoute = '/'
export const signInRoute = '/signIn'
export const signUpRoute = '/signUp'

// Media types
export const images = 'images'
export const videos = 'videos'
export const audio = 'audio'
export const defaultRef = 'default'
export const mediaTypes = [images, videos, audio]

// Media filter modes
export const mediaUploadMode = 'mediaUploadMode'
export const mediaFetchMode = 'mediaFetchMode'

// Media file extensions
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
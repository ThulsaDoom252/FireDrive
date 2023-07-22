import {createContext, useState} from 'react';
import {useEffect, useRef} from "react";
import {delay} from "../common/commonData";
import {useSelector} from "react-redux";

export const AudioPlayerContext = createContext();

export function AudioPlayerContextProvider({children}) {
    const audioSet = useSelector(state => state.media.audioSet)
    const deletedItemUrl = useSelector(state => state.media.deletedItemUrl)
    const [currentDuration, setCurrentDuration] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isCurrentTrackPlaying, toggleCurrentTrackPlaying] = useState(false)
    let currentTrack = audioSet[currentTrackIndex] || {url: '', name: ''}
    const [currentTrackName, setCurrentTrackName] = useState('')
    const noAudio = audioSet.length === 0
    const audioRef = useRef(null)
    const audio = audioRef.current
    const lastPlayedAudioNameBeforeSort = useSelector(state => state.media.lastPlayedAudioNameBeforeSort)

    const isLastTrack = currentTrackIndex === audioSet.length

    const handleChangedTrackPlay = async () => {
        toggleCurrentTrackPlaying(false)
        await delay(100)
        toggleCurrentTrackPlaying(true)


    }

    const handleSetCurrentAudioIndex = async ({index, goToNext, goToPrev, isEnded = false}) => {
        if (currentTrackIndex !== index) {
            setCurrentTrackIndex(index)
            handleChangedTrackPlay()
        }
        if (goToNext) {
            if (isCurrentTrackPlaying || isEnded) {
                handleChangedTrackPlay()
            }
            return
        }
        if (goToPrev) {
            if (isCurrentTrackPlaying) {
                handleChangedTrackPlay()
            }
            return
        }

        if (currentTrackIndex === index) {
            if (isCurrentTrackPlaying) {
                toggleCurrentTrackPlaying(false)
            } else {
                await delay(500)
                toggleCurrentTrackPlaying(true)
            }
        }
    }

    useEffect(() => {
        lastPlayedAudioNameBeforeSort !== currentTrackName && localStorage.setItem('currentTrackName', currentTrack.name)
    }, [currentTrack])

    const handleNextTrack = async ({isEnded = false}) => {
        handleSetCurrentAudioIndex({index: currentTrackIndex + 1, goToNext: true, isEnded})
    }

    const handlePreviousTrack = async () => {
        handleSetCurrentAudioIndex({index: currentTrackIndex - 1, goToPrev: true})
    }

    const handleSeekBarChange = (event) => {
        const currentTime = Number(event.target.value);
        setCurrentDuration(currentTime)
        audio.currentTime = currentTime;
    };

    const handleTimeUpdate = () => {
        setCurrentDuration(audioRef.current.currentTime);
    };

    const loadAudio = () => {
        setCurrentTrackName(currentTrack.name)
        audio.src = currentTrack.url
        audio.load()
    }



    useEffect(() => {
        if (audio) {
            isCurrentTrackPlaying ? audio.play().catch(e => alert(e)) : audio.pause()
        }

    }, [isCurrentTrackPlaying])


    useEffect(() => {
        const audio = audioRef.current
        let isTrackDeleted = audio.src === deletedItemUrl

        const playNextOrPrevBasedOnCurrent = async () => {
            if (isCurrentTrackPlaying) {
                toggleCurrentTrackPlaying(false)
                await delay(100)
                toggleCurrentTrackPlaying(true)
            } else if (noAudio) {
                toggleCurrentTrackPlaying(false)
            }
        }

        const unloadAudio = () => {
            setCurrentTrackName('')
            audio.src = ''
        }

        const switchToTrackByName = (trackName) => {
            const trackIndex = audioSet.findIndex((track) => track.name === trackName);
            setCurrentTrackIndex(trackIndex);
        };

        window.audioSet = audioSet

        if (!noAudio) {
            const isCurrentTrackChanged = currentTrack ? currentTrack.url !== audio.src : void 0
            if (lastPlayedAudioNameBeforeSort === currentTrackName) {
                debugger
                switchToTrackByName(lastPlayedAudioNameBeforeSort)
            } else if (isCurrentTrackChanged && !deletedItemUrl) {
                debugger
                loadAudio()
            } else if (isCurrentTrackChanged && deletedItemUrl) {
                debugger
                setCurrentTrackIndex(currentTrackIndex - 1)
                playNextOrPrevBasedOnCurrent()
                void 0
            } else if (!isCurrentTrackChanged && !isTrackDeleted) {
                debugger
                setCurrentTrackName(currentTrack.name)
            } else if (isTrackDeleted && !isLastTrack) {
                playNextOrPrevBasedOnCurrent()
                loadAudio()
            }

        } else {
            debugger
            isCurrentTrackPlaying && toggleCurrentTrackPlaying(false)
            unloadAudio()
        }
        const handleEnded = () => {
            handleNextTrack({isEnded: true})
        };
        audio.addEventListener('ended', handleEnded);

        const handleDurationChange = () => {
            setTotalDuration(audio.duration);
        };

        audio.addEventListener('durationchange', handleDurationChange);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('durationchange', handleDurationChange);
        };

    }, [audioSet.length, audioSet.name, audioSet, currentTrackIndex])


    const prevBtnDisabled = currentTrackIndex === 0 || noAudio
    const nextBtnDisabled = currentTrackIndex === audioSet.length - 1 || noAudio
    const playBtnDisabled = noAudio


    const audioPlayerState = {
        currentTrack,
        isCurrentTrackPlaying,
        currentDuration,
        totalDuration,
        setIsCurrentTrackPlaying: toggleCurrentTrackPlaying,
        currentTrackIndex,
        prevBtnDisabled,
        nextBtnDisabled,
        playBtnDisabled,
        handleNextTrack,
        handlePreviousTrack,
        currentTrackName,
        noAudio,
        handleTimeUpdate,
        handleSeekBarChange,
        handleSetCurrentAudioIndex,

    };

    return (
        <>
            <AudioPlayerContext.Provider value={audioPlayerState}>{children}</AudioPlayerContext.Provider>;
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}/>
        </>
    )


}


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import {createContext, useState} from 'react';
// import {useEffect, useRef} from "react";
// import {delay, setLocalStorageItem} from "../common/commonData";
// import {useSelector} from "react-redux";
//
// export const AudioPlayerContext = createContext();
//
// export function AudioPlayerContextProvider({children}) {
//     const [isCurrentTrackPlaying, toggleCurrentTrackPlaying] = useState(false);
//     const audioSet = useSelector(state => state.media.audioSet)
//     const isCurrentItemDeleted = useSelector(state => state.media.isCurrentItemDeleted)
//     const audioIsPresent = audioSet.length !== 0
//     const deletingAudioIndex = useSelector(state => state.media.deletingAudioIndex)
//     const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
//     const [currentAudioDuration, setCurrentAudioDuration] = useState(0)
//     const [totalAudioDuration, setTotalAudioDuration] = useState(0)
//     const [currentTrackNameInStorage, setCurrentTrackNameInStorage] = useState(localStorage.getItem('currentAudioName'))
//
//     const currentTrack = audioSet[currentAudioIndex]
//
//
//     const audioRef = useRef(null)
//     const audio = audioRef.current
//
//     const handlePlay = (stopAudio = false) => {
//         if (stopAudio && audio !== null) {
//             audio.pause()
//         } else if (audioIsPresent && audio !== null) {
//             isCurrentTrackPlaying ? audio.play() : audio.pause()
//         }
//     }
//
//     const handleTimeUpdate = () => {
//         setCurrentAudioDuration(audioRef.current.currentTime);
//     };
//
//     const playCurrentTrack = () => toggleCurrentTrackPlaying(!isCurrentTrackPlaying)
//
//     const handleNextTrack = async (isEnded) => {
//         setCurrentAudioIndex(currentAudioIndex + 1)
//         if (isCurrentTrackPlaying || isEnded === true) {
//             toggleCurrentTrackPlaying(false)
//             await delay(1000)
//             toggleCurrentTrackPlaying(true)
//         }
//     }
//
//     const handleSetCurrentAudioIndex = async (index) => {
//         if (isCurrentTrackPlaying) {
//             toggleCurrentTrackPlaying(false)
//         }
//         setCurrentAudioIndex(index)
//         await delay(500)
//         toggleCurrentTrackPlaying(true)
//     }
//
//     const pauseCurrentTrack = () => toggleCurrentTrackPlaying(false);
//
//     const handlePreviousTrack = async () => {
//         setCurrentAudioIndex(currentAudioIndex - 1)
//         if (isCurrentTrackPlaying) {
//             toggleCurrentTrackPlaying(false)
//             await delay(500)
//             toggleCurrentTrackPlaying(true)
//         }
//     }
//
//     useEffect(() => {
//         console.log(currentAudioIndex)
//     }, [currentAudioIndex])
//
//     useEffect(() => {
//         handlePlay(true)
//     }, [!audioIsPresent])
//
//
//     useEffect(() => {
//         handlePlay()
//     }, [isCurrentTrackPlaying]);
//
//
//     // useEffect(() => {
//     //     if (deletingAudioIndex === currentAudioIndex) {
//     //         isCurrentTrackPlaying && toggleCurrentTrackPlaying(false)
//     //         isCurrentItemDeleted && setCurrentAudioIndex(currentAudioIndex + 1)
//     //     }
//     //
//     // }, [deletingAudioIndex, isCurrentItemDeleted])
//
//     // useEffect(() => {
//     //     if (isCurrentItemDeleted && audioIsPresent) {
//     //         handleNextTrack()
//     //         debugger
//     //     }
//     //
//     // }, [isCurrentItemDeleted])
//
//     useEffect(() => {
//         const audio = audioRef.current
//         // const isCurrentAudioSrcPresent = audioSet.some(track => audio.src === track.url)
//         if (audioIsPresent) {
//             if (audio) {
//                 const isCurrentTrackPresent = audioSet.some(
//                     audioItem => audioItem.url === audio.src
//                 );
//                 if (isCurrentTrackPresent) {
//                     audio.src = currentTrack.url
//                     audio.load()
//                 }
//
//                 if (!isCurrentTrackPresent) {
//                     audio.src = ''
//                     audio.pause()
//                 }
//                 // setLocalStorageItem('currentAudioName', currentTrack.name)
//                 // setCurrentTrackNameInStorage(localStorage.getItem('currentAudioName'))
//                 const handleEnded = () => {
//                     handleNextTrack(true)
//                 };
//                 audio.addEventListener('ended', handleEnded);
//
//                 const handleDurationChange = () => {
//                     setTotalAudioDuration(audio.duration);
//                 };
//
//                 audio.addEventListener('durationchange', handleDurationChange);
//
//                 return () => {
//                     audio.removeEventListener('ended', handleEnded);
//                     audio.removeEventListener('durationchange', handleDurationChange);
//                 };
//             }
//         }
//     }, [audioIsPresent, currentAudioIndex, audioSet]);
//
//     const handleSeekBarChange = (event) => {
//         const currentTime = Number(event.target.value);
//         setCurrentAudioDuration(currentTime)
//         audio.currentTime = currentTime;
//     };
//
//
//     const prevBtnDisabled = currentAudioIndex === 0 || !audioIsPresent
//     const nextBtnDisabled = currentAudioIndex === audioSet.length - 1 || !audioIsPresent
//     const playBtnDisabled = !audioIsPresent
//
//
//     const audioPlayerState = {
//         audioRef,
//         currentAudioIndex,
//         isCurrentTrackPlaying,
//         handleSetCurrentAudioIndex,
//         playCurrentTrack,
//         pauseCurrentTrack,
//         handleNextTrack,
//         handlePreviousTrack,
//         prevBtnDisabled,
//         nextBtnDisabled,
//         playBtnDisabled,
//         handleSeekBarChange,
//         handleTimeUpdate,
//         currentAudioDuration,
//         totalAudioDuration,
//         currentTrack,
//         audioIsPresent,
//         currentTrackNameInStorage,
//
//     };
//
//     return (
//         <>
//             <AudioPlayerContext.Provider value={audioPlayerState}>{children}</AudioPlayerContext.Provider>;
//             <audio ref={audioRef}/>
//         </>
//     )
//
//
// }
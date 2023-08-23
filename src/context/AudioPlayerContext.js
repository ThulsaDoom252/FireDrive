import {createContext, useState} from 'react';
import {useEffect, useRef} from "react";
import {delay} from "../common/commonData";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";

export const AudioPlayerContext = createContext();

export function AudioPlayerContextProvider({children}) {
    const audioSet = useSelector(state => state.media.audioSet)
    const [repeatMode, setRepeatMode] = useState('none')
    const [volume, setVolume] = useState(0.5);
    const deletedItemUrl = useSelector(state => state.media.deletedItemUrl)
    const [currentDuration, setCurrentDuration] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isCurrentTrackPlaying, toggleCurrentTrackPlaying] = useState(false)
    let currentTrack = audioSet[currentTrackIndex] || {url: '', name: ''}
    const [currentTrackName, setCurrentTrackName] = useState('')
    const [showVolumeBar, toggleVolumeBar] = useState(false)
    const noAudio = audioSet.length === 0
    const audioRef = useRef(null)
    const audio = audioRef.current
    const lastPlayedAudioNameBeforeSort = useSelector(state => state.media.lastPlayedAudioNameBeforeSort)

    const isLastTrack = currentTrackIndex === audioSet?.length

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
        if (audio) {
            audio.src = currentTrack?.url
            audio.load()
        }

    }


    useEffect(() => {
        if (audio) {
            isCurrentTrackPlaying ?
                audio.play()
                    .catch(() => toast.error(`It seems audio is damaged..`))

                : audio.pause()
        }

    }, [isCurrentTrackPlaying])


    useEffect(() => {
        const audio = audioRef?.current
        let isTrackDeleted = audio?.src === deletedItemUrl

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

        if (!noAudio) {
            const isCurrentTrackChanged = currentTrack ? currentTrack.url !== audio?.src : void 0
            if (lastPlayedAudioNameBeforeSort === currentTrackName) {
                switchToTrackByName(lastPlayedAudioNameBeforeSort)
            } else if (isCurrentTrackChanged && !deletedItemUrl) {
                loadAudio()
            } else if (isCurrentTrackChanged && deletedItemUrl) {
                if (currentTrackIndex !== 0) {
                    setCurrentTrackIndex(currentTrackIndex - 1)
                    playNextOrPrevBasedOnCurrent()
                } else {
                    unloadAudio()
                    setCurrentTrackIndex(0)
                    loadAudio()
                    playNextOrPrevBasedOnCurrent()

                }

                void 0
            } else if (!isCurrentTrackChanged && !isTrackDeleted) {
                setCurrentTrackName(currentTrack.name)
            } else if (isTrackDeleted && !isLastTrack) {
                playNextOrPrevBasedOnCurrent()
                loadAudio()
            }
        } else {
            isCurrentTrackPlaying && toggleCurrentTrackPlaying(false)
            unloadAudio()
        }
        const handleEnded = async () => {
            if (repeatMode === 'none') {
                handleNextTrack({isEnded: true})
            } else if (repeatMode === 'once' || 'infinite') {
                setCurrentDuration(0)
                toggleCurrentTrackPlaying(false)
                await delay(100)
                toggleCurrentTrackPlaying(true)
                repeatMode === 'once' && setRepeatMode('none')

            }

            return void 0

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

    }, [audioSet?.length, audioSet?.name, audioSet, currentTrackIndex, repeatMode])


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
        repeatMode,
        setRepeatMode,
        audioRef,
        volume,
        setVolume,
        showVolumeBar,
        toggleVolumeBar,

    };

    return (
        <>
            <AudioPlayerContext.Provider value={audioPlayerState}>{children}</AudioPlayerContext.Provider>;
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}/>
        </>
    )

}
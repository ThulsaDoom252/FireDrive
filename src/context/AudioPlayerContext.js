import {createContext, useState} from 'react';
import {useEffect, useRef} from "react";
import {delay, setLocalStorageItem} from "../common/commonData";
import {useSelector} from "react-redux";

export const AudioPlayerContext = createContext();

export function AudioPlayerContextProvider({children}) {
    const [isCurrentTrackPlaying, toggleCurrentTrackPlaying] = useState(false);
    const audioSet = useSelector(state => state.media.audioSet)
    const audioIsPresent = audioSet.length !== 0
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [currentAudioDuration, setCurrentAudioDuration] = useState(0)
    const [totalAudioDuration, setTotalAudioDuration] = useState(0)
    const [currentTrackNameInStorage, setCurrentTrackNameInStorage] = useState(localStorage.getItem('currentAudioName'))

    const currentTrack = audioSet[currentAudioIndex]

    const audioRef = useRef(null)
    const audio = audioRef.current

    const handlePlay = (stopAudio = false) => {
        if (stopAudio && audio !== null) {
            audio.pause()
        } else if (audioIsPresent && audio !== null) {
            isCurrentTrackPlaying ? audio.play() : audio.pause()
        }
    }

    const handleTimeUpdate = () => {
        setCurrentAudioDuration(audioRef.current.currentTime);
    };

    const playCurrentTrack = () => toggleCurrentTrackPlaying(!isCurrentTrackPlaying)

    const handleNextTrack = async (isEnded) => {
        if (isEnded) {
            toggleCurrentTrackPlaying(false)
            setCurrentAudioIndex(currentAudioIndex + 1)
            await delay(500)
            toggleCurrentTrackPlaying(true)
        } else if (isCurrentTrackPlaying) {
            toggleCurrentTrackPlaying(false)
            await delay(500)
            toggleCurrentTrackPlaying(true)
        }
    }

    const handleSetCurrentAudioIndex = async (index) => {
        if (isCurrentTrackPlaying) {
            toggleCurrentTrackPlaying(false)
        }
        setCurrentAudioIndex(index)
        await delay(500)
        toggleCurrentTrackPlaying(true)
    }
    const pauseCurrentTrack = () => toggleCurrentTrackPlaying(false);

    const handlePreviousTrack = async () => {
        setCurrentAudioIndex(currentAudioIndex - 1)
        if (isCurrentTrackPlaying) {
            toggleCurrentTrackPlaying(false)
            await delay(500)
            toggleCurrentTrackPlaying(true)
        }
    }

    useEffect(() => {
        handlePlay(true)
    }, [!audioIsPresent])


    useEffect(() => {
        handlePlay()
    }, [isCurrentTrackPlaying]);

    useEffect(() => {
        if (audioIsPresent) {
            const audio = audioRef.current
            if (audioIsPresent && audio) {
                audio.src = currentTrack.url
                audio.load()
                setLocalStorageItem('currentAudioName', currentTrack.name)
                setCurrentTrackNameInStorage(localStorage.getItem('currentAudioName'))
                const handleEnded = () => {
                    handleNextTrack(true)
                };
                audio.addEventListener('ended', handleEnded);

                const handleDurationChange = () => {
                    setTotalAudioDuration(audio.duration);
                };

                audio.addEventListener('durationchange', handleDurationChange);

                return () => {
                    audio.removeEventListener('ended', handleEnded);
                    audio.removeEventListener('durationchange', handleDurationChange);
                };
            }
        } else {
            void 0
        }
    }, [audioIsPresent, currentAudioIndex]);

    const handleSeekBarChange = (event) => {
        const currentTime = Number(event.target.value);
        setCurrentAudioDuration(currentTime)
        audio.currentTime = currentTime;
    };


    const prevBtnDisabled = currentAudioIndex === 0 || !audioIsPresent
    const nextBtnDisabled = currentAudioIndex === audioSet.length - 1 || !audioIsPresent
    const playBtnDisabled = !audioIsPresent


    const audioPlayerState = {
        audioRef,
        currentAudioIndex,
        isCurrentTrackPlaying,
        handleSetCurrentAudioIndex,
        playCurrentTrack,
        pauseCurrentTrack,
        handleNextTrack,
        handlePreviousTrack,
        prevBtnDisabled,
        nextBtnDisabled,
        playBtnDisabled,
        handleSeekBarChange,
        handleTimeUpdate,
        currentAudioDuration,
        totalAudioDuration,
        currentTrack,
        audioIsPresent,
        currentTrackNameInStorage,

    };

    return (
        <>
            <AudioPlayerContext.Provider value={audioPlayerState}>{children}</AudioPlayerContext.Provider>;
        </>
    )


}
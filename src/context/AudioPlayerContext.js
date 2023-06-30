import {createContext, useState} from 'react';
import {useEffect, useRef} from "react";
import {delay} from "../common/commonData";
import {useSelector} from "react-redux";


export const AudioPlayerContext = createContext();

export function AudioPlayerContextProvider({children}) {
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [isCurrentTrackPlaying, toggleCurrentTrackPlaying] = useState(false);
    const audioSet = useSelector(state => state.media.audioSet)
    const audioIsPresent = audioSet.length !== 0

    const currentTrack = audioSet[currentAudioIndex]

    const audioRef = useRef(null)
    const audio = audioRef.current

    const handlePlay = () => {
        if (audioIsPresent && audio !== null) {
            isCurrentTrackPlaying ? audio.play() : audio.pause()
        }
    }

    useEffect(() => {
        handlePlay()
    }, [isCurrentTrackPlaying]);

    useEffect(() => {
        const audio = audioRef.current
        if (audioIsPresent && audio) {
            audio.src = currentTrack.url
            audio.load()
            const handleEnded = () => {
                toggleCurrentTrackPlaying(false);
                goToNextTrack({dispatch}, currentAudioIndex, audioSet)
            };
            audio.addEventListener('ended', handleEnded);

            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }

    }, [audioIsPresent, currentAudioIndex]);

    const playCurrentTrack = () => toggleCurrentTrackPlaying(!isCurrentTrackPlaying)

    const handleNextTrack = async () => {
        setCurrentAudioIndex(currentAudioIndex + 1)
        if (isCurrentTrackPlaying) {
            toggleCurrentTrackPlaying(false)
            await delay(500)
            toggleCurrentTrackPlaying(true)
        }
    }

    const handleSetCurrentAudioIndex = async (index) => {
        if (isCurrentTrackPlaying) {
            toggleCurrentTrackPlaying(false)
        }
        debugger
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

    };

    return (
        <>
            <AudioPlayerContext.Provider value={audioPlayerState}>{children}</AudioPlayerContext.Provider>;
        </>
    )


}
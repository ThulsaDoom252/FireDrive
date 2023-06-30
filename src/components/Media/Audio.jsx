import React from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import {truncate} from "../../common/commonData";

const Audio = ({audioName, index = 0}) => {

    const audioContext = useContext(AudioPlayerContext)

    const {
        currentAudioIndex,
        handleSetCurrentAudioIndex,
        isCurrentTrackPlaying,
        playCurrentTrack
    } = audioContext


    const isTrackFromTheListPlaying = isCurrentTrackPlaying && currentAudioIndex === index
    const isTrackFromTheListNotPlaying = !isCurrentTrackPlaying && currentAudioIndex === index

    const audioRelay = (index) => {
        if (isTrackFromTheListPlaying || isTrackFromTheListNotPlaying) {
            playCurrentTrack()
        } else if (!isTrackFromTheListPlaying || isTrackFromTheListNotPlaying) {
            handleSetCurrentAudioIndex(index)
        }
    }

    return (
        <div
            className={`${currentAudioIndex === index ? 'bg-yellow-600' : 'bg-blue-500'} -full  h-10 text-white flex items-center mb-5 rounded`}>
            <div className={'w-10 text-xl h-full flex justify-center items-center '}
                 onClick={() => audioRelay(index)}>
                {isTrackFromTheListPlaying ? <AiFillPauseCircle/> : <AiFillPlayCircle/>}

            </div>
            <p>{truncate(audioName)}</p>
        </div>
    );
};


export default Audio;
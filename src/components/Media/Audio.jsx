import React from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import {truncate} from "../../common/commonData";

const Audio = ({audioName, audioIndex = 0, index = 0,}) => {

    const audioContext = useContext(AudioPlayerContext)

    const {
        currentAudioIndex,
        handleSetCurrentAudioIndex,
        isCurrentTrackPlaying,
        playCurrentTrack,
        handleSeekBarChange,
        handleTimeUpdate,
        audioRef,
        currentAudioDuration,
        totalAudioDuration,
        currentTrackNameInStorage,
    } = audioContext


    const isTrackFromTheListPlaying = isCurrentTrackPlaying && currentTrackNameInStorage === audioName
    const isTrackFromTheListNotPlaying = !isCurrentTrackPlaying && currentTrackNameInStorage === audioName

    const audioRelay = (audioIndex) => {
        if (isTrackFromTheListPlaying || isTrackFromTheListNotPlaying) {
            playCurrentTrack()
        } else if (!isTrackFromTheListPlaying || isTrackFromTheListNotPlaying) {
            handleSetCurrentAudioIndex(audioIndex)
        }
    }

    const currentTrackPlaying = currentTrackNameInStorage === audioName

    return (
        <div
            className={`${currentTrackPlaying ? 'bg-yellow-600' : 'bg-blue-500'} -full  h-40  text-white flex items-center mb-5  relative rounded flex`}>
            <div>
                <div className={'w-10 text-xl h-full flex justify-center items-center '}
                     onClick={() => audioRelay(audioIndex)}>
                    {isTrackFromTheListPlaying ? <AiFillPauseCircle/> : <AiFillPlayCircle/>}
                </div>
            </div>
            <div className={'w-full flex flex-col'}>
                <p>{audioName}</p>
                {/*{currentTrackPlaying && (*/}
                {/*    <div className="relative w-full">*/}
                {/*        <input*/}
                {/*            className="absolute bottom-1 left-0 w-full h-full"*/}
                {/*            type="range"*/}
                {/*            min="0"*/}
                {/*            max={totalAudioDuration}*/}
                {/*            value={currentAudioDuration}*/}
                {/*            onChange={handleSeekBarChange}*/}
                {/*        />*/}
                {/*        <div className="h-2 overflow-hidden ">*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}

            </div>
            {/*<audio ref={audioRef} onTimeUpdate={handleTimeUpdate}/>*/}
        </div>
    );
};


export default Audio;
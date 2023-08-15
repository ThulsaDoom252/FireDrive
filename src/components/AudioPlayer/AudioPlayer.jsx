import {FiSkipBack, FiSkipForward, FiPlay, FiPause, FiRepeat} from 'react-icons/fi';
import {connect} from "react-redux";
import {useContext, useState} from "react";
import SeekBar from "./SeekBar";
import {setCurrentAudioIndex} from "../../redux/mediaSlice";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import {formatTime, truncate} from "../../common/commonData";
import AudioPlayerDisabled from "./AudioPlayerDisabled";
import {BsFillVolumeUpFill, BsVolumeMute} from "react-icons/bs";
import {LuRepeat, LuRepeat1} from "react-icons/lu";
import {IoInfinite} from "react-icons/io5";
import {ImVolumeHigh, ImVolumeMute2} from "react-icons/im";

const AudioPlayer = ({smallScreenMode, shouldTruncate = false, buttonsBlockWidth = 'full', showTime = false}) => {

    const audioContext = useContext(AudioPlayerContext)

    const {
        isCurrentTrackPlaying,
        setIsCurrentTrackPlaying,
        currentDuration,
        totalDuration,
        handlePreviousTrack,
        handleNextTrack,
        nextBtnDisabled,
        prevBtnDisabled,
        playBtnDisabled,
        currentTrackName,
        noAudio,
        handleSeekBarChange,
        repeatMode,
        setRepeatMode,
        audioRef,
        volume,
        setVolume,
    } = audioContext

    if (noAudio) {
        return <AudioPlayerDisabled/>
    }

    const handleRepeatMode = () => {
        if (repeatMode === 'none') {
            setRepeatMode('once')
        } else if (repeatMode === 'once') {
            setRepeatMode('infinite')
        } else if (repeatMode === 'infinite') {
            setRepeatMode('none')
        }
    }


    const handleVolumeChange = ({event, mute = false}) => {
        if (mute) {
            audioRef.current.volume = 0
            return void 0
        }
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (audioRef?.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div
            className={`${!smallScreenMode ? 'rounded' : void 0} w-full h-full flex flex-col justify-between`}>
            <div>
                <SeekBar value={currentDuration} max={totalDuration} onChange={handleSeekBarChange}/>
            </div>
            <div>
                <span
                    className={'bg-transparent overflow-hidden animate-marquee'}>{shouldTruncate ? truncate(currentTrackName, 12) : currentTrackName}</span>
            </div>
            <div className={`w-full  flex items-center justify-between`}>
                <div className={`w-${buttonsBlockWidth} flex items-center justify-between`}>
                    <button
                        className="hover:bg-blue-400 rounded transition text-2xl  disabled:text-gray-500 enabled:text-black"
                        disabled={prevBtnDisabled}
                        onClick={handlePreviousTrack}>
                        <FiSkipBack/>
                    </button>
                    <button disabled={playBtnDisabled}
                            className="hover:bg-blue-400 rounded transition text-4xl disabled:text-gray-500 enabled:text-black "
                            onClick={() => setIsCurrentTrackPlaying(!isCurrentTrackPlaying)}>
                        {isCurrentTrackPlaying ? <FiPause/> : <FiPlay/>}
                    </button>
                    <button
                        className="text-2xl disabled:text-gray-500 hover:bg-blue-400 rounded transition enabled:text-black"
                        disabled={nextBtnDisabled}
                        onClick={handleNextTrack}>
                        <FiSkipForward/>
                    </button>
                </div>
                <div className={`w-${buttonsBlockWidth} flex items-center justify-end `}>
                    <div className={'w-1/4 flex justify-between mr-10'}>
                        <button onClick={handleRepeatMode} className={'hover:bg-blue-400 rounded transition'}>
                            {repeatMode === 'none' ? <LuRepeat size={20}/> : repeatMode === 'once' ?
                                <LuRepeat1 size={20}/> : <IoInfinite size={20}/>}

                        </button>
                        <div className={'flex space-between'}>
                            <button>
                                {volume !== 0 ? <ImVolumeHigh size={20}/> : <ImVolumeMute2 size={20}/>}

                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={event => handleVolumeChange({event})}
                            />
                        </div>

                    </div>
                </div>
            </div>
            {showTime && <div className={'mx-auto'}>
                {formatTime(currentDuration)} / {formatTime(totalDuration)}
            </div>}

        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {setCurrentAudioIndex})(AudioPlayer);





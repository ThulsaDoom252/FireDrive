import {FiSkipBack, FiSkipForward, FiPlay, FiPause} from 'react-icons/fi';
import {connect} from "react-redux";
import {useContext} from "react";
import SeekBar from "./SeekBar";
import {setCurrentAudioIndex} from "../../redux/mediaSlice";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import {formatTime} from "../../common/commonData";
import AudioPlayerDisabled from "./AudioPlayerDisabled";

const AudioPlayer = ({smallScreenMode}) => {

    const audioContext = useContext(AudioPlayerContext)

    const {
        isCurrentTrackPlaying,
        audioRef,
        handlePreviousTrack,
        handleNextTrack,
        playCurrentTrack,
        prevBtnDisabled,
        nextBtnDisabled,
        playBtnDisabled,
        currentAudioDuration,
        totalAudioDuration,
        handleSeekBarChange,
        handleTimeUpdate,
        currentTrack,
        audioIsPresent,
        currentTrackNameInStorage,
    } = audioContext

    if (!audioIsPresent) {
        return <AudioPlayerDisabled/>
    }

    return (
        <div
            className={`${!smallScreenMode ? 'rounded' : void 0} w-full h-full flex flex-col justify-between`}>
            <div>
                <marquee
                    className={'marquee bg-transparent overflow-hidden animate-marquee'}>{currentTrackNameInStorage}</marquee>
            </div>
            <div className={`w-full flex items-center justify-between`}>
                <button className="text-2xl  disabled:text-gray-500 enabled:text-black" disabled={prevBtnDisabled}
                        onClick={handlePreviousTrack}>
                    <FiSkipBack/>
                </button>
                <button disabled={playBtnDisabled} className="text-4xl disabled:text-gray-500 enabled:text-black "
                        onClick={playCurrentTrack}>
                    {isCurrentTrackPlaying ? <FiPause/> : <FiPlay/>}
                </button>
                <button className="text-2xl disabled:text-gray-500 enabled:text-black" disabled={nextBtnDisabled}
                        onClick={handleNextTrack}>
                    <FiSkipForward/>
                </button>
            </div>
            <div className={'mx-auto'}>
                {formatTime(currentAudioDuration)} / {formatTime(totalAudioDuration)}
            </div>
            <div>
                <SeekBar value={currentAudioDuration} max={totalAudioDuration} onChange={handleSeekBarChange}/>
            </div>
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}/>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {setCurrentAudioIndex})(AudioPlayer);



import {FiSkipBack, FiSkipForward, FiPlay, FiPause} from 'react-icons/fi';
import {connect} from "react-redux";
import {useContext} from "react";
import SeekBar from "./SeekBar";
import {setCurrentAudioIndex} from "../../redux/mediaSlice";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";

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
    } = audioContext

    return (
        <div className={`${!smallScreenMode ? 'rounded' : void 0} w-full h-full flex flex-col justify-center`}>
            <div className={`w-full h-full flex items-center justify-between  p-5`}>
                <button className="text-2xl text-black disabled:text-gray-500 " disabled={prevBtnDisabled}
                        onClick={handlePreviousTrack}>
                    <FiSkipBack/>
                </button>
                <button disabled={playBtnDisabled} className="text-4xl text-black disabled:text-gray-500 "
                        onClick={playCurrentTrack}>
                    {isCurrentTrackPlaying ? <FiPause/> : <FiPlay/>}
                </button>
                <button className="text-2xl text-black disabled:text-gray-500 " disabled={nextBtnDisabled}
                        onClick={handleNextTrack}>
                    <FiSkipForward/>
                </button>
                <audio ref={audioRef}/>
            </div>
            {/*<div>*/}
            {/*    <SeekBar value={0} max={100}/>*/}
            {/*</div>*/}
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {setCurrentAudioIndex})(AudioPlayer);



import {FiSkipBack, FiSkipForward, FiPlay, FiPause} from 'react-icons/fi';
import {connect} from "react-redux";
import {useContext} from "react";
import DurationSeekBar from "./DurationSeekBar";
import {setCurrentAudioIndex} from "../../redux/mediaSlice";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import AudioPlayerDisabled from "./AudioPlayerDisabled";
import {LuRepeat, LuRepeat1} from "react-icons/lu";
import {IoInfinite} from "react-icons/io5";
import {ImVolumeHigh, ImVolumeMute2} from "react-icons/im";
import VolumeBar from "./VolumeBar";

const AudioPlayer = ({
                         smallScreenMode,
                         buttonsSize = 28,
                         currentTheme,
                     }) => {


    const audioContext = useContext(AudioPlayerContext)
    const iconColor = currentTheme?.color

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
        noAudio,
        handleSeekBarChange,
        repeatMode,
        volume,
        currentTrackName,
        handleRepeatMode,
        handleVolumeChange,
        toggleMuteVolume,
    } = audioContext

    if (noAudio) {
        return <AudioPlayerDisabled buttonsSize={buttonsSize}/>
    }


    return (
        <div
            className={`${smallScreenMode && 'rounded ' +
            'justify-center'} 
            w-full 
            h-full
            flex
            justify-center
            ${smallScreenMode ? 'items-end' : 'items-center'}             
            `}>
            <div className={'w-player-controls flex flex-col justify-between items-center'}>
                <div className={`w-full  flex items-center justify-between `}>
                    <div className={'flex items-center  justify-between mr-2'}>
                        <button
                            className={`
                            hover:bg-blue-400   
                            flex justify-center 
                            items-center 
                            rounded 
                            transition 
                            text-2xl 
                              ${prevBtnDisabled ? 'text-gray-500' : iconColor}
                             `}
                            disabled={prevBtnDisabled}
                            onClick={handlePreviousTrack}>
                            <FiSkipBack size={buttonsSize}/>
                        </button>
                        <button disabled={playBtnDisabled}
                                className={`
                                 text-center 
                                w-20  
                                flex justify-center 
                                items-center 
                                hover:bg-blue-400  
                                rounded 
                                text-4xl    
                        
                                 ${playBtnDisabled ? 'text-gray-500' : iconColor}                   
                               `}
                                onClick={() => setIsCurrentTrackPlaying(!isCurrentTrackPlaying)}>
                            {isCurrentTrackPlaying ? <FiPause size={buttonsSize}/> : <FiPlay size={buttonsSize}/>}
                        </button>
                        <button
                            className={`
                                 text-center 
                                flex justify-center 
                                items-center 
                                hover:bg-blue-400  
                                rounded 
                                text-4xl    
                                  ${nextBtnDisabled ? 'text-gray-500' : iconColor}                  
                               `}
                            disabled={nextBtnDisabled}
                            onClick={handleNextTrack}>
                            <FiSkipForward size={buttonsSize}/>
                        </button>
                    </div>
                    <div className={`
                  w-full
                  ${smallScreenMode ? 'absolute top-0 right-0' : 'mr-3'}`
                    }>
                        <DurationSeekBar
                            smallScreenMode={smallScreenMode}
                            isCurrentTrackPlaying={isCurrentTrackPlaying}
                            name={currentTrackName}
                            value={currentDuration}
                            max={totalDuration}
                            onChange={handleSeekBarChange}/>
                    </div>
                    <div className={``}>
                        <div className={'w-40 flex justify-start relative'}>
                            <button onClick={handleRepeatMode} className={`
                                hover:bg-blue-400 
                                rounded
                                ${iconColor}
                              
                                 `}
                            >
                                {repeatMode === 'none' ? <LuRepeat size={20}/> : repeatMode === 'once' ?
                                    <LuRepeat1 size={20}/> : <IoInfinite size={20}/>}

                            </button>
                            <div className={'flex relative ml-2'}>
                                <button
                                    onClick={toggleMuteVolume}
                                    className={`
                                disabled:text-gray-400
                   ${iconColor}`}
                                >
                                    {volume !== 0 ? <ImVolumeHigh size={20}/> : <ImVolumeMute2 size={20}/>}
                                </button>
                                <div className={'w-20 absolute bottom-2 left-7 '}>
                                    <VolumeBar  volume={volume}
                                               handleVolumeChange={handleVolumeChange}/>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/*<span*/}
                {/*    className={'bg-transparent overflow-hidden animate-marquee'}>{shouldTruncate ? truncate(currentTrackName, 12) : currentTrackName}</span>*/}
            </div>

        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {setCurrentAudioIndex})(AudioPlayer);





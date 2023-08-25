import {FiSkipBack, FiSkipForward, FiPlay, FiPause} from 'react-icons/fi';
import {connect} from "react-redux";
import {useContext} from "react";
import SeekBar from "./SeekBar";
import {setCurrentAudioIndex} from "../../redux/mediaSlice";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import {formatTime} from "../../common/commonData";
import AudioPlayerDisabled from "./AudioPlayerDisabled";
import {LuRepeat, LuRepeat1} from "react-icons/lu";
import {IoInfinite} from "react-icons/io5";
import {ImVolumeHigh, ImVolumeMute2} from "react-icons/im";

const AudioPlayer = ({
                         smallScreenMode,
                         buttonsSize = 28,
                         shouldTruncate = false,
                         currentTheme,
                         showTime = false,
                         height = 'h-playerHeight'


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
        setRepeatMode,
        audioRef,
        volume,
        setVolume,
        showVolumeBar,
        toggleVolumeBar,
        currentTrackName,
    } = audioContext

    if (noAudio) {
        return <AudioPlayerDisabled buttonsSize={buttonsSize}/>
    }


    const handleMouseEnter = () => {
        toggleVolumeBar(true)
    }

    const handleMouseExit = () => {
        toggleVolumeBar(false)
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
            className={`${!smallScreenMode && 'rounded justify-center'} w-full h-playerHeight flex justify-center items-center `}>
            <div className={'w-player-controls flex flex-col justify-between items-center'}>
                <div className={'w-full'} hidden={!smallScreenMode}>
                    <SeekBar
                        isCurrentTrackPlaying={isCurrentTrackPlaying}
                        name={currentTrackName}
                        currentTheme={currentTheme}
                        value={currentDuration}
                        max={totalDuration}
                        smallScreen={smallScreenMode}
                        onChange={handleSeekBarChange}/>
                </div>
                <div className={`w-full  flex items-center justify-between`}>
                    <div className={'flex items-center justify-between'}>
                        <button
                            className={`
                            hover:bg-blue-400   
                            flex justify-center 
                            items-center 
                            w-20 rounded 
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
                                w-20  
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
                    <div hidden={smallScreenMode} className='w-full mr-5 ml-2'>
                        <SeekBar
                            isCurrentTrackPlaying={isCurrentTrackPlaying}
                            name={currentTrackName}
                            currentTheme={currentTheme}
                            value={currentDuration}
                            max={totalDuration}
                            onChange={handleSeekBarChange}/>
                    </div>

                    <div className={``}>
                        <div className={'w-20 flex justify-between mr-10 relative'}>
                            <button onClick={handleRepeatMode} className={`
                                hover:bg-blue-400 
                                rounded
                                ${iconColor}
                              
                                 `}
                            >
                                {repeatMode === 'none' ? <LuRepeat size={20}/> : repeatMode === 'once' ?
                                    <LuRepeat1 size={20}/> : <IoInfinite size={20}/>}

                            </button>
                            <div>
                                <button className={`
                                disabled:text-gray-400
                   ${iconColor}`}
                                >
                                    {volume !== 0 ? <ImVolumeHigh size={20}/> : <ImVolumeMute2 size={20}/>}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                {showTime && <div className={'mx-auto'}>
                    {formatTime(currentDuration)} / {formatTime(totalDuration)}
                </div>}

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





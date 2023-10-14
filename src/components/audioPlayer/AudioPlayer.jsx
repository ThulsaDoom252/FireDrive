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
import Button from "@mui/material/Button";
import {customBtns} from "../mui/styles";

const AudioPlayer = ({
                         smallScreenMode,
                         buttonsSize: iconSize = 28,
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
        return <AudioPlayerDisabled buttonsSize={iconSize}/>
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
                    <div className={`flex  items-center justify-between mr-2 ${smallScreenMode && 'relative top-2'}`}>
                        <Button sx={customBtns.audioPlayerPlayBtn}
                                className={`${prevBtnDisabled ? 'text-gray' : iconColor}`}
                                disabled={prevBtnDisabled}
                                onClick={handlePreviousTrack}>
                            <FiSkipBack size={iconSize}
                            />
                        </Button>
                        <Button sx={customBtns.audioPlayerPlayBtn}
                                className={`${playBtnDisabled ? 'text-gray' : iconColor}`}
                                onClick={() => setIsCurrentTrackPlaying(!isCurrentTrackPlaying)}
                                disabled={playBtnDisabled}>{isCurrentTrackPlaying ? <FiPause size={iconSize}/> :
                            <FiPlay size={iconSize}/>} </Button>
                        <Button
                            sx={customBtns.audioPlayerPlayBtn}
                            disabled={nextBtnDisabled}
                            className={`${nextBtnDisabled ? 'text-gray' : iconColor}`}
                            onClick={handleNextTrack}>
                            <FiSkipForward size={iconSize}/>
                        </Button>
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
                    <div>
                        <div
                            className={`w-40 flex justify-center items-center ${smallScreenMode && 'relative top-2'} `}>
                            <Button
                                className={iconColor}
                                sx={customBtns.audioPlayerBtn}
                                onClick={handleRepeatMode}
                            >
                                {repeatMode === 'none' ? <LuRepeat size={20}/> : repeatMode === 'once' ?
                                    <LuRepeat1 size={20}/> : <IoInfinite size={20}/>}

                            </Button>
                            <div className={'flex relative ml-2'}>
                                <Button
                                    sx={customBtns.audioPlayerBtn}
                                    onClick={toggleMuteVolume}
                                    className={`
                                    relative
                                disabled:text-gray-400
                                ${smallScreenMode ? 'top-3' : 'top-1'}
                   ${iconColor}`}
                                >
                                    {volume !== 0 ? <ImVolumeHigh size={20}/> : <ImVolumeMute2 size={20}/>}
                                </Button>
                                <div className={'w-20 relative top-0.5'}>
                                    <VolumeBar volume={volume}
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

    )
        ;
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {setCurrentAudioIndex})(AudioPlayer);





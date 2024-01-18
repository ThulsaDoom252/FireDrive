import React from 'react';
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
import FittedThemeBtn from "../common/theme/FittedThemeBtn";
import ThemedVolumeBar from "../common/theme/ThemedVolumeBar";
import {VisibilityOff} from "@mui/icons-material"
import {download} from "../../dal"
import {FaDownload} from 'react-icons/fa';

const AudioPlayer = ({
                         smallScreenMode,
                         buttonsSize: iconSize = 28,
                         currentTheme,
                         currentRoute,
                         handlePlayerVisibility,
                     }) => {

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
        noAudio,
        handleSeekBarChange,
        repeatMode,
        volume,
        currentTrackName,
        handleRepeatMode,
        handleVolumeChange,
        toggleMuteVolume,
        currentTrack,
    } = audioContext

    const audioPlayerButtons = [
        {
            type: 'prev',
            onClick: () => handlePreviousTrack(),
            isDisabled: prevBtnDisabled,
            icon:    <FiSkipBack size={iconSize}/>
        },
        {
            type: 'play',
            onClick: () => setIsCurrentTrackPlaying(!isCurrentTrackPlaying),
            isDisabled: playBtnDisabled,
            icon:    isCurrentTrackPlaying ? <FiPause size={iconSize}/> : <FiPlay size={iconSize}/>
        },
        {
            type: 'next',
            onClick: handleNextTrack,
            isDisabled: nextBtnDisabled,
            icon: <FiSkipForward size={iconSize}/>
        }
    ]

    const audioPlayerOptions = [
        {
            type: 'toggle',
            onClick: () => handlePlayerVisibility(),
            icon: <VisibilityOff/>,
        },
        {
            type: 'repeat',
            onClick: () => handleRepeatMode(),
            icon: repeatMode === 'none' ? <LuRepeat size={20}/> : repeatMode === 'once' ?
                <LuRepeat1 size={20}/> : <IoInfinite size={20}/>,
        },
        {
            type: 'download',
            onClick: () => download(currentTrack.url, currentTrackName, currentRoute),
            icon: <FaDownload/>,
        },
    ]

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
                    <div
                        className={`flex  items-center justify-between mr-2 ${smallScreenMode && 'relative top-2'}`}>
                        {audioPlayerButtons.map((btn, index) => <React.Fragment key={index}>
                            <FittedThemeBtn isDisabled={btn.isDisabled} onClick={btn.onClick}>
                                {btn.icon}
                            </FittedThemeBtn>
                        </React.Fragment>)}
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
                            className={`flex justify-center items-center ${smallScreenMode && 'relative top-2'} `}>
                            {audioPlayerOptions.map((btn, index) => <React.Fragment key={index}>
                                <FittedThemeBtn onClick={btn.onClick}>
                                    {btn.icon}
                                </FittedThemeBtn>
                            </React.Fragment>)}
                            <div className={'flex relative ml-2'}>
                                <FittedThemeBtn
                                    onClick={toggleMuteVolume}
                                >
                                    {volume !== 0 ? <ImVolumeHigh size={20}/> : <ImVolumeMute2 size={20}/>}
                                </FittedThemeBtn>
                                <div className={'w-20 relative top-0.5'}>
                                    <ThemedVolumeBar value={volume} handleChange={handleVolumeChange}
                                                     barWidth={'5px'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>

    )
}
export default connect(null, {setCurrentAudioIndex})(AudioPlayer);





import React from 'react';
import {useSelector} from "react-redux";
import {primeDayBg, primeNightBg} from "./themes";

const AudioThemeContainer = ({
                                 primeBgCondition,
                                 className,
                                 children,
                                 onClick,
                                 isAudioLoaded,
                                 onMouseEnter,
                                 onMouseLeave
                             }) => {
    const currentTheme = useSelector(state => state.app.currentTheme)


    const audioContainerStyle = {
        color: currentTheme.color,
    }

    const isDayTheme = currentTheme.primeBg === primeDayBg
    const isNightTheme = currentTheme.primeBg === primeNightBg

    return (
        <div style={audioContainerStyle}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             className={`${className} 
             ${isDayTheme ? (primeBgCondition ? 'bg-day-prime' : 'bg-day-sec') : isNightTheme 
                 ? (primeBgCondition ? 'bg-night-prime' : 'bg-night-sec') : (primeBgCondition ? 'bg-desert-prime ' : 'bg-desert-sec')} 
                 ${isAudioLoaded ? (primeBgCondition ? 'border-b-2 bg-opacity-100' : 'bg-opacity-50') : 'bg-opacity-50'}`}
             onClick={onClick}>
            {children}
        </div>
    );
};

export default AudioThemeContainer;
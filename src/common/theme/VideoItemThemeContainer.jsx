import React from 'react';
import {primeDayBg, primeNightBg} from "./themes";
import {useSelector} from "react-redux";

const VideoItemThemeContainer = ({opacityCondition, className, children}) => {
    const currentTheme = useSelector(state => state.app.currentTheme)
    return (
        <div style={{color: currentTheme.color}}
             className={`${className} ${currentTheme.primeBg === primeDayBg ? 'bg-day-sec' : currentTheme.primeBg
             === primeNightBg ? 'bg-night-sec' : 'bg-desert-sec'} ${opacityCondition ? 'bg-opacity-100' : 'bg-opacity-50 rounded-b-lg'}`}>
            {children}
        </div>
    );
};

export default VideoItemThemeContainer;
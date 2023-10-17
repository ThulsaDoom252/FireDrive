import React from 'react';
import {useSelector} from "react-redux";

const ThemeContainer = ({children, className, bgType = 'prime', enableColor = false}) => {
    const currentTheme = useSelector(state => state.app.currentTheme)
    return (
        <div style={{color: enableColor ? currentTheme.color : '', backgroundColor: bgType === 'prime' ? currentTheme.primeBg : currentTheme.secBg}} className={className}>
            {children}
        </div>
    );
};

export default ThemeContainer;
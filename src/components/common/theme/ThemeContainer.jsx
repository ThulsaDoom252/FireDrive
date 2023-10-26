import React from 'react';
import {useSelector} from "react-redux";

const ThemeContainer = ({children, className, secBg, enableColor = false, noBg = false}) => {
    const currentTheme = useSelector(state => state.app.currentTheme)

    const containerStyle = {
        color: enableColor ? currentTheme.color : '',
        backgroundColor: !noBg ? (!secBg ? currentTheme.primeBg : currentTheme.secBg) : ''
    }

    return (
        <div style={containerStyle}
             className={className}>
            {children}
        </div>
    );
};

export default ThemeContainer;
import React from 'react';
import {useSelector} from "react-redux";

const ThemeContainer = ({children, className, bgType = 'prime'}) => {

    const currentTheme = useSelector(state => state.app.currentTheme)
    return (
        <div className={`${className}  ${bgType === 'prime' ? currentTheme.primeBg : currentTheme.secBg}`}>
            {children}
        </div>
    );
};

export default ThemeContainer;
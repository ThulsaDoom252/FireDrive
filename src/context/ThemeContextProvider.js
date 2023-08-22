import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const ThemeContext = createContext()

const ThemeContextProvider = ({children}) => {
    const currentTheme = useSelector(state => state.app.currentTheme)


    const themeContextValues = {
        currentTheme,
    }

    return (
        <ThemeContextProvider values={themeContextValues}>
            {children}
        </ThemeContextProvider>
    );
};

export default ThemeContextProvider;
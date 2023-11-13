import React from 'react';
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";

const ThemeBtn = ({children, fullWidth, onClick, disabled, className, size}) => {

    const primeBg = useSelector(state => state.app.currentTheme.primeBg)
    const activeBg = useSelector(state => state.app.currentTheme.activeColor)
    const color = useSelector(state => state.app.currentTheme.color)

    const themeBtnClass = {
        color,
        width: fullWidth && '100%',
        background: primeBg,
        transition: 'background 0.3s',
        '&:hover': {
            background: activeBg,
        },
    }

    return (
        <Button size={size}
                className={className}
                sx={themeBtnClass}
                disabled={disabled}
                onClick={onClick}>
            {children}
        </Button>
    );
};

export default ThemeBtn;
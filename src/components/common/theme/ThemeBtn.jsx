import React from 'react';
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";

const ThemeBtn = ({children, fullWidth, onClick, disabled, className, size, rounded}) => {

    const primeBg = useSelector(state => state.app.currentTheme.primeBg)
    const activeBg = useSelector(state => state.app.currentTheme.activeColor)
    const color = useSelector(state => state.app.currentTheme.color)

    const themeBtnClass = {
        color,
        width: fullWidth ? '100%' : 'auto',
        background: primeBg,
        borderRadius: rounded ? '50%' : '0',
        transition: 'background 0.3s',
        '&:hover': {
            background: activeBg,
        },
        ...(rounded && {
            maxWidth: '50px',
            maxHeight: '50px',
            width: '50px',
            height: '50px',
            minHeight: '50px',
            minWidth: '50px'
        }),
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
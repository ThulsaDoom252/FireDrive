import React from 'react';
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";

const FittedThemeBtn = ({children, isDisabled, onClick, navButton, isActive}) => {
    const activeColor = useSelector(state => state.app.currentTheme.color)
    const inactiveColor = useSelector(state => state.app.currentTheme.navColor)

    const fittedBtnClass = {
        color: navButton ? (isActive ? activeColor : inactiveColor) : activeColor,
        minHeight: 'fit-content',
        minWidth: 'fit-content',
        maxHeight: 'fit-content',
        maxWidth: 'fit-content',
        transition: 'color 0.3s', // Плавная анимация изменения цвета фона
        '&:hover': {
            color: navButton && activeColor, // Новый цвет фона при наведении
        },
    }

    return (
        <Button sx={fittedBtnClass} disabled={isDisabled} onClick={onClick}>
            {children}
        </Button>


    );
};

export default FittedThemeBtn;
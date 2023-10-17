import React from 'react';
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {primeDayBg} from "./theme/themes";

const FittedThemeBtn = ({key, children, isDisabled, onClick, navButton, isActive, className, imgModalBtn}) => {
    const activeColor = useSelector(state => state.app.currentTheme.color)
    const inactiveColor = useSelector(state => state.app.currentTheme.navColor)
    const primaryColorForImageModal = useSelector(state => state.app.currentTheme.primeBg)

    const fittedBtnClass = {
        color: navButton ? (isActive ? activeColor : inactiveColor)
            : imgModalBtn && primaryColorForImageModal === primeDayBg
                ? primaryColorForImageModal : activeColor,
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
        <Button key={key} className={className} sx={fittedBtnClass} disabled={isDisabled} onClick={onClick}>
            {children}
        </Button>


    );
};

export default FittedThemeBtn;
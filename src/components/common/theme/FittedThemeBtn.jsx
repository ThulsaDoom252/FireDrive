import React from 'react';
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {primeDayBg} from "./themes";

const FittedThemeBtn = ({
                            key,
                            children,
                            isDisabled,
                            enableHover,
                            size,
                            onClick,
                            className,
                            imgModalBtn,
                            optionalClasses
                        }) => {
    const primeActiveColor = useSelector(state => state.app.currentTheme.color)
    const hoverColor = useSelector(state => state.app.currentTheme.navColor)
    const primaryColorForImageModal = useSelector(state => state.app.currentTheme.primeBg)

    const fittedBtnClass = {
        color: imgModalBtn && primaryColorForImageModal === primeDayBg
            ? primaryColorForImageModal : primeActiveColor,
        minHeight: 'fit-content',
        minWidth: 'fit-content',
        maxHeight: 'fit-content',
        maxWidth: 'fit-content',
        transition: 'color 0.3s',
        ...optionalClasses,
        '&: hover': {
            color: enableHover && hoverColor
        }
    }

    return (
        <Button size={size} key={key} className={className} sx={fittedBtnClass} disabled={isDisabled}
                onClick={onClick}>
            {children}
        </Button>
    );
};

export default FittedThemeBtn;
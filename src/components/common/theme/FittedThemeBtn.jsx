import React from 'react';
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {primeDayBg} from "./themes";

const FittedThemeBtn = ({
                            key,
                            children,
                            isDisabled,
                            onClick,
                            className,
                            imgModalBtn,
                            optionalClasses
                        }) => {
    const activeColor = useSelector(state => state.app.currentTheme.color)
    const primaryColorForImageModal = useSelector(state => state.app.currentTheme.primeBg)

    const fittedBtnClass = {
        color: imgModalBtn && primaryColorForImageModal === primeDayBg
                ? primaryColorForImageModal : activeColor,
        minHeight: 'fit-content',
        minWidth: 'fit-content',
        maxHeight: 'fit-content',
        maxWidth: 'fit-content',
        transition: 'color 0.3s',
        ...optionalClasses,
    }

    return (
        <Button key={key} className={className} sx={fittedBtnClass} disabled={isDisabled}
                onClick={onClick}>
            {children}
        </Button>
    );
};

export default FittedThemeBtn;
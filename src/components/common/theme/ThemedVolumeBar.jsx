import {Slider} from "@mui/material";
import {useSelector} from "react-redux";

const ThemedVolumeBar = ({
                             value,
                             barWidth,
                             customMarks,
                             handleChange,
                             step = 0.1,
                         }) => {
    const currentTheme = useSelector(state => state.app.currentTheme)

    const marks = [
        {value: 0.1},
        {value: 0.2},
        {value: 0.3},
        {value: 0.4},
        {value: 0.5},
        {value: 0.6},
        {value: 0.7},
        {value: 0.8},
        {value: 0.9},
        {value: 1},
    ];

    const rootStyles = {
        "& .MuiSlider-rail": {
            display: 'none',
        },
        "& .MuiSlider-track": {
            display: 'none',
        },
        "& .MuiSlider-thumb": {
            display: "none",
        },
        "& .MuiSlider-mark": {
            width: barWidth, // Ширина отметки
            height: '50%', // Высота отметки
            backgroundColor: 'gray', // Цвет отметки по умолчанию (неактивной)
            "&.MuiSlider-markActive": {
                backgroundColor: currentTheme.color, // Цвет активной отметки
            },
        },
    };

    return (
        <Slider
            sx={rootStyles}
            min={0}
            marks={customMarks || marks}
            max={1}
            onChange={handleChange}
            value={value}
            step={step}
        />
    );
};

export default ThemedVolumeBar;

import { Slider } from "@mui/material";

const VolumeBar = ({
                       volume,
                       barWidth,
                       customMarks,
                       handleVolumeChange,
                       step = 0.1,
                       currentTheme,
                   }) => {
    const marks = [
        { value: 0.1 },
        { value: 0.2 },
        { value: 0.3 },
        { value: 0.4 },
        { value: 0.5 },
        { value: 0.6 },
        { value: 0.7 },
        { value: 0.8 },
        { value: 0.9 },
        { value: 1 },
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
            onChange={handleVolumeChange}
            value={volume}
            step={step}
        />
    );
};

export default VolumeBar;

import {Slider} from "@mui/material";
import {withStyles} from "@mui/styles";


const styles = () => ({
    root: {
        "& .MuiSlider-rail": {
            display: 'none'
        },
        "& .MuiSlider-track": {
            display: 'none'
        },
        "& .MuiSlider-thumb": {
            display: "none",
        },
        "& .MuiSlider-mark": {
            width: 5, // Ширина отметки
            height: '50%', // Высота отметки
            backgroundColor: "gray", // Цвет отметки по умолчанию (неактивной)
            "&.MuiSlider-markActive": {
                backgroundColor: "blue", // Цвет активной отметки
            },
            "&.first-mark": {
                color: 'yellow',
                width: 30,
                backgroundColor: "gray", // Цвет первой метки (неактивной)
            },
        },
    },
});

const VolumeBar = ({
                       volume,
                       classes,
                       handleVolumeChange,
                       step = 0.1

                   }) => {
    const marks = [
        {
            value: 0.1,
        },
        {
            value: 0.2,
        },
        {
            value: 0.3,
        },
        {
            value: 0.4,
        },
        {
            value: 0.5,
        },
        {
            value: 0.6,
        },
        {
            value: 0.7,
        },
        {
            value: 0.8,
        },
        {
            value: 0.9,
        },
        {
            value: 1,
        },
    ];

    return (<>
            <Slider
                classes={{
                    root: classes.root,
                }}
                min={0}
                marks={marks}
                max={1}
                onChange={handleVolumeChange}
                value={volume}
                step={step}
            />

        </>

    );
};


export default withStyles(styles)(VolumeBar)
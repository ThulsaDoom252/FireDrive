import {Slider} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    root: ({barWidth = 5, barColor = 'gray', barActiveColor = 'blue'}) => ({
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
            width: barWidth, // Ширина отметки
            height: '50%', // Высота отметки
            backgroundColor: `${barColor}`, // Цвет отметки по умолчанию (неактивной)
            "&.MuiSlider-markActive": {
                backgroundColor: `${barActiveColor}`, // Цвет активной отметки
            },
        },
    }),
}));

const VolumeBar = ({
                       volume,
                       barWidth,
                       customMarks,
                       handleVolumeChange,
                       step = 0.1

                   }) => {

    const classes = useStyles({barWidth});

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
                marks={customMarks || marks}
                max={1}
                onChange={handleVolumeChange}
                value={volume}
                step={step}
            />

        </>

    );
};


export default VolumeBar
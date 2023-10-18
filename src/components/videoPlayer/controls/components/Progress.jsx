import React from 'react';
import {Slider} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    root: ({smallScreenMode}) => ({
        '& .MuiSlider-track': {
            visibility: 'visible',
            height: `${smallScreenMode ? '10px' : '15px'}`,
            borderRadius: 0,
        },
        '& .MuiSlider-rail': {
            border: 'thin white solid',
            visibility: 'visible',
            height: `${smallScreenMode ? '10px' : '15px'}`,
            borderRadius: 0,
        },
        '& .MuiSlider-thumb': {
            display: 'none',
        },
    }),
}));

const Progress = ({
                      handleMouseEnterSlider,
                      handleMouseLeaveSlider,
                      handleMouseMove,
                      handleChange,
                      handleTouchMove,
                      maxValue,
                      smallScreenMode,
                      value,
                      minValue = 0,
                      step = 0.01
                  }) => {
    const classes = useStyles({smallScreenMode});


    return (
        <Slider
            classes={{
                root: classes.root,
            }}
            onMouseEnter={handleMouseEnterSlider}
            onMouseLeave={handleMouseLeaveSlider}
            onTouchStart={handleMouseEnterSlider}
            onTouchEnd={handleMouseLeaveSlider}
            onTouchMove={handleTouchMove}
            onMouseMove={handleMouseMove}
            min={minValue}
            onChange={handleChange}
            step={step}
            max={maxValue}
            value={value}
        />
    );
};

export default Progress;
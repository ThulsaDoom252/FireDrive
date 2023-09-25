import React from 'react';
import {Slider} from "@mui/material";
import {withStyles} from "@mui/styles";


const styles = () => ({
    root: {
        '& .MuiSlider-track': {
            visibility: 'visible',
        },
        '& .MuiSlider-rail': {
            visibility: 'visible',
        },
        '& .MuiSlider-thumb': {
            display: 'none',
        },
    },
});

const Progress = ({
                      handleMouseEnterSlider,
                      handleMouseLeaveSlider,
                      handleMouseMove,
                      handleChange,
                      maxValue,
                      value,
                      classes,
                      minValue = 0,
                  }) => {


    return (
        <Slider
            classes={{
                root: classes.root,
            }}
            onMouseEnter={handleMouseEnterSlider}
            onMouseLeave={handleMouseLeaveSlider}
            onMouseMove={handleMouseMove}
            min={minValue}
            onChange={handleChange}
            step={0.01}
            max={maxValue}
            value={value}
        />
    );
};

export default withStyles(styles)(Progress);
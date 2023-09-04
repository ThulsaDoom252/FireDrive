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
                      handleChangeDuration,
                      totalVideoDuration,
                      currentVideoTime,
                      classes,
                  }) => {

    return (
        <Slider
            classes={{
                root: classes.root,
            }}
            className={`relative bottom-1`}
            onMouseEnter={handleMouseEnterSlider}
            onMouseLeave={handleMouseLeaveSlider}
            onMouseMove={handleMouseMove}
            min={0}
            onChange={handleChangeDuration}
            step={0.01}
            max={totalVideoDuration}
            value={currentVideoTime}
        />
    );
};

export default withStyles(styles)(Progress);
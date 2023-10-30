import React from 'react';
import {Box, Slider, Typography} from '@mui/material';
import {useSelector} from 'react-redux';

const ThemedSlider = ({
                          height = '1rem',
                          label,
                          labelColor = '#abc2e7',
                          valueToDisplay = 0,
                          show = true,
                          railColor = '#6b777c',
                          onChange = () => void 0,
                          direction = 'column',
                          value,
                          max,
                          rounded = false,
                          step = 0,
                          min = 0,
                      }) => {

    const currentTheme = useSelector(state => state.app.currentTheme)

    const styles = {
        root: {
            height: height,
            padding: 0,
            borderRadius: rounded ? '1rem' : 0,
            '& .MuiSlider-track': {
                visibility: 'visible',
                color: currentTheme.activeColor,
            },
            '& .MuiSlider-rail': {
                color: railColor,
            },
            '& .MuiSlider-thumb': {
                display: 'none',
            },
        },
    };

    return (
        <>
            {show &&
                <Box width='100%' height='' className={`flex justify-center items-center  flex-col`}>
                    <Box display='flex' flexDirection={direction} justifyContent='center' alignItems='center'>
                        <Typography color={labelColor}>{label}</Typography>
                        <Typography marginLeft={direction === 'row' && 1}>{valueToDisplay}</Typography>
                    </Box>
                    <Slider min={min}
                            step={step}
                            max={max}
                            onChange={onChange}
                            sx={styles.root}
                            value={value}/>
                </Box>}
        </>
    );
};

export default ThemedSlider;
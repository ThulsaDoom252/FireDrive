import {Slider} from "@mui/material";
import {withStyles} from "@mui/styles";


const styles = () => ({
    root: {
        '& .MuiSlider-track': {
            visibility: 'visible',
            height: '50%',
        },
        '& .MuiSlider-rail': {
            visibility: 'visible',
            color: 'black',
            height: '50%',
        },
        '& .MuiSlider-thumb': {
            display: 'none',
        },
    },
});

const VolumeBar = ({
                       volume,
                       classes,
                       handleVolumeChange,
                       step = 0.01

                   }) => {

    return (<>
            <Slider
                classes={{
                    root: classes.root,
                }}
                min={0}
                max={1}
                onChange={handleVolumeChange}
                value={volume}
                step={step}
            />

        </>

    );
};


export default withStyles(styles)(VolumeBar)
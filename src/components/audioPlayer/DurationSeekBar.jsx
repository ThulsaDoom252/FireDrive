import {formatTime, stopPropagation, truncate} from "../../common/commonData";
import 'rc-slider/assets/index.css';
import {ClipLoader} from "react-spinners";
import {withStyles} from "@mui/styles";
import {Slider} from "@mui/material";


const styles = () => ({
    root: {
        '& .MuiSlider-track': {
            visibility: 'visible',
            color: 'blue',
            height: '1.75rem',
            borderRadius: 0,

        },
        '& .MuiSlider-rail': {
            visibility: 'hidden',
        },
        '& .MuiSlider-thumb': {
            display: 'none',
        },
    },
});

const DurationSeekBar = ({
                             value,
                             max,
                             name,
                             classes,
                             onChange,
                             isCurrentTrackPlaying,
                             smallScreenMode,
                             trackColor = 'blue',
                             bgColor = 'bg-black',

                         }) => {


    const isLoading = isNaN(max)

    return (<>
            {isLoading ? <ClipLoader size={25}/> : <div className={`
        relative
        w-full 
        flex 
        items-center 
        h-7 
        text-white 
        cursor-pointer
        justify-between
        ${bgColor}
        ${!smallScreenMode ? 'rounded' : 'bottom-3'}
        `}>
                <div className={'absolute left-1 z-1 pointer-events-none'}
                     onClick={stopPropagation}>{formatTime(value)}</div>
                <div
                    className={`absolute
                 z-1
                 pointer-events-none
                 left-1/2
                 top-1/2
                 ${!isCurrentTrackPlaying && 'animate-flash'}
                 transform -translate-x-1/2 -translate-y-1/2
                 `}>{truncate(name, 15)}</div>
                <Slider min={0}
                        classes={{
                            root: classes.root,
                        }}
                        max={max}
                        value={value}
                        onChange={onChange}
                        step={1}
                />
                <div className={'absolute right-1 z-1 pointer-events-none'}>{formatTime(max)} </div>
            </div>}
        </>

    );
};


export default withStyles(styles)(DurationSeekBar)
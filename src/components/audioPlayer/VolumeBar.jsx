import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

const VolumeBar = ({
                       volume,
                       handleVolumeChange,
                       trackColor = 'blue',
                       bgColor = 'gray',

                   }) => {


    const handleStyle = {
        opacity: 0,
        cursor: 'default',
    };

    const railStyle = {
        backgroundColor: bgColor,
        height: '100%'
    };

    const trackStyle = {
        height: '100%',
        position: 'absolute',
        bottom: -5,
        border: 'none',
        borderRadius: 'none',
        backgroundColor: trackColor, // Синий цвет для заполненной части
    };

    return (<>
            <Slider
                min={0}
                max={1}
                onChange={handleVolumeChange}
                value={volume}
                step={0.01}
                trackStyle={trackStyle}
                railStyle={railStyle}
                handleStyle={handleStyle}
            />

        </>

    );
};


export default VolumeBar
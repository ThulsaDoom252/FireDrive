import {formatTime, stopPropagation, truncate} from "../../common/commonData";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';


const DurationSeekBar = ({
                     value,
                     max,
                     name,
                     onChange,
                     isCurrentTrackPlaying,
                     disabled = false
                 }) => {

    const handleStyle = {
        opacity: 0,
    };

    const railStyle = {
        backgroundColor: 'black',
        borderBottomLeftRadius: 2,
    };

    const trackStyle = {
        height: '28px',
        position: 'absolute',
        bottom: -7,
        border: 'none',
        borderRadius: 'none',
        backgroundColor: 'blue', // Синий цвет для заполненной части
    };

    return (
        <div className={`
        relative
        rounded 
        w-full 
        flex 
        justify-between 
        items-center 
        bg-black 
        h-7 
        text-white 
        cursor-pointer`}>
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
            <Slider className={'w-full '}
                    min={0}
                    max={max}
                    value={value}
                    onChange={onChange}
                    step={1}
                    handleStyle={handleStyle}
                    railStyle={railStyle}
                    trackStyle={trackStyle}
            />
            <div className={'absolute right-1 z-1 pointer-events-none'}>{formatTime(max)}</div>
        </div>


    );
};


export default DurationSeekBar
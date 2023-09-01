import {formatTime, stopPropagation, truncate} from "../../common/commonData";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {ClipLoader} from "react-spinners";


const VolumeBar = ({
                             value,
                             max,
                             name,
                             onChange,
                             isCurrentTrackPlaying,
                             smallScreenMode,
                         }) => {

    const handleStyle = {
        opacity: 0,
    };

    const railStyle = {
        backgroundColor: 'black',
        borderBottomLeftRadius: smallScreenMode ? 0 : 2,
    };

    const trackStyle = {
        height: '28px',
        position: 'absolute',
        bottom: -7,
        border: 'none',
        borderRadius: 'none',
        backgroundColor: 'blue', // Синий цвет для заполненной части
    };

    const isLoading = isNaN(max)


    return (<>
            {isLoading ? <ClipLoader size={25}/> : <div className={`
        relative
        w-full 
        flex 
        items-center 
        bg-black 
        h-7 
        text-white 
        cursor-pointer
        justify-between
        ${!smallScreenMode && 'rounded'}
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
                <div className={'absolute right-1 z-1 pointer-events-none'}>{formatTime(max)} </div>
            </div>}
        </>

    );
};


export default VolumeBar
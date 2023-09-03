import React, {useEffect, useState} from 'react';
import {
    AiFillSetting,
    AiOutlineFullscreen,
    AiOutlineFullscreenExit,
    AiOutlinePlayCircle,
} from "react-icons/ai";
import {FiPause, FiShare, FiShare2} from "react-icons/fi";
import {CiVolume} from "react-icons/ci";
import {BiMobile, BiShare} from "react-icons/bi";
import {formatTime, stopPropagation} from "../../common/commonData";
import Slider from "rc-slider";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineScale} from "react-icons/md";
import {RxMagnifyingGlass} from "react-icons/rx";
import {BsSpeedometer} from "react-icons/bs";
import {FaShare} from "react-icons/fa";
import {GoShare} from "react-icons/go";
import {HiDotsVertical} from "react-icons/hi";


const CustomControls = ({
                            playerRef,
                            color = 'text-white',
                            smallScreenMode,
                            playBtnSize = smallScreenMode ? 60 : 30,
                            currentVideoTime,

                        },
) => {

    const [isSliderHovered, setIsSliderHovered] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(true)
    const [currentVideoVolume, setCurrentVideoVolume] = useState(0.5)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [totalVideoDuration, setTotalVideoDuration] = useState(0)
    const [isFullScreen, setIsFullScreen] = useState(false)

    const playBackValues = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

    // control menu state
    const [currentSpeedValue, setCurrentSpeedValue] = useState(1.0)
    const [currentScaleValue, setCurrentScaleValue] = useState(1)
    const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(true)
    const [isScaleMenuOpen, setIsScaleMenuOpen] = useState(false)

    const [isPIPactive, setIsPIPactive] = useState(false);
    const currentVideoUrl = playerRef?.current?.props?.url
    const isVideoReady = playerRef.current?.player?.isReady
    const isVideoLoading = playerRef.current?.player?.isLoading

    window.playerRef = playerRef.current


    ///Говнокод по входи и выходу из фуллсрина. ************Оптимизировть


    const handleMainClick = () => {
        if (isMenuOpen) {
            isScaleMenuOpen && setIsScaleMenuOpen(false)
            isSpeedMenuOpen && setIsSpeedMenuOpen(false)
            return handleOpenMenu()
        }

        if (isVideoPlaying || !isVideoPlaying) {
            handlePlay()
        }
    }


    //Изменяем скорость воспроизведения
    const handlePlayBackRate = (value) => {
        if (playerRef.current) {
            playerRef.current.getInternalPlayer().playbackRate = value
        }
    }

    //Изменяем масштаб
    const changeVideoScale = (scale) => {
        if (playerRef.current) {
            const playerElement = playerRef.current.getInternalPlayer();
            const container = playerElement.parentElement;
            container.style.transform = `scale(${scale})`;
            setCurrentScaleValue(scale)
        }
    };

    const formatValueAsPercentage = (value) => {
        // Преобразовываем число в формат процентов (умножаем на 100 и добавляем знак процента)
        return `${(value * 100)}%`;
    };

    const handleOpenMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const enterFullScreen = () => {
        if (playerRef.current) {
            playerRef.current.wrapper.webkitRequestFullscreen(); // Для Webkit браузеров
            playerRef.current.wrapper.mozRequestFullScreen(); // Для Mozilla браузеров
            playerRef.current.wrapper.msRequestFullscreen(); // Для Microsoft браузеров
            setIsFullScreen(true)
        }
    };

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

        setIsFullScreen(false);
    };

    useEffect(() => {
        if (isVideoReady && !isVideoLoading) {
            const totalDuration = playerRef?.current?.getDuration()
            const currentAudioValue = playerRef?.current?.getInternalPlayer().volume
            setCurrentVideoVolume(currentAudioValue)
            setTotalVideoDuration(totalDuration)
        }
    }, [isVideoReady, isVideoLoading, currentVideoUrl]);


    const handlePlay = () => {
        if (isVideoPlaying) {
            playerRef?.current?.getInternalPlayer()?.pause()
            setIsVideoPlaying(false)
        } else {
            playerRef?.current?.getInternalPlayer()?.play();
            setIsVideoPlaying(true)
        }
    }

    const handleVideoVolumeChange = (value) => {
        setCurrentVideoVolume(value)
        playerRef.current.getInternalPlayer().volume = value
    }

    const handleFullScreen = () => {
        if (isFullScreen) {
            exitFullScreen()
        } else {
            enterFullScreen()
        }
    }

    const handleChangeDuration = (newValue) => {
        playerRef?.current?.seekTo(newValue)
    }

    const handleMouseEnterSlider = () => {
        setIsSliderHovered(true)
    }

    const handleMouseLeaveSlider = () => {
        setIsSliderHovered(false)
    }

    const handlePiP = async () => {
        if (document.pictureInPictureElement) {
            // Если уже активен режим PiP, выходим из него
            await document.exitPictureInPicture();
            setIsPIPactive(false);
        } else if (playerRef.current) {
            // Запрашиваем режим PiP для видео
            try {
                await playerRef.current.getInternalPlayer().requestPictureInPicture();
                setIsPIPactive(true);
            } catch (error) {
                console.error('Не удалось войти в режим PiP:', error);
            }
        }
    };

    const handleSettings = () => {

    }

    return (
        <div className={`
        w-full 
        h-full 
        flex
        flex-col
        justify-between
        absolute
        bottom-0
           ${color} 
           ${!smallScreenMode && 'pr-10 pl-10'}
        `}
             onClick={handleMainClick}

        >
            {/*Top menu block*/}
            <div className={'flex self-start justify-end h-5 w-full mt-2'}>
                {/*Top end btn block*/}
                <div className={`
                mr-3
                flex 
                w-28
                justify-between
                `}>
                    {/*{Share btn}*/}
                    <div className={`
                    w-10 
                    h-10 
                    rounded 
                    bg-gray-600 
                    opacity-60
                    bg-opacity-60
                    flex
                    items-center
                    justify-center
                    
                    `}>
                        <FiShare2 size={25}/>
                    </div>
                    {/*{Item options btn}*/}
                    <div className={`
                    w-10 
                    h-10 
                    rounded 
                    bg-gray-600 
                    opacity-60
                    bg-opacity-60
                    flex
                    items-center
                    justify-center
                    
                    `}>
                        <HiDotsVertical size={25}/>
                    </div>

                </div>
            </div>

            {/*//Center Player Btn*/}
            {!isVideoPlaying &&
                <div className={`
            flex
            absolute inset-0 
             items-center justify-center`}>
                    <button className={`flex 
                            items-center 
                            justify-center 
                            bg-blue-300 
                            rounded
                            text-white
                            h-20
                            w-20
                            `}><AiOutlinePlayCircle size={50}/></button>
                </div>}
            {/*Control Bar*/}
            <div className='w-full flex justify-between items-center h-8 z-10 self-end' onClick={stopPropagation}>
                {/*/Play btn block*/}
                <div className={'bg-gray-800   bg-opacity-80 rounded flex justify-center items-center w-20 h-full'}>
                    {isVideoPlaying ? <button onClick={handlePlay}><FiPause size={30}/></button> :
                        <button onClick={handlePlay}><AiOutlinePlayCircle size={30}/></button>}
                </div>
                {/*//Rest control block*/}
                <div
                    className={`flex 
                        justify-between 
                        w-full
                        items-center 
                        bg-gray-800 
                        bg-opacity-80
                        h-full rounded 
                        ml-3
                        pr-2 
                        pl-2
                        `}

                >
                    {/*//Progress block*/}
                    <div
                        onMouseEnter={handleMouseEnterSlider}
                        onMouseLeave={handleMouseLeaveSlider}
                        className={`                        
                            rounded 
                            flex 
                            items-center 
                            h-fit
                            hover:cursor-pointer
                            ${smallScreenMode ? 'w-1/3' : 'w-75%'}
                            
                            `}>
                        {/*Progress bar*/}
                        <Slider
                            className={'relative bottom-1'}
                            type={'range'}
                            min={0}
                            onChange={handleChangeDuration}
                            step={0.01}
                            max={totalVideoDuration}
                            value={currentVideoTime}
                            handleStyle={{
                                opacity: isSliderHovered ? 1 : 0,
                                width: '10px',
                                height: '10px',
                                top: '10px',
                                cursor: 'pointer'
                            }}
                            trackStyle={{
                                borderRadius: 0,
                                backgroundColor: '#00adef',
                                height: '10px',
                                border: 'gray solid thin',

                            }}
                            railStyle={{backgroundColor: 'black', height: '10px', borderRadius: 0, opacity: 0.8}}
                        />
                    </div>
                    {/*Right controls block*/}
                    <div className={`
                        ml-5 
                        w-25% 
                        flex 
                        justify-between 
                        items-center
                        ${smallScreenMode ? 'w-full' : 'w-25%'}
                        
                        `}>
                        {/*Volume block*/}
                        <div className={'flex items-center mr-3  hover:cursor-pointer'}>
                            <div><CiVolume/></div>
                            {/*Volume bar block*/}
                            <div hidden={smallScreenMode} className={'w-20 ml-2'}>
                                {/*Volume bar*/}
                                <Slider
                                    className={'bottom-0.5'}
                                    type={'range'}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={currentVideoVolume}
                                    onChange={handleVideoVolumeChange}
                                    handleStyle={{
                                        opacity: 0,
                                        width: '10px',
                                        height: '10px',
                                        top: '10px',
                                        cursor: 'pointer'
                                    }}
                                    trackStyle={{
                                        borderRadius: 0,
                                        backgroundColor: '#00adef',
                                        height: '10px',
                                        border: 'gray solid thin',

                                    }}
                                    railStyle={{
                                        backgroundColor: 'black',
                                        height: '10px',
                                        borderRadius: 0,
                                        opacity: 0.8
                                    }}


                                />
                            </div>
                        </div>
                        {/*Time block*/}
                        <div
                            className={'mr-3'}>{`${formatTime(currentVideoTime)} / ${formatTime(totalVideoDuration)}`}</div>
                        {/*Buttons block*/}
                        <div className={'flex w-20 justify-between mr-2'}>
                            <div><BiMobile onClick={handlePiP} size={20}/></div>
                            <div><AiFillSetting onClick={handleOpenMenu} size={20}/></div>
                            <div onClick={handleFullScreen}>{isFullScreen ? <AiOutlineFullscreenExit size={20}/> :
                                <AiOutlineFullscreen size={20}/>}</div>
                        </div>
                        {/*{Context Menu}*/}
                        {isMenuOpen && <div className={`
                                            absolute 
                                            bottom-10 
                                            right-10 
                                            border-gray-500
                                            bg-gray-500
                                            rounded
                                            bg-opacity-70 
                                            border-1 
                                            flex 
                                            flex-col 
                                            justify-end 
                                            items-start 
                                            p-2`}>
                            {!isScaleMenuOpen && !isSpeedMenuOpen &&
                                <>
                                    {/*Scale btn*/}
                                    <div className='
                                    w-full
                                    flex
                                    justify-between
                                    items-center
                                    mt-2
                                    cursor-pointer'
                                         onClick={() => setIsScaleMenuOpen(true)}
                                    >
                                        <div className={'flex items-center justify-center'}>
                                            <RxMagnifyingGlass size={20}/>
                                            <div className={'ml-1 text-lg'}>Scale</div>
                                        </div>

                                        <div className={'flex justify-between items-center text-blue-400'}>
                                            <div>{formatValueAsPercentage(currentSpeedValue)}</div>
                                            <div><MdKeyboardArrowRight/></div>

                                        </div>
                                    </div>
                                    {/*Speed btn*/}
                                    <div className={'w-full flex justify-between items-center mt-2 cursor-pointer'}
                                         onClick={() => setIsSpeedMenuOpen(true)}

                                    >
                                        <div className={'flex items-center justify-center'}>
                                            <BsSpeedometer size={20}/>
                                            <div className={'ml-1 text-lg'}>Speed</div>
                                        </div>
                                        <div className={'flex justify-between items-center text-blue-400'}>
                                            <div>1.0</div>
                                            <div><MdKeyboardArrowRight/></div>

                                        </div>

                                    </div>
                                </>}
                            {/*scale menu*/}
                            {isScaleMenuOpen && <div className='
                            w-full
                             h-full
                             flex
                             flex-col
                             justify-start
                             items-center

                             '>
                                <div className='

                                w-full
                                flex
                                justify-between
                                items-center
                                border-b
                                border-b-white
                                '
                                     onClick={() => setIsScaleMenuOpen(false)}

                                >
                                    <div className={'flex items-center mr-2'}>
                                        <div>
                                            <MdKeyboardArrowLeft/>
                                        </div>
                                        <div>Scale</div>
                                    </div>
                                    <div className={'text-blue-300'}>{formatValueAsPercentage(currentScaleValue)}</div>

                                </div>
                                <div className={'w-full flex flex-col items-end justify-start'}>
                                    <div className={'mt-1'}
                                         onClick={() => changeVideoScale(currentScaleValue + 0.03)}>+3%
                                    </div>
                                    <div className={'mt-1'}
                                         onClick={() => changeVideoScale(currentScaleValue - 0.03)}>-3%
                                    </div>
                                    <div className={'mt-1'} onClick={() => changeVideoScale(1)}>100%</div>
                                </div>
                            </div>}
                            {/*speen menu*/}
                            {isSpeedMenuOpen && <div className='
                            w-full
                             h-full
                             flex
                             flex-col
                             justify-start
                             items-center

                             '>
                                <div className='

                                w-full
                                flex
                                justify-center
                                items-center
                                border-b
                                border-b-white
                                '
                                     onClick={() => setIsSpeedMenuOpen(false)}

                                >
                                    <div>
                                        <MdKeyboardArrowLeft/>
                                    </div>
                                    <div>Speed</div>
                                </div>
                                <div className={'w-full flex flex-col items-end justify-start'}>
                                    {playBackValues.map((value, index) => (
                                        <div key={index} className={'mt-1'} onClick={() => handlePlayBackRate(value)}>
                                            {value === 1 ? 'Normal' : `${value}x`}
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default CustomControls
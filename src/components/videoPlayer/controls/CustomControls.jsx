import React, {useEffect, useRef, useState} from 'react';
import {
    AiFillSetting,
    AiOutlineFullscreen,
    AiOutlineFullscreenExit,
    AiOutlinePlayCircle,
} from "react-icons/ai";
import {FiPause, FiPlay, FiShare2} from "react-icons/fi";
import {CiVolume, CiVolumeMute} from "react-icons/ci";
import {BiMobile} from "react-icons/bi";
import {formatTime, formatValueAsPercentage, stopPropagation} from "../../../common/commonData";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {RxMagnifyingGlass} from "react-icons/rx";
import {BsSpeedometer} from "react-icons/bs";
import {HiDotsVertical} from "react-icons/hi";
import {Transition} from "react-transition-group";
import ProgressPreview from "./components/ProgressPreview";
// import Slider from "rc-slider";
import {Slider} from "@mui/material";
import Progress from "./components/Progress";

const CustomControls = ({
                            playerRef,
                            color = 'text-white',
                            smallScreenMode,
                            playBtnSize = smallScreenMode ? 60 : 30,
                            currentVideoTime,
                            setCurrentVideoTime,
                            disablePreview,
                            url,
                            classes,

                        },
) => {

    // Classes
    const controlBtnAnimation = `hover:text-blue-400 hover:cursor-pointer transition-all duration-100`
    const mainBtnAnimation = `hover:text-white hover:bg-blue-500 hover:cursor-pointer transition-all duration-100 `
    const topBtnClass = `w-10 
                    h-10 
                    rounded 
                    bg-gray-600 
                    opacity-60
                    bg-opacity-60
                    flex
                    items-center
                    justify-center
                    z-10
                    ${mainBtnAnimation}`

    // Menu types
    const shareMenu = 'SHARE_MENU'
    const currentItemMenu = 'CURRENT_ITEM_MENU'
    const videoMenu = 'VIDEO_MENU'

    //Sub menu types
    const speedSubMenu = "SPEED_SUB_MENU"
    const scaleSubMenu = "SCALE_SUB_MENU"

    //Control states
    const [currentMenu, setCurrentMenu] = useState(null)
    const [currentSubmenu, setCurrentSubMenu] = useState(null)

    const [isSliderHovered, setIsSliderHovered] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(true)
    const [currentVideoVolume, setCurrentVideoVolume] = useState(0.5)
    const [totalVideoDuration, setTotalVideoDuration] = useState(0)
    const [isFullScreen, setIsFullScreen] = useState(false)


    const [previewTime, setPreviewTime] = useState(false)
    const [mouseX, setMouseX] = useState(null)

    const playBackValues = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

    // control menu state
    const [currentSpeedValue, setCurrentSpeedValue] = useState(1.0)
    const [currentScaleValue, setCurrentScaleValue] = useState(1)

    const [isPIPactive, setIsPIPactive] = useState(false);
    const currentVideoUrl = playerRef.current?.props?.url

    const previewRef = useRef(null)
    const isShareMenuOpen = currentMenu === shareMenu
    const isCurrentItemMenuOpen = currentMenu === currentItemMenu
    const isScaleSubMenuOpen = currentSubmenu === scaleSubMenu
    const isSpeedSubMenuOpen = currentSubmenu === speedSubMenu
    const isVideoMenuOpen = currentMenu === videoMenu


    //Изменения текущего времени видео-преьвю в
    // зависимости от значения получаемого из слайдера
    useEffect(() => {
        if (previewTime && previewRef.current) {
            previewRef.current.seekTo(previewTime)
        }

    }, [previewTime]);


    //Close all menu's if open, play video
    const handleMainClick = () => {
        if (currentMenu) {
            return setCurrentMenu(null)
        }

        if (isVideoPlaying || !isVideoPlaying) {
            handlePlay()
        }
    }

    // menu handlers
    const handleCurrentItemMenu = () => {
        if (currentMenu !== currentItemMenu) {
            setCurrentMenu(currentItemMenu)
        } else {
            setCurrentMenu(null)
        }
    }
    const handleShareMenu = () => {
        if (currentMenu !== shareMenu) {
            setCurrentMenu(shareMenu)
        } else {
            setCurrentMenu(null)
        }
    }

    const handleVideoMenu = () => {
        if (currentMenu !== videoMenu) {
            setCurrentMenu(videoMenu)
        } else {
            setCurrentMenu(null)
        }
    }

    const handleScaleSubMenu = () => {
        setCurrentSubMenu(scaleSubMenu)
    }

    const handleSpeedSubMenu = () => {
        setCurrentSubMenu(speedSubMenu)
    }

    const handleClearSubMenu = () => {
        setCurrentSubMenu(null)
    }


    ///Фуллскрин
    const handleFullScreen = () => {
        const videoBlockContainer = document.getElementById('video-block-container')
        const videoContainer = document.getElementById('video-container')
        if (isVideoReady) {
            if (isFullScreen) {
                if (smallScreenMode) {
                    videoBlockContainer.style.width = '100%'
                    videoBlockContainer.style.height = '45%'
                    videoBlockContainer.style.marginTop = '1.25rem'

                } else {
                    videoBlockContainer.style.width = '80%'
                    videoBlockContainer.style.height = '90%'
                }
                videoContainer.style.width = '100%'
                videoContainer.style.height = '90%'
                setIsFullScreen(false)
                document.exitFullscreen()

            } else {
                videoBlockContainer.style.marginTop = '0'
                videoBlockContainer.style.width = '100%'
                videoBlockContainer.style.height = '100%'
                videoContainer.style.width = '100vw'
                videoContainer.style.height = '100vh'
                setIsFullScreen(true)
                document.documentElement.requestFullscreen()
            }
        }
    };


    //Изменяем скорость воспроизведения
    const handlePlayBackRate = (value) => {
        if (playerRef.current) {
            playerRef.current.getInternalPlayer().playbackRate = value
            setCurrentSpeedValue(value)
        }

    }

    //Preview
    const handleMouseMove = (e) => {
        setMouseX(e.clientX);
        if (!disablePreview) {
            // Получите координаты мыши относительно слайдера
            const slider = e.currentTarget;
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;

            // Вычислите прогресс в процентах
            const progress = (x / slider.offsetWidth) * 100;

            // Преобразуйте прогресс в значение слайдера
            const minValue = 0;
            const maxValue = totalVideoDuration; // Максимальное значение слайдера
            const value = (progress / 100) * (maxValue - minValue) + minValue;
            setPreviewTime(value);
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


    // Загрузка данных звука и полного времени при загрузке/смене виедо
    const isVideoReady = playerRef?.current?.player?.prevPlayed

    useEffect(() => {
        if (isVideoReady !== null && isVideoReady !== undefined) {
            const totalDuration = playerRef?.current?.getDuration()
            const currentAudioValue = playerRef?.current?.getInternalPlayer().volume
            setCurrentVideoVolume(currentAudioValue)
            setTotalVideoDuration(totalDuration)
        }
    }, [isVideoReady, currentVideoUrl]);


    // Play/pause handlers
    const handlePlay = () => {
        if (isVideoPlaying) {
            playerRef?.current?.getInternalPlayer()?.pause()
            setIsVideoPlaying(false)
        } else {
            playerRef?.current?.getInternalPlayer()?.play();
            setIsVideoPlaying(true)
        }
    }

    // Change volume
    const handleVideoVolumeChange = (value, isMute) => {
        localStorage.setItem('currentVideoVolume', value.target.value)
        playerRef.current.getInternalPlayer().volume = value.target.value
        setCurrentVideoVolume(value.target.value)
    }

    const handleMuteVideoVolume = () => {
        if (currentVideoVolume === 0) {
            const prevVideoVolumeValue = localStorage.getItem('currentVideoVolume')
            playerRef.current.getInternalPlayer().volume = prevVideoVolumeValue
            setCurrentVideoVolume(prevVideoVolumeValue)
        } else {
            playerRef.current.getInternalPlayer().volume = 0
            setCurrentVideoVolume(0)
        }
    }

    //Progress logic
    const handleMouseEnterSlider = () => {
        setIsSliderHovered(true)
    }

    const handleMouseLeaveSlider = () => {
        setIsSliderHovered(false)
    }
    const handleChangeDuration = (value) => {
        playerRef?.current?.seekTo(value.target.value)
        setCurrentVideoTime(value.target.value)
    }

    // Handle picture in picture mode
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

    return (
        // Menu Container
        <div className={`
        w-full 
        h-full 
        flex
        flex-col
        justify-between
        absolute
        bottom-0
           ${color} 
           ${(!smallScreenMode && !isFullScreen) && 'pr-10 pl-10'}
        `}
             onClick={handleMainClick}

        >
            {/*Top menu block*/}
            <div className={`flex self-start justify-end h-5 w-full mt-1`}>
                {/*Top end btn block*/}
                <div className={`
                mr-3
                flex 
                w-28
                justify-between      
                `}
                     onClick={stopPropagation}
                >
                    {/*{Share btn}*/}
                    <div className={topBtnClass}
                         onClick={handleShareMenu}
                    >
                        <FiShare2 size={25}/>
                    </div>
                    {/*{Item options btn}*/}
                    <div className={topBtnClass}
                         onClick={handleCurrentItemMenu}
                    >
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
                            hover:bg-opacity-50
                            transition-all duration-100
                            `}><AiOutlinePlayCircle size={50}/></button>
                </div>}
            {/*Control Bar*/}
            <div className='w-full flex justify-between items-center h-10 z-10 self-end' onClick={stopPropagation}>
                {/*/Play btn block*/}
                <div className={`bg-gray-800   
                bg-opacity-80 
                rounded 
                flex 
                justify-center 
                items-center 
                w-20 
                h-full
                hover:bg-blue-400
                hover:cursor-pointer
                transition-all duration-200
                `}
                     onClick={handlePlay}>
                    {isVideoPlaying ? <FiPause size={30}/> : <FiPlay size={30}/>}
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
                        className={`                        
                            rounded 
                            relative
                            flex 
                            flex-col
                            items-center
                            h-fit
                            hover:cursor-pointer
                            ${smallScreenMode ? 'w-1/3' : 'w-75%'}
                            
                            `}>

                        {/*Video Preview*/}
                        {isSliderHovered && !disablePreview &&
                            <ProgressPreview
                                url={url}
                                previewRef={previewRef}
                                previewTime={previewTime}
                                mouseX={mouseX}/>}
                        {/*Progress bar*/}
                        <Progress
                            handleChangeDuration={handleChangeDuration}
                            currentVideoTime={currentVideoTime}
                            handleMouseLeaveSlider={handleMouseLeaveSlider}
                            handleMouseEnterSlider={handleMouseEnterSlider}
                            handleMouseMove={handleMouseMove}/>
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
                            <div onClick={handleMuteVideoVolume}
                            >{currentVideoVolume !== 0 ? <CiVolume/> : <CiVolumeMute/>}
                            </div>
                            {/*Volume bar block*/}
                            <div hidden={smallScreenMode} className={'w-20 ml-2'}>
                                {/*Volume bar*/}
                                <Progress
                                    handleChange={handleVideoVolumeChange}
                                    maxValue={1}
                                    value={currentVideoVolume}
                                />
                            </div>
                        </div>
                        {/*Time block*/}
                        <div
                            className={'mr-3'}>{`${formatTime(currentVideoTime)} / ${formatTime(totalVideoDuration)}`}</div>
                        {/*Buttons block*/}
                        <div className={'flex w-20 justify-between mr-2'}>
                            <div className={controlBtnAnimation}><BiMobile onClick={handlePiP} size={20}/></div>
                            <div className={controlBtnAnimation}><AiFillSetting onClick={handleVideoMenu} size={20}/>
                            </div>
                            <div className={controlBtnAnimation} onClick={handleFullScreen}>{isFullScreen ?
                                <AiOutlineFullscreenExit size={20}/> :
                                <AiOutlineFullscreen size={20}/>}</div>
                        </div>
                        {/*{Context Menu}*/}
                        <Transition in={isVideoMenuOpen} timeout={200}>
                            {(state) => <div
                                className={`
                                            absolute 
                                            bottom-12 
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
                                            p-2
                                            ${state === 'entering' || state === 'exiting' ? 'opacity-0' : 'opacity-100'}
                                            ${state === 'exited' ? 'hidden' : ''}
                                            transition-opacity duration-200 ease-in-out
                                            `}>
                                {currentSubmenu === null &&
                                    <>
                                        {/*Scale btn*/}
                                        <div className={`
                                          w-full
                                    flex
                                    justify-between
                                    items-center
                                    mt-2
                                    cursor-pointer
                                    bg-opacity-50
                                    hover:bg-gray-600
                                    transition-all duration-100
                                   
                                        `}

                                             onClick={handleScaleSubMenu}
                                        >
                                            <div className={'flex items-center justify-center mr-4'}>
                                                <RxMagnifyingGlass size={20}/>
                                                <div className={'ml-1 text-lg'}>Scale</div>
                                            </div>

                                            <div className={'flex justify-between items-center text-blue-400'}>
                                                <div>{formatValueAsPercentage(currentScaleValue)}</div>
                                                <div><MdKeyboardArrowRight/></div>

                                            </div>
                                        </div>
                                        {/*Speed btn*/}
                                        <div className={`
                                        w-full 
                                        flex 
                                        justify-between 
                                        items-center 
                                        mt-2 
                                        cursor-pointer
                                         hover:bg-gray-600
                                    transition-all duration-100
                                        `}
                                             onClick={handleSpeedSubMenu}

                                        >
                                            <div className={'flex items-center justify-center'}>
                                                <BsSpeedometer size={20}/>
                                                <div className={'ml-1 text-lg'}>Speed</div>
                                            </div>
                                            <div className={'flex justify-between items-center text-blue-400'}>
                                                <div>{currentSpeedValue}</div>
                                                <div><MdKeyboardArrowRight/></div>
                                            </div>
                                        </div>
                                    </>}
                                {/*scale menu*/}
                                {isScaleSubMenuOpen && <div className='
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
                                hover:bg-gray-700
                                hover:cursor-pointer
                                transition-all duration-100
                                '
                                         onClick={handleClearSubMenu}
                                    >
                                        <div className={'flex items-center mr-2'}>
                                            <div>
                                                <MdKeyboardArrowLeft/>
                                            </div>
                                            <div>Scale</div>
                                        </div>
                                        <div
                                            className={'text-blue-300'}>{formatValueAsPercentage(currentScaleValue)}</div>
                                    </div>
                                    <div className={'w-full flex flex-col items-end justify-start'}>
                                        <div className='mt-1  w-full  hover:bg-gray-700 text-right
                                hover:cursor-pointer
                                transition-all duration-100'
                                             onClick={() => changeVideoScale(currentScaleValue + 0.03)}>+3%
                                        </div>
                                        <div className='mt-1  w-full hover:bg-gray-700 text-right
                                hover:cursor-pointer
                                transition-all duration-100'
                                             onClick={() => changeVideoScale(currentScaleValue - 0.03)}>-3%
                                        </div>
                                        <div className='mt-1 w-full  hover:bg-gray-700 text-right
                                hover:cursor-pointer
                                transition-all duration-100' onClick={() => changeVideoScale(1)}>100%
                                        </div>
                                    </div>
                                </div>}
                                {/*speen menu*/}
                                {isSpeedSubMenuOpen && <div className='
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
                                hover:bg-gray-700
                                hover:cursor-pointer
                                transition-all duration-100
                                '
                                         onClick={handleClearSubMenu}

                                    >
                                        <div>
                                            <MdKeyboardArrowLeft/>
                                        </div>
                                        <div>Speed</div>
                                    </div>
                                    <div className={'w-full flex flex-col items-end justify-start'}>
                                        {playBackValues.map((value, index) => (
                                            <div key={index} className={`
                                            mt-1
                                            hover:bg-gray-700
                                            hover:cursor-pointer
                                            transition-all duration-100
                                            ${currentSpeedValue === value && 'text-blue-400'}
                                            `}
                                                 onClick={() => handlePlayBackRate(value)}>
                                                {value === 1 ? 'Normal' : `${value}x`}
                                            </div>
                                        ))}
                                    </div>
                                </div>}
                            </div>}
                        </Transition>

                        {/*Share menu*/}
                        {isShareMenuOpen && <div className='
                        absolute
                        p-2
                        rounded
                        left-1/2
                        bottom-10
                        text-black
                        w-28
                        bg-white
                        border-1
                        border-gray-400
                        flex
                        flex-col
                        justify-start
                        items-center
                        transform -translate-x-1/2
                        '>
                            <div className={'mt-1 border-b'}>Telegram</div>
                            <div className={'mt-1 border-b'}>Viber</div>
                            <div className={'mt-1 border-b'}>Facebook</div>
                        </div>}
                        {isCurrentItemMenuOpen &&
                            <div className='
                        absolute
                        p-2
                        rounded
                        left-1/2
                        bottom-10
                        text-black
                        w-28
                        bg-white
                        border-1
                        border-gray-400
                        flex
                        flex-col
                        justify-start
                        items-center
                        transform -translate-x-1/2
                        '>
                                <div className={'mt-1 border-b'}>Rename</div>
                                <div className={'mt-1 border-b'}>Delete</div>
                            </div>}


                    </div>

                </div>
            </div>

        </div>
    );
};

export default CustomControls
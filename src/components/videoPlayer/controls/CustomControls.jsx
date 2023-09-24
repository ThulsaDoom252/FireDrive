import React, {useEffect, useRef, useState} from 'react';
import ControlBar from "./components/ControlBar";
import CentralPlayBtn from "./components/CentralBlayBtn";
import TopBlock from "./components/TopBlock";

const CustomControls = ({
                            playerRef,
                            color = 'text-white',
                            smallScreenMode,
                            playBtnSize = smallScreenMode ? 60 : 30,
                            currentVideoTime,
                            setCurrentVideoTime,
                            disablePreview,
                            index,
                            name,
                            oldName,
                            url,
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
    const [currentSubMenu, setCurrentSubMenu] = useState(null)

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
    const isScaleSubMenuOpen = currentSubMenu === scaleSubMenu
    const isSpeedSubMenuOpen = currentSubMenu === speedSubMenu
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
            <TopBlock
                url={url}
                name={name}
                oldName={oldName}
                index={index}
                topBtnClass={topBtnClass}
                handleShareMenu={handleShareMenu}
                smallScreenMode={smallScreenMode}
                handleCurrentItemMenu={handleCurrentItemMenu}
            />

            {/*//Center Player Btn*/}
            {!isVideoPlaying &&
                <CentralPlayBtn/>
            }
            {/*Control Bar*/}
            <ControlBar {...{
                isVideoPlaying,
                smallScreenMode,
                isSliderHovered,
                disablePreview,
                url,
                previewRef,
                totalVideoDuration,
                previewTime,
                mouseX,
                currentVideoTime,
                currentVideoVolume,
                isFullScreen,
                controlBtnAnimation,
                isVideoMenuOpen,
                currentSubMenu,
                currentScaleValue,
                currentSpeedValue,
                isScaleSubMenuOpen,
                isSpeedSubMenuOpen,
                changeVideoScale,
                playBackValues,
                handlePlay,
                handleSpeedSubMenu,
                handlePlayBackRate,
                handleClearSubMenu,
                handleScaleSubMenu,
                handleVideoMenu,
                handleFullScreen,
                handleMuteVideoVolume,
                handleMouseLeaveSlider,
                handleMouseEnterSlider,
                handleMouseMove,
                handlePiP,
                handleVideoVolumeChange,
                handleChangeDuration,
            }}/>

        </div>
    );
};

export default CustomControls
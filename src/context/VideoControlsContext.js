import {createContext, useEffect, useRef, useState} from "react";
export const VideoControlsContext = createContext()

export const VideoControlsContextProvider = ({children}) => {

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

    const playerRef = useRef(null)

    const [currentVideoTime, setCurrentVideoTime] = useState(null)

    // Menu types
    const videoMenu = 'VIDEO_MENU'

    //Sub menu types
    const speedSubMenu = "SPEED_SUB_MENU"
    const scaleSubMenu = "SCALE_SUB_MENU"

    const videoBlockContainerRef = useRef(null)

    const videoContainerRef = useRef(null)

    //Control states
    const [currentMenu, setCurrentMenu] = useState(null)
    const [currentSubMenu, setCurrentSubMenu] = useState(null)

    const [isSliderHovered, setIsSliderHovered] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [currentVideoVolume, setCurrentVideoVolume] = useState(0.5)
    const [totalVideoDuration, setTotalVideoDuration] = useState(0)
    const [isMobileFullScreen, setIsMobileFullScreen] = useState(false)

    const [isControlsVisible, setIsControlsVisible] = useState(false)
    const [controlInitialVisibilityValue, setControlInitialVisibilityValue] = useState(10000)

    const [previewTime, setPreviewTime] = useState(false)
    const [mouseX, setMouseX] = useState(null)
    const [touchX, setTouchX] = useState(null)

    const playBackValues = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

    // control menu state
    const [currentSpeedValue, setCurrentSpeedValue] = useState(1.0)
    const [currentScaleValue, setCurrentScaleValue] = useState(1)

    const [isPIPactive, setIsPIPactive] = useState(false);
    const currentVideoUrl = playerRef.current?.props?.url

    const previewRef = useRef(null)
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

    // Custom menu handlers
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


    // FullScreen handler
    const handlePlaySpeed = (value) => {

        if (playerRef.current) {
            playerRef.current.getInternalPlayer().playbackRate = value
            setCurrentSpeedValue(value)
        }

    }

    //Preview logic
    const handleMouseMove = (e) => {
        setMouseX(e.clientX);
        // receiving mouse coordinated related to the slider
        const slider = e.currentTarget;
        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;

        // Calculate progress in %
        const progress = (x / slider.offsetWidth) * 100;

        // Convert progress into slider value
        const minValue = 0;
        const maxValue = totalVideoDuration; // Максимальное значение слайдера
        const value = (progress / 100) * (maxValue - minValue) + minValue;
        setPreviewTime(value);

    }

    const handleTouchMove = (e) => {
        setTouchX(e.touches[0].clientX);
        // receiving touch coordinates related to the slider
        const slider = e.currentTarget;
        const rect = slider.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;

        // Calculate progress in %
        const progress = (x / slider.offsetWidth) * 100;

        // Convert progress into slider value
        const minValue = 0;
        const maxValue = totalVideoDuration; // Максимальное значение слайдера
        const value = (progress / 100) * (maxValue - minValue) + minValue;
        setPreviewTime(value);
    };

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


    const handlePlay = () => {
        debugger
        if (isVideoPlaying) {
            debugger
            playerRef?.current?.getInternalPlayer()?.pause()
            setIsVideoPlaying(false)
        } else {
            debugger
            playerRef?.current?.getInternalPlayer()?.play();
            setIsVideoPlaying(true)
        }
    }

    //Volume logic
    const handleVideoVolumeChange = (value) => {
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
        debugger
        playerRef?.current?.seekTo(value.target.value)
        debugger
        setCurrentVideoTime(value.target.value)
        debugger
    }

    //Picture in picture mode
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

    const handleVideoControlsVisibility = () => {
        setControlInitialVisibilityValue(prevValue => prevValue + 5000)
        if (!isControlsVisible) {
            setIsControlsVisible(true)
            setTimeout(() => {
                setIsControlsVisible(false)
                setControlInitialVisibilityValue(10000)
            }, [controlInitialVisibilityValue])
        }
    }


    const videoControlsValues = {
        playerRef,
        previewRef,
        controlBtnAnimation,
        topBtnClass,
        isSliderHovered,
        mouseX,
        touchX,
        playBackValues,
        currentSpeedValue,
        currentScaleValue,
        currentVideoTime,
        setCurrentVideoTime,
        isVideoPlaying,
        setIsVideoPlaying,
        isScaleSubMenuOpen,
        isSpeedSubMenuOpen,
        isVideoMenuOpen,
        handleMainClick,
        handleVideoMenu,
        handleScaleSubMenu,
        handleSpeedSubMenu,
        setIsMobileFullScreen,
        handleClearSubMenu,
        handlePlaySpeed,
        handleMouseMove,
        handleTouchMove,
        changeVideoScale,
        handleVideoVolumeChange,
        handleMouseEnterSlider,
        handleMouseLeaveSlider,
        handleChangeDuration,
        handlePiP,
        totalVideoDuration,
        previewTime,
        currentVideoVolume,
        isMobileFullScreen,
        currentSubMenu,
        handlePlay,
        handleMuteVideoVolume,
        videoBlockContainerRef,
        videoContainerRef,
        handleVideoControlsVisibility,
        isControlsVisible,
    }

    return (
        <VideoControlsContext.Provider value={videoControlsValues}>
            {children}
        </VideoControlsContext.Provider>
    )

}


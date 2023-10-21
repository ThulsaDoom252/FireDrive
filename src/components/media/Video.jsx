import React, {useState, useRef, useEffect} from 'react';
import ReactPlayer from "react-player";
import ItemOptions from "../options/ItemOptions";
import {delay, formatTime, preventDefault} from "../../common/common";
import {BiSolidVolume, BiVolumeMute} from "react-icons/bi";
import {Tooltip} from "@mui/material";
import {Fade} from "@mui/material";
import VideoItemThemeContainer from "../common/theme/VideoItemThemeContainer";
import {SkeletonOverlay} from "../home/HomeMediaListBlock";
import {videoContainerStyle} from "../../common/styles";

const Video = ({
                   url,
                   name,
                   oldName,
                   searchMode,
                   index,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   itemOptionsHovered,
                   setItemOptionsHovered,
                   noOpenModal,
                   smallScreen,
                   handleVideoClick,
                   handleModal,
               }) => {
    const [isVideoReady, setIsVideoReady] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(0)
    const playerRef = useRef(null);
    const [isVideoOptionsAnimated, animateOptions] = useState(false)

    const toggleOptionsAnimation = async (shouldAnimate) => {
        await delay(100)
        animateOptions(shouldAnimate)
    }

    const isVideoHovered = hoveredMediaIndex === index
    const mountVideoItemOptions = isVideoHovered && noOpenModal

    useEffect(() => {
        if (mountVideoItemOptions) {
            !isVideoOptionsAnimated && toggleOptionsAnimation(true).then(() => void 0)
        } else {
            isVideoOptionsAnimated && toggleOptionsAnimation(false).then(() => void 0)
        }

    }, [hoveredMediaIndex])

    const handleMouseEnter = () => {
        setIsPlaying(true);
        setHoveredMediaIndex(index)
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        setHoveredMediaIndex(null)
        playerRef.current.seekTo(0);
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };

    const handleVolume = e => {
        e.stopPropagation()
        setCurrentVolume(prevState => {
            if (prevState === 0) {
                setCurrentVolume(1)
            } else {
                setCurrentVolume(0)
            }
        })
    }

    return (
        <>
            <div
                style={videoContainerStyle}
                onContextMenu={preventDefault}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`bg-black 
                    ${!isVideoHovered && 'rounded-t-lg'} 
                    overflow-hidden
                     cursor-pointer
                    ${isVideoReady ? 'block' : 'hidden'}
                    `}
                onClick={() => handleVideoClick(index)}>
                {isVideoReady && <Tooltip title={'video loading'}>
                    <SkeletonOverlay variant="rectangular"/>
                </Tooltip>}
                {mountVideoItemOptions &&
                    <Fade in={isVideoOptionsAnimated}>
                        <div className={'absolute top-0 right-0 z-50'}><ItemOptions {...{
                            name,
                            oldName,
                            url,
                            index,
                            searchMode,
                            itemOptionsHovered,
                            setItemOptionsHovered,
                            hoveredMediaIndex,
                            handleModal,
                        }} />
                        </div>
                    </Fade>}
                <ReactPlayer
                    ref={playerRef}
                    url={url}
                    width="100%"
                    height="100%"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: isVideoReady ? 'block' : 'hidden',
                    }}
                    onReady={() => setIsVideoReady(true)}
                    playing={isPlaying}
                    volume={currentVolume}
                    onEnded={() => setIsPlaying(false)}
                    onProgress={handleProgress}
                />
                <div className="absolute bottom-2 text-white left-2 flex justify-between w-full">
                    <Fade in={isPlaying}>
                        <div className={'flex'}>
                            {formatTime(currentTime)}
                            {' / '}
                            {playerRef.current && formatTime(playerRef.current.getDuration())}
                        </div>
                    </Fade>
                    <Fade in={isPlaying}>
                        <div className={`
                            absolute 
                            flex
                            justify-center
                            items-center
                            w-14
                            h-5
                            right-1
                            bottom-0.4
                            transition-all duration-300
                            hover:text-white
                            text-gray-400`}
                             onClick={handleVolume}
                        >
                            {currentVolume === 0 ? <BiVolumeMute/> : <BiSolidVolume/>}
                        </div>
                    </Fade>
                </div>
            </div>
            {
                (!smallScreen && isVideoReady) && <VideoItemThemeContainer
                    opacityCondition={hoveredMediaIndex === index}
                    className={`                             
                                p-1
                                 m-0 
                                 text-center
                                 truncate
                                 overflow-x-hidden
                                `}>{name}</VideoItemThemeContainer>
            }
        </>
    )
        ;
};

export default Video;
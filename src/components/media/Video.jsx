import React, {useState, useRef, useEffect} from 'react';
import ReactPlayer from "react-player";
import ItemOptions from "../options/ItemOptions";
import {delay, formatTime, truncate} from "../../common/commonData";
import {BiSolidVolume, BiVolumeMute} from "react-icons/bi";
import {Skeleton, Tooltip} from "@mui/material";
import {Fade} from "@mui/material";

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
                   currentTheme,
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
        {!isVideoReady && <Tooltip title={'video loading'}>
            <Skeleton variant="rectangular" width={250} height={200} animation="wave"/>
        </Tooltip>}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
             className={`relative ${isVideoReady ? 'block' : 'hidden'}`}>
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
                <div
                className={`h-200 bg-black 
                    ${!isVideoHovered && 'rounded-t-lg'} 
                    overflow-hidden cursor-pointer`}
             onClick={() => handleVideoClick(index)}
        >
            <ReactPlayer
                ref={playerRef}
                url={url}
                width="100%"
                height="100%"
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
        </div>
{
    (!smallScreen && isVideoReady) && <p className={`                             
                                p-1
                                 m-0 
                                 overflow-x-hidden
                                 ${currentTheme.secBg}
                                 ${hoveredMediaIndex === index ? 'bg-opacity-100' : 'bg-opacity-50 rounded-b-lg'}
                                ${currentTheme.color}
                                `}>{truncate(name, 15)}</p>
}
</>
)
    ;
};

export default Video;
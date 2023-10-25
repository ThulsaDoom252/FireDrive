import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {videoContainerStyle} from "../../../common/styles";
import {SkeletonOverlay} from '../../mui/styles';

const HomeVideoPlayer = ({url}) => {
    const ref = useRef(null)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    useEffect(() => {
        const rewindInitialVideo = () => {
            const totalDuration = ref.current.getDuration()
            ref.current.seekTo(totalDuration / 10)
        }

        isVideoLoaded && rewindInitialVideo()
    }, [isVideoLoaded]);

    return (
        <div
            style={videoContainerStyle}
            className={`
                    rounded
                    ${isVideoLoaded ? 'bg-black' : 'hidden'}
                    `}>
            {!isVideoLoaded && <SkeletonOverlay variant={'rectangular'}/>}
            <ReactPlayer
                ref={ref}
                onReady={() => setIsVideoLoaded(true)}
                width="100%"
                height="100%"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: isVideoLoaded ? 'block' : 'hidden',
                }}
                url={url}
                alt={'broken'}/>
        </div>

    );
};

export default HomeVideoPlayer;
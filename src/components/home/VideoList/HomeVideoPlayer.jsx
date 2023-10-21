import React, {useState} from 'react';
import ReactPlayer from "react-player";
import {SkeletonOverlay} from "../HomeMediaListBlock";
import {videoContainerStyle} from "../../../common/styles";


const HomeVideoPlayer = ({index, smallScreen, url}) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    return (
        <div
            style={videoContainerStyle}
            className={`
                    rounded
                    ${isVideoLoaded ? 'bg-black' : 'hidden'}
                    `}>
            {!isVideoLoaded && <SkeletonOverlay variant={'rectangular'}/>}
            <ReactPlayer
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
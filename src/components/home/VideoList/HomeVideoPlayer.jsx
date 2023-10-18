import React, {useState} from 'react';
import {Skeleton} from "@mui/material";
import ReactPlayer from "react-player";
import {SkeletonOverlay, StyledPlayer} from "../HomeMediaListBlock";

const HomeVideoPlayer = ({index, smallScreen, url}) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    const containerStyle = {
        position: 'relative',
        paddingTop: '100%',
    };


    const videoStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: !isVideoLoaded ? 'hidden' : 'block',
    };


    return (
        <>
            {index <= (smallScreen ? 3 : 8) &&
                <div
                    style={containerStyle}
                    className={`
                    rounded
                    ${isVideoLoaded ? 'bg-black' : 'hidden'}
                    `}>
                    {!isVideoLoaded && <SkeletonOverlay variant={'rectangular'}/>}
                    <ReactPlayer
                        onReady={() => setIsVideoLoaded(true)}
                        width="100%"
                        height="100%"
                        style={videoStyle}
                        url={url}
                        alt={'broken'}/>
                </div>
            }

        </>
    );
};

export default HomeVideoPlayer;
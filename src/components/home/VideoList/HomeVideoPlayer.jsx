import React, {useState} from 'react';
import {Skeleton} from "@mui/material";
import ReactPlayer from "react-player";

const HomeVideoPlayer = ({index, smallScreen, url}) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    return (
        <>
            {!isVideoLoaded && <Skeleton variant={'rectangular'} animation={'wave'}
                                         height={100} width={100}/>}
            {index <= (smallScreen ? 4 : 8) &&
                <div className={`
                    flex
                    m-2
                    justify-center
                    items-center
                    rounded
                    h-90%
                    max-w-videoListItem
                    overflow-y-hidden
                    ${isVideoLoaded ? 'bg-black' : 'hidden'}
                    `}>
                    <ReactPlayer
                        onReady={() => setIsVideoLoaded(true)}
                        height={'full'}
                        width={'full'}
                        url={url}
                        alt={'broken'}/>

                </div>}</>
    );
};

export default HomeVideoPlayer;
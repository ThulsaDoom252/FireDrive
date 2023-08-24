import React from 'react';
import ReactPlayer from "react-player";
import {MdOutlineOndemandVideo} from "react-icons/md";
import {ClipLoader} from "react-spinners";

const VideosList = ({videosSet, currentTheme, fetchVideos}) => {
    return (
        <div className={`
                    p-3
                    mb-20
                    flex
                    justify-between
                    w-full
                    rounded
                    bg-opacity-70
                    h-homeItemBlock
                    hover:cursor-pointer
                    z-1
                    ${currentTheme.color}
                    ${currentTheme.primeBg}
                     hover:brightness-110 
                    transition duration-300 ease-in-out
                    `}>
            <div className={`
                        h-full
                        flex
                        items-center
                        `}>
                <MdOutlineOndemandVideo size={40}/>
            </div>
            <div className={`
                        h-full
                        w-full 
                        flex 
                        justify-center
                        items-center
                        `}>
                {fetchVideos ? <ClipLoader size={50}
                                           color={currentTheme.color}/> : videosSet.length !== 0 ? videosSet.map((video, index) =>
                    index <= 8 &&
                    <div className={`
                    flex
                    m-2
                    justify-center
                    items-center
                    rounded
                    bg-black
                    h-90%
                    max-w-videoListItem
                    overflow-y-hidden
                    `}>
                        <ReactPlayer
                            height={'full'}
                            width={'full'}
                            url={video.url}
                            alt={'broken'}/>
                    </div>
                ) : <div>No videos...</div>}


            </div>
            <div className='
                      flex
                      flex-col
                      justify-center
                      items-center
                      '>
                <div>Total:</div>
                {videosSet.length}

            </div>
        </div>
    );
};

export default VideosList;
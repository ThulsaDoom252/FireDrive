import React from 'react';
import {images, truncate, videos, audio} from "../../common/commonData";
import {MdLibraryMusic, MdOutlineOndemandVideo} from "react-icons/md";
import {FaImages} from "react-icons/fa";
import {PiMusicNotesFill} from "react-icons/pi"
import Image from "../media/Image/Image"
import {Skeleton} from "@mui/material";
import HomeVideoPlayer from "./VideoList/HomeVideoPlayer";
import ThemeContainer from "../common/theme/ThemeContainer";


const HomeMediaListBlock = ({itemsList, fetchItems, smallScreen, currentTheme, itemType, iconSize = 40}) => {
    const imagesList = (itemType === images) && (itemsList.length !== 0)
    const videosList = (itemType === videos) && (itemsList.length !== 0)
    const audioList = (itemType === audio) && (itemsList.length !== 0)

    return (
            <ThemeContainer className={`
                    p-3
                    mb-20
                    flex
                    justify-between
                    rounded
                    w-full
                    bg-opacity-70
                    hover:cursor-pointer
                    z-1
                    ${!smallScreen ? 'h-homeItemBlock' : 'h-mobileHomeItemsBlock'}
                    hover:brightness-110 
                    hover:p-4
                    transition-all duration-300 ease-in-out 
                    `} enableColor>
                <div className={`
                        h-full
                        flex
                        items-center
                        `}>
                    {itemType === images ? <FaImages size={iconSize}/>
                        : itemType === videos ? <MdOutlineOndemandVideo size={iconSize}/>
                            : <MdLibraryMusic size={iconSize}/>
                    }
                </div>
                <div className={`
                        h-90%
                        w-full
                        flex 
                        justify-center
                        items-center
                        truncate
                        `}>
                    {fetchItems ?
                        <Skeleton variant="rectangular" width={40} height={40}
                                  style={{width: '100%', height: '100%', color: `${currentTheme.color}`}}/>
                        : imagesList ? itemsList.map((image, index) =>
                                    index <= (smallScreen ? 4 : 8) && <div className={`
                        m-2
                        h-full
                        max-w-imageListItem
                        overflow-hidden                  
                        `}>
                                        <Image
                                            url={image.url}
                                            height={'h-full'}
                                            width={'max-w-full'}
                                            skeletonWidth={150}
                                            skeletonHeight={150}
                                            imageIsClickable={false}
                                        />
                                    </div>
                            )
                            : videosList ? itemsList.map((video, index) =>
                                <HomeVideoPlayer index={index} url={video.url} smallScreen={smallScreen}/>
                            ) : audioList ? itemsList.map((audio, index) =>
                                    index <= (smallScreen ? 3 : 6) && <div className={`
                    flex
                    h-full
                    max-w-audioListItem
                    m-1
                    flex-col
                    justify-center
                    items-center
                    ${currentTheme.secBg}
                    bg-opacity-50
                    rounded
                    `}>
                                        <PiMusicNotesFill size={25}/>
                                        <div className={'text-center text-sm truncate'}>
                                            {truncate(audio.name, 10)}
                                        </div>
                                    </div>
                            ) : 'No items...'}


                </div>
                <div className='
                      flex
                      flex-col
                      justify-center
                      items-center
                      '>
                    <div>Total:</div>
                    {itemsList.length}

                </div>
            </ThemeContainer>
    );
};

export default HomeMediaListBlock;
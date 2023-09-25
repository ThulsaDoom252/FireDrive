import React from 'react';
import {images, truncate, videos, audio} from "../../common/commonData";
import {MdLibraryMusic, MdOutlineOndemandVideo} from "react-icons/md";
import {FaImages} from "react-icons/fa";
import {ClipLoader} from "react-spinners";
import ReactPlayer from "react-player";
import {PiMusicNotesFill} from "react-icons/pi"
import Image from "../media/Image/Image"


const HomeMediaListBlock = ({itemsList, fetchItems, smallScreen, currentTheme, itemType, iconSize = 40}) => {
    const imagesList = (itemType === images) && (itemsList.length !== 0)
    const videosList = (itemType === videos) && (itemsList.length !== 0)
    const audioList = (itemType === audio) && (itemsList.length !== 0)

    return (
        <div className={`
        overflow-x-hidden
                    p-3
                    mb-20
                    flex
                    justify-between
                    w-full
                    rounded
                    bg-opacity-70
                    hover:cursor-pointer
                    z-1
                    ${currentTheme.color}
                    ${currentTheme.primeBg}
                    ${!smallScreen ? 'h-homeItemBlock' : 'h-mobileHomeItemsBlock'}
                    hover:brightness-110 
                    hover:p-4
                    transition-all duration-300 ease-in-out 
                    `}>
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
                        `}>
                {fetchItems ? <ClipLoader size={50}
                                          color={currentTheme.color}/>
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
                            index <= (smallScreen ? 4 : 8) &&
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
                                    <div className={'text-center text-sm'}>
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
        </div>
    );
};

export default HomeMediaListBlock;
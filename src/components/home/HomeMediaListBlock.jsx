import React from 'react';
import {images, videos, audio} from "../../common/common";
import {MdLibraryMusic, MdOutlineOndemandVideo} from "react-icons/md";
import {FaImages} from "react-icons/fa";
import {PiMusicNotesFill} from "react-icons/pi"
import HomeVideoPlayer from "./VideoList/HomeVideoPlayer";
import ThemeContainer from "../common/theme/ThemeContainer";
import {Grid} from '@mui/material';
import {GridItemContainer, SkeletonOverlay, StyledImage} from '../mui/styles';

const HomeMediaListBlock = ({itemsList, fetchItems, smallScreen, currentTheme, itemType, iconSize = 40}) => {
    const imagesList = (itemType === images) && (itemsList.length !== 0)
    const videosList = (itemType === videos) && (itemsList.length !== 0)
    const audioList = (itemType === audio) && (itemsList.length !== 0)

    const skeletonItemsArr = [1, 2, 3, 4, 5, 6, 7, 8]
    const maxItemsToMap = smallScreen ? 4 : 8
    const cellsCount = smallScreen ? 3 : 1.5

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
            <Grid container className={'overflow-y-hidden p-2'} justifyContent={'center'} alignItems={'center'}
                  spacing={1}>
                {fetchItems ? skeletonItemsArr.map((dummy, index) => index <= (maxItemsToMap - 1) && (
                        <Grid key={index} item xs={cellsCount}>
                            <GridItemContainer>
                                <SkeletonOverlay variant="rectangular"/>
                            </GridItemContainer>
                        </Grid>
                    )) : imagesList ?  itemsList.map((image, index) =>
                        index <= (maxItemsToMap - 1) && (
                            <Grid key={index} item xs={cellsCount}>
                                <GridItemContainer>
                                    <StyledImage  src={image.url} alt={'image'}/>
                                </GridItemContainer>
                            </Grid>
                        ))
                 : videosList ? itemsList.map((video, index) => index <= (maxItemsToMap - 1) && (
                    <Grid key={index} xs={cellsCount} item>
                        <HomeVideoPlayer index={index} url={video.url} smallScreen={smallScreen}/>
                    </Grid>
                )) : audioList ? itemsList.map((audio, index) =>
                        index <= (maxItemsToMap - 1) && (
                            <Grid key={index} item xs={cellsCount}>
                                <div
                                    className={`
          flex
          h-full
          flex-col
          justify-center
          items-center
          ${currentTheme.secBg}
          bg-opacity-50
          rounded
        `}
                                >
                                    <PiMusicNotesFill size={25}/>
                                    <div className={'text-center text-sm truncate w-full'}>
                                        {audio.name}
                                    </div>
                                </div>
                            </Grid>
                        )
                ) : 'No items...'}
            </Grid>
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
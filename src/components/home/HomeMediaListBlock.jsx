import React, {useEffect, useState} from 'react';
import {images,  videos, audio} from "../../common/commonData";
import {MdLibraryMusic, MdOutlineOndemandVideo} from "react-icons/md";
import {FaImages} from "react-icons/fa";
import {PiMusicNotesFill} from "react-icons/pi"
import {Skeleton} from "@mui/material";
import HomeVideoPlayer from "./VideoList/HomeVideoPlayer";
import ThemeContainer from "../common/theme/ThemeContainer";
import {Grid, styled} from '@mui/material';
import ReactPlayer from "react-player";

export const StyledImage = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const StyledPlayer = styled(ReactPlayer)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
})

export const GridItemContainer = styled('div')({
    width: '100%',
    maxHeight: '100%',
    paddingBottom: '100%', // Создаем пустое пространство для сохранения пропорций
    position: 'relative',
});

export const SkeletonOverlay = styled(Skeleton)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
});

const HomeMediaListBlock = ({itemsList, fetchItems, smallScreen, currentTheme, itemType, iconSize = 40}) => {
    const imagesList = (itemType === images) && (itemsList.length !== 0)
    const videosList = (itemType === videos) && (itemsList.length !== 0)
    const audioList = (itemType === audio) && (itemsList.length !== 0)

    const skeletonItemsArr = [1, 2, 3, 4, 5, 6, 7, 8]

    const cellsCount = smallScreen ? 3 : 1.5

    const [cellNumb, setCellNumb] = useState(0)

    useEffect(() => {
        const getGridItemXs = (imageCount) => {
            const finalValue = itemsList.length <=  8 ? imageCount : 8
            const values = [null, 12, 6, 4, 3, 2.4, 2, 1.7, 1.5];
            for (let i = values.length - 1; i >= 1; i--) {
                if (finalValue >= i) {
                    return values[i];
                }
            }
        };

        const val = getGridItemXs(itemsList.length)
        setCellNumb(val)
    }, [])

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
                {imagesList ? (fetchItems ? skeletonItemsArr.map((dummy, index) => index <= (smallScreen ? 3 : 8) && (
                        <Grid key={index} item xs={cellsCount}>
                            <GridItemContainer>
                                <SkeletonOverlay variant="rectangular"/>
                            </GridItemContainer>
                        </Grid>
                    )) : itemsList.map((image, index) =>
                        index <= (smallScreen ? 3 : 8) && (
                            <Grid key={index} item xs={cellsCount}>
                                <GridItemContainer>
                                    <StyledImage src={image.url} alt={'image'}/>
                                </GridItemContainer>
                            </Grid>
                        ))
                ) : videosList ? itemsList.map((video, index) => (
                    <Grid key={index} xs={cellsCount} item>
                        <HomeVideoPlayer index={index} url={video.url} smallScreen={smallScreen}/>
                    </Grid>
                )) : audioList ? itemsList.map((audio, index) =>
                        index <= (smallScreen ? 3 : 7) && (
                            <Grid key={index} item xs={cellNumb}>
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
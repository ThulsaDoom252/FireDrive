import React from 'react';
import {ClipLoader} from "react-spinners";
import Audio from "./Audio";
import Paginator from "../paginator/Paginator";
import NoSearchResults from "../search/NoSearchResults";
import Video from "./Video";
import ImageBlock from "./Image/ImageBlock";
import {Box, Grid} from "@mui/material";
import ItemsLayoutMenu from "./itemsLayoutMenu";
import Overlay from "../common/Overlay";
import noImages from "./noImages.jpg"
import noVideo from "./noVideo.jpg"
import noAudio from "./noAudio.png"
import {GridItemContainer} from '../mui/styles';

const Media = ({
                   imagesPage,
                   videosPage,
                   audioPage,
                   currentMediaFetch,
                   mediaToShow,
                   noMedia,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   noSearchResults,
                   isPaginatorHidden,
                   paginatorProps,
                   searchMode,
                   smallScreen,
                   setItemOptionsHovered,
                   noOpenModal,
                   confirm,
                   handleLayoutMenu,
                   handleCollValue,
                   gridLayoutItemsArr,
                   gridLayoutMenu,
                   gridDividerValue,
                   gridLayoutIndex,
                   deletedItemUrl,
                   handleVideoClick,
                   handleImageClick,
                   handleModal,
                   isMediaDeleting,
               }) => {

    window.s1  = mediaToShow

    return (
        <>
            {gridLayoutMenu &&
                <Overlay opacity={'bg-transparent'} height={'h-screen'} zIndex={'z-1'} width={'w-screen'}
                         toggleModal={handleLayoutMenu} position={'fixed'}/>}
            <section
                className={`
            mx-auto 
            relative 
            pt-20 
            pb-52 
            flex  
            flex-col 
            items-center 
             ${(noMedia || noSearchResults) ? 'justify-center h-screen w-screen ' : ''}
             ${audioPage && smallScreen ? 'w-full' : audioPage ? 'w-1/2' : !audioPage && smallScreen ? 'w-full' : 'w-full pl-10 pr-10'} 
             
             `}>
                {(!noMedia && !noSearchResults && !audioPage) &&
                    <ItemsLayoutMenu {...{
                        gridLayoutMenu,
                        gridLayoutItemsArr,
                        gridLayoutIndex,
                        handleLayoutMenu,
                        handleCollValue,
                    }}/>}

                {noSearchResults && <Box><NoSearchResults/></Box>}
                {noMedia ?
                    <Box><img className={`mx-auto w-1/2 rounded-md opacity-80 bg-white`}
                              src={(imagesPage ? noImages : videosPage ? noVideo : noAudio)}
                              alt={'No images'}/></Box> :
                    <Grid
                        style={{width: '100%'}}
                        container
                        spacing={1}
                        hidden={noSearchResults}
                        className={`
                      relative
                      top-10
                      ${isPaginatorHidden && 'mt-5'} 
                      ${currentMediaFetch && 'flex justify-center items-center'}`}>
                        {currentMediaFetch && <ClipLoader
                            color={'blue'}
                            size={150}
                        />}

                        {imagesPage ? mediaToShow.map((media, index) => {
                                return <Grid item xs={gridDividerValue}>
                                    <GridItemContainer key={index} onMouseEnter={() => setHoveredMediaIndex(index)}
                                                       onMouseLeave={() => setHoveredMediaIndex(null)}>
                                        <ImageBlock
                                            url={media.url}
                                            name={media.name}
                                            oldName={media.oldName}
                                            {...{
                                                index,
                                                setHoveredMediaIndex,
                                                deletedItemUrl,
                                                searchMode,
                                                hoveredMediaIndex,
                                                setItemOptionsHovered,
                                                confirm,
                                                handleImageClick,
                                                handleModal,
                                                isMediaDeleting,
                                            }}/>
                                    </GridItemContainer>
                                </Grid>
                            })
                            : videosPage ? mediaToShow.map((video, index) =>
                                    <Grid item xs={gridDividerValue}>
                                        <Video url={video.url}
                                               name={video.name}
                                               oldName={video.oldName}
                                               {...{
                                                   searchMode,
                                                   index,
                                                   noOpenModal,
                                                   deletedItemUrl,
                                                   isMediaDeleting,
                                                   hoveredMediaIndex,
                                                   setHoveredMediaIndex,
                                                   setItemOptionsHovered,
                                                   smallScreen,
                                                   handleVideoClick,
                                                   handleModal,
                                                   confirm,
                                               }}/>
                                    </Grid>
                                ) :
                                mediaToShow.map(((audio, index) => {
                                        return (
                                            <Grid item xs={12}>
                                                <div key={audio.index}>
                                                    <Audio name={audio.name}
                                                           audioIndex={audio.index}
                                                           url={audio.url}
                                                           {...{
                                                               hoveredMediaIndex,
                                                               setHoveredMediaIndex,
                                                               index,
                                                               searchMode,
                                                               smallScreen,
                                                               confirm,
                                                           }}/>
                                                </div>
                                            </Grid>
                                        )

                                    }

                                ))
                        }
                    </Grid>}
                <div hidden={isPaginatorHidden} className={'mt-20'}><Paginator {...{paginatorProps}}/></div>

            </section>
        </>
    );
};

export default Media;
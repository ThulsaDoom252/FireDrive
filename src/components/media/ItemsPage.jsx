import React from 'react';
import {ClipLoader} from "react-spinners";
import Audio from "./Audio";
import Paginator from "../paginator/Paginator";
import NoSearchResults from "../search/NoSearchResults";
import Video from "./Video";
import ImageBlock from "./Image/ImageBlock";
import {Box, Grid} from "@mui/material";
import noImages from "./noImages.jpg"
import noVideo from "./noVideo.jpg"
import noAudio from "./noAudio.png"
import {GridItemContainer} from '../mui/styles';
import {dummys} from '../../test';
import ItemsList from './ItemsList';

const ItemsPage = ({
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
                       deletedItemUrl,
                       handleVideoClick,
                       handleImageClick,
                       handleModal,
                       isMediaDeleting,
                       gridDividerValue,
                   }) => {

    return (
        <>
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
                {/*{(!noMedia && !noSearchResults && !audioPage) &&*/}
                {/*    <ItemsLayoutMenu {...{*/}
                {/*        gridLayoutMenu,*/}
                {/*        gridLayoutItemsArr,*/}
                {/*        gridLayoutIndex,*/}
                {/*        handleLayoutMenu,*/}
                {/*        handleCollValue,*/}
                {/*    }}/>}*/}

                {noSearchResults && <Box><NoSearchResults/></Box>}
                {noMedia ?
                    <Box>
                        <img className={`mx-auto w-1/2 rounded-md opacity-80 bg-white`}
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
                                return <React.Fragment key={index}><Grid item xs={gridDividerValue}>
                                    <GridItemContainer key={index}
                                                       onMouseEnter={() => !smallScreen && setHoveredMediaIndex(index)}
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
                                </React.Fragment>
                            })
                            : videosPage ? mediaToShow.map((video, index) =>
                                    <React.Fragment key={index}>
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
                                    </React.Fragment>
                                ) :
                                mediaToShow.map((audio, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Grid item xs={12}>
                                                    <div key={audio.index}>
                                                        <Audio name={audio.name}
                                                               audioIndex={audio.index}
                                                               oldName={audio.oldName}
                                                               url={audio.url}
                                                               {...{
                                                                   hoveredMediaIndex,
                                                                   setHoveredMediaIndex,
                                                                   isMediaDeleting,
                                                                   deletedItemUrl,
                                                                   index,
                                                                   searchMode,
                                                                   smallScreen,
                                                                   confirm,
                                                                   handleModal,
                                                               }}/>
                                                    </div>
                                                </Grid>
                                            </React.Fragment>
                                        )

                                    }
                                )

                            // <ItemsList {...{  mediaToShow,
                            // hoveredMediaIndex,
                            // setHoveredMediaIndex,
                            // isMediaDeleting,
                            // deletedItemUrl,
                            // searchMode,
                            // smallScreen,
                            // confirm,
                            // handleModal,}}/>
                        }
                    </Grid>}
                <div hidden={isPaginatorHidden} className={'mt-20'}><Paginator {...{paginatorProps}}/></div>

            </section>
        </>
    );
};

export default ItemsPage;
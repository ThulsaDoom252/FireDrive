import React from 'react';
import {ClipLoader} from "react-spinners";
import Audio from "./Audio";
import Paginator from "../paginator/Paginator";
import NoSearchResults from "../search/NoSearchResults";
import Video from "./Video";
import ImageBlock from "./Image/ImageBlock";
import {Grid} from "@mui/material";
import ItemsLayoutMenu from "./itemsLayoutMenu";
import Overlay from "../common/Overlay";

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
                   currentTheme,
                   noOpenModal,
                   confirm,
                   handleLayoutMenu,
                   handleCollValue,
                   layoutNumbs,
                   gridWidth,
                   layoutMenu,
                   gridNumb,
                   gridIndex,
                   handleVideoClick,
                   handleImageClick,
                   handleModal,
                   classes,
               }) => {

    return (
        <>
            {layoutMenu &&
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
             ${noMedia ? 'justify-center' : ''}
             ${audioPage && smallScreen ? 'w-full' : audioPage ? 'w-1/2' : !audioPage && smallScreen ? 'w-full' : 'w-full pl-10 pr-10'} 
             
             `}>
                {/*// layout btn*/}<ItemsLayoutMenu {...{
                audioPage,
                layoutMenu,
                layoutNumbs,
                gridIndex,
                handleLayoutMenu,
                handleCollValue,
                classes,
            }}/>

                {noSearchResults && <div className={'absolute top-custom-50% left-custom-50%'}><NoSearchResults/></div>}
                {noMedia ?
                    <div>{imagesPage ? 'You have no images' : videosPage ? 'You have no videos' : 'You have no audio'}</div> :
                    <Grid
                        style={{width: gridWidth}}
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
                                return <Grid item xs={gridNumb}><ImageBlock url={media.url}
                                                                            name={media.name}
                                                                            oldName={media.oldName}

                                                                            {...{
                                                                                index,
                                                                                setHoveredMediaIndex,
                                                                                searchMode,
                                                                                hoveredMediaIndex,
                                                                                setItemOptionsHovered,
                                                                                confirm,
                                                                                handleImageClick,
                                                                                handleModal,
                                                                            }}/></Grid>
                            })
                            : videosPage ? mediaToShow.map((video, index) =>
                                    <Grid item xs={gridNumb}>
                                        <div key={index} className={`
                            w-full
                            relative 
                            flex
                             flex-col 
                             justify-center 
                             text-center   
                             `}>
                                            <Video url={video.url}
                                                   name={video.name}
                                                   oldName={video.oldName}
                                                   {...{
                                                       searchMode,
                                                       index,
                                                       noOpenModal,
                                                       hoveredMediaIndex,
                                                       setHoveredMediaIndex,
                                                       setItemOptionsHovered,
                                                       currentTheme,
                                                       smallScreen,
                                                       handleVideoClick,
                                                       handleModal,

                                                   }}/>
                                        </div>
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
                                                               currentTheme,
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
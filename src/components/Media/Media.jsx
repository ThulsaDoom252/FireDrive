import React from 'react';
import {ClipLoader} from "react-spinners";
import Audio from "./Audio";
import Paginator from "../Paginator/Paginator";
import NoSearchResults from "../Search/NoSearchResults";
import Image from "./Image";
import Video from "./Video";
import OpacityTransition from "../common/MyCustomTransition";
import MediaOptions from "../Options/mediaOptions";
import {truncate} from "../../common/commonData";

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
                   handleInitialModalIndex,
                   itemOptionsHovered,
                   setItemOptionsHovered,
                   currentTheme,
                   noOpenModal,
                   isPaginatorEnabled,
               }) => {

    return (
        <section
            className={`
            mx-auto 
            h-full 
            relative 
            pt-20 
            pb-52 
            flex  
            flex-col 
            items-center 
             ${noMedia ? 'justify-center' : ''}
             ${audioPage && smallScreen ? 'w-full' : audioPage ? 'w-1/2' : !audioPage && smallScreen ? 'w-full' : 'w-full pl-10 pr-10'} 
             
             `}>
            {noSearchResults && <div className={'absolute top-custom-50% left-custom-50%'}><NoSearchResults/></div>}
            {noMedia ?
                <div>{imagesPage ? 'You have no images' : videosPage ? 'You have no videos' : 'You have no audio'}</div> :
                <div hidden={noSearchResults}
                     className={`w-full ${isPaginatorHidden && 'mt-5'} ${currentMediaFetch ? 'flex justify-center items-center' : !audioPage ?
                         'grid gap-1 sm: grid-cols-3  md:grid-cols-4   ' +
                         'lg:grid-cols-5 xl:grid-cols-6' : ''}`}>
                    {currentMediaFetch && <ClipLoader
                        color={'blue'}
                        size={150}
                    />}
                    {imagesPage ? mediaToShow.map((media, index) => {
                            const itemIsHovered = hoveredMediaIndex === index
                            return (<div key={index}
                                         onMouseEnter={() => setHoveredMediaIndex(index)}
                                         onMouseLeave={() => setHoveredMediaIndex(null)}
                                         className={'flex justify-center max-w-200 max-h-200 relative'}>
                                <OpacityTransition show={(itemIsHovered)}>
                                    <div className={'absolute top-0 right-0'}>
                                        <MediaOptions name={media.name}
                                                      oldName={media.oldName}
                                                      url={media.url}
                                                      {...{
                                                          index,
                                                          searchMode,
                                                          hoveredMediaIndex,
                                                          itemOptionsHovered,
                                                          setItemOptionsHovered,
                                                      }}/></div>
                                </OpacityTransition>
                                <Image url={media.url}
                                       width={'w-full'}
                                       height={'h-full'}
                                       imageIsHovered={itemIsHovered}
                                       {...{
                                           index,
                                           handleInitialModalIndex,
                                       }}/>
                            </div>)
                        })
                        : videosPage ? mediaToShow.map((video, index) =>
                                <div key={index} className={`
                            w-full 
                            relative 
                            flex
                             flex-col 
                             justify-center 
                             text-center   
                             `}>
                                    <Video url={video.url} name={video.name} oldName={video.oldName} {...{
                                        searchMode,
                                        index,
                                        noOpenModal,
                                        handleInitialModalIndex,
                                        hoveredMediaIndex,
                                        setHoveredMediaIndex,
                                        itemOptionsHovered, setItemOptionsHovered,
                                        currentTheme,

                                    }}/>
                                    {!smallScreen && <p className={`                             
                                p-1
                                 m-0 
                                 overflow-x-hidden
                                 ${currentTheme.secBg}
                                 ${hoveredMediaIndex === index ? 'bg-opacity-100' : 'bg-opacity-50 rounded-b-lg'}
                                ${currentTheme.color}
                                `}>{truncate(video.name, 15)}</p>}

                                </div>
                            ) :
                            mediaToShow.map(((audio, index) => {
                                    return (
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
                                    )

                                }

                            ))
                    }
                </div>}
            <div hidden={isPaginatorHidden} className={'mt-20'}><Paginator {...{paginatorProps}}/></div>

        </section>
    );
};

export default Media;
import React from 'react';
import {ClipLoader} from "react-spinners";
import Audio from "./Audio";
import Paginator from "../Paginator/Paginator";
import Search from "../Search/Search";
import NoSearchResults from "../Search/NoSearchResults";
import Image from "./Image";
import Video from "./Video";

const Media = ({
                   imagesPage,
                   videosPage,
                   audioPage,
                   currentMediaFetch,
                   searchRequest,
                   mediaToShow,
                   noMedia,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   noSearchResults,
                   isPaginatorHidden,
                   paginatorProps,
                   searchMode,
                   setSearchRequest,
                   smallScreen,
               }) => {
    return (
        <section
            className={`w-full h-full relative  p-10 flex overflow-y-scroll flex-col items-center ${noMedia ? 'justify-center' : ''}`}>
            {!noMedia && <div className={'w-full'}><Search {...{searchRequest, setSearchRequest}}/></div>}
            <div hidden={isPaginatorHidden} className={'mt-2'}><Paginator {...{paginatorProps}}/></div>
            {noSearchResults && <div className={'absolute top-custom-50% left-custom-50%'}><NoSearchResults/></div>}
            {noMedia ?
                <div>{imagesPage ? 'You have no images' : videosPage ? 'You have no videos' : 'You have no audio'}</div> :
                <div hidden={noSearchResults}
                     className={`w-full ${isPaginatorHidden && 'mt-5'} ${currentMediaFetch ? 'flex justify-center items-center' : !audioPage ?
                         'grid gap-5 sm: grid-cols-2  md:grid-cols-3   ' +
                         'lg:grid-cols-4 xl:grid-cols-5' : ''}`}>
                    {currentMediaFetch && <ClipLoader
                        color={'blue'}
                        size={150}
                    />}
                    {imagesPage ? mediaToShow.map((media, index) =>
                        <div key={index} className={'w-fit flex flex-col justify-center relative'}>
                            <Image url={media.url} name={media.name}
                                   oldName={media.oldName}
                                   {...{
                                       index,
                                       searchMode,
                                       hoveredMediaIndex,
                                       setHoveredMediaIndex
                                   }}/>
                        </div>) : videosPage ? mediaToShow.map((video, index) =>
                            <div key={index} className="w-full relative flex flex-col justify-center text-center">
                                <Video url={video.url} name={video.name} oldName={video.oldName} {...{searchMode, index}}/>
                            </div>
                        ) :
                        mediaToShow.map(((audio, index) => {
                                return (
                                    <div key={audio.index}>
                                        <Audio name={audio.name} oldName={audio.oldName} audioIndex={audio.index}
                                               url={audio.url}
                                               {...{
                                                   hoveredMediaIndex,
                                                   setHoveredMediaIndex,
                                                   index,
                                                   searchMode,
                                                   smallScreen
                                               }}/>
                                    </div>
                                )

                            }

                        ))
                    }
                </div>}
        </section>
    );
};

export default Media;
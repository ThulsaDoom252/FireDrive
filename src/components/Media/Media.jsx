import React from 'react';
import {ClipLoader} from "react-spinners";
import ReactPlayer from "react-player";
import {truncate} from "../../common/commonData";
import Audio from "./Audio";

const Media = ({currentMediaSet, imagesPage, videosPage, audioPage, currentMediaFetch, smallScreen}) => {
    const noMedia = currentMediaSet.length === 0
    return (
        <section
            className={`w-full h-full  bg-amber-300 p-10 flex flex-col items-center ${noMedia ? 'justify-center' : ''}  ${!smallScreen ? 'mt-10' : ''}`}>
            {noMedia ?
                <div>{imagesPage ? 'You have no images' : videosPage ? 'You have no videos' : 'You have no audio'}</div> :
                <div
                    className={`w-full ${currentMediaFetch ? 'flex justify-center items-center' : !audioPage ?
                        'grid gap-5 sm: grid-cols-2 grid-rows-2 md:grid-cols-3 grid-rows-3  ' +
                        'lg:grid-cols-4 grid-rows-4 xl:grid-cols-5 grid-rows-5' : ''}`}>
                    {currentMediaFetch && <ClipLoader
                        color={'blue'}
                        size={150}
                    />}
                    {imagesPage ? currentMediaSet.map((media, index) =>
                        <div key={index} className={'w-fit flex flex-col justify-center'}>
                            <img className={"w-300 h-300 object-cover"}
                                 src={media.url}
                                 alt="image"/>
                            <p>{truncate(media.name, 15)}</p>
                        </div>) : videosPage ? currentMediaSet.map((video, index) =>
                            <div key={index} className="w-full relative flex flex-col justify-center text-center">
                                <div className="player-container  h-200 bg-black rounded-lg overflow-hidden">
                                    <ReactPlayer
                                        url={video.url}
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                                <p className={''}>{truncate(video.name, 15)}</p>
                            </div>
                        ) :
                        currentMediaSet.map((audio =>
                                <div key={audio.index}>
                                    <Audio audioName={audio.name} index={audio.index}/>
                                </div>
                        ))
                    }
                </div>}
        </section>
    );
};

export default Media;
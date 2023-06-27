import React from 'react';
import {ClipLoader} from "react-spinners";
import ReactPlayer from "react-player";
import {truncate} from "../../common/commonData";

const Media = ({currentMediaSet, imagesPage, videosPage, audioPage, currentMediaFetch}) => {
    return (
        <section className={`min-h-screen bg-amber-300 pl-10 pr-10 flex flex-col items-center`}>
            <div className={'mt-10 mb-10'}>{imagesPage ? 'Images' : videosPage ? 'Videos' : 'Audio'}</div>
            <div
                className={`w-full ${currentMediaFetch ? 'flex justify-center items-center' : !audioPage ? 'grid gap-5 sm: grid-cols-2 grid-rows-2 md:grid-cols-3 grid-rows-3  lg:grid-cols-4 grid-rows-4 xl:grid-cols-5 grid-rows-5' : void 0}`}>
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
                    currentMediaSet.map(((audio, index) =>
                            <div className={'w-full bg-blue-500 text-white flex items-center mb-5'} key={index}>
                                {audio.name}
                            </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Media;
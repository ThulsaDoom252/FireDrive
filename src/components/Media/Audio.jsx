import React from 'react';
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
import {useContext} from "react";
import {AudioPlayerContext} from "../../context/AudioPlayerContext";
import {truncate} from "../../common/commonData";
import MediaOptions from "../common/mediaOptions";
import MediaName from "./MediaName";

const Audio = ({
                   name,
                   oldName,
                   url,
                   searchMode,
                   audioIndex = 0,
                   index = 0,
                   hoveredMediaIndex,
                   setHoveredMediaIndex
               }) => {

    const audioContext = useContext(AudioPlayerContext)

    const {
        currentTrackName,
        handleSetCurrentAudioIndex,
        isCurrentTrackPlaying,
    } = audioContext

    const isTrackFromTheListPlaying = isCurrentTrackPlaying && currentTrackName === name

    const currentTrackPlaying = currentTrackName === name
    const currentTrackHovered = hoveredMediaIndex === audioIndex

    return (
        <div
            className={`${currentTrackPlaying || currentTrackHovered ? 'bg-yellow-600' : 'bg-blue-500'} -full  h-40  text-white flex items-center mb-5  relative rounded flex`}
            onMouseEnter={() => setHoveredMediaIndex(audioIndex)}
            onMouseLeave={() => setHoveredMediaIndex(null)}
        >
            <div>
                <div className={'w-10 text-xl h-full flex justify-center items-center hover:cursor-pointer'}
                     onClick={() => handleSetCurrentAudioIndex({index: audioIndex})}>
                    {isTrackFromTheListPlaying ? <AiFillPauseCircle/> : <AiFillPlayCircle/>}
                </div>
            </div>
            <MediaName textColor={'black'} {...{name, oldName}}/>
            <div className={'absolute top-0 right-0 z-50'}><MediaOptions {...{name, url, index, searchMode}}/></div>
        </div>
    );
};


export default Audio;


//
// import React from 'react';
// import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";
// import {useContext} from "react";
// import {AudioPlayerContext} from "../../context/AudioPlayerContext";
// import {truncate} from "../../common/commonData";
// import MediaOptions from "../common/mediaOptions";
//
// const Audio = ({name, url, searchMode, audioIndex = 0, index = 0, hoveredMediaIndex, setHoveredMediaIndex}) => {
//     //
//     // const audioContext = useContext(AudioPlayerContext)
//     //
//     // const {
//     //     currentAudioIndex,
//     //     handleSetCurrentAudioIndex,
//     //     isCurrentTrackPlaying,
//     //     playCurrentTrack,
//     //     handleSeekBarChange,
//     //     handleTimeUpdate,
//     //     audioRef,
//     //     currentAudioDuration,
//     //     totalAudioDuration,
//     //     currentTrackNameInStorage,
//     //     currentTrack,
//     // } = audioContext
//     //
//     //
//     // const isTrackFromTheListPlaying = isCurrentTrackPlaying && currentTrack.name === name
//     // const isTrackFromTheListNotPlaying = !isCurrentTrackPlaying && currentTrack.name === name
//     //
//     // const audioRelay = (audioIndex) => {
//     //     if (isTrackFromTheListPlaying || isTrackFromTheListNotPlaying) {
//     //         playCurrentTrack()
//     //     } else if (!isTrackFromTheListPlaying || isTrackFromTheListNotPlaying) {
//     //         handleSetCurrentAudioIndex(audioIndex)
//     //     }
//     // }
//     //
//     // const currentTrackPlaying = currentTrackNameInStorage === name
//     // const currentTrackHovered = hoveredMediaIndex === audioIndex
//
//     return (
//         <div>Nema</div>
//         // <div
//         //     className={`${currentTrackPlaying || currentTrackHovered ? 'bg-yellow-600' : 'bg-blue-500'} -full  h-40  text-white flex items-center mb-5  relative rounded flex`}
//         //     onMouseEnter={() => setHoveredMediaIndex(audioIndex)}
//         //     onMouseLeave={() => setHoveredMediaIndex(null)}
//         // >
//         //     <div>
//         //         <div className={'w-10 text-xl h-full flex justify-center items-center hover:cursor-pointer'}
//         //              onClick={() => audioRelay(audioIndex)}>
//         //             {isTrackFromTheListPlaying ? <AiFillPauseCircle/> : <AiFillPlayCircle/>}
//         //         </div>
//         //     </div>
//         //     <div className={'w-full flex flex-col'}>
//         //         <p>{name}</p>
//         //         {/*{currentTrackPlaying && (*/}
//         //         {/*    <div className="relative w-full">*/}
//         //         {/*        <input*/}
//         //         {/*            className="absolute bottom-1 left-0 w-full h-full"*/}
//         //         {/*            type="range"*/}
//         //         {/*            min="0"*/}
//         //         {/*            max={totalAudioDuration}*/}
//         //         {/*            value={currentAudioDuration}*/}
//         //         {/*            onChange={handleSeekBarChange}*/}
//         //         {/*        />*/}
//         //         {/*        <div className="h-2 overflow-hidden ">*/}
//         //         {/*        </div>*/}
//         //         {/*    </div>*/}
//         //         {/*)}*/}
//         //
//         //     </div>
//         //     <div className={'absolute top-0 right-0 z-50'}><MediaOptions {...{name, url, index, searchMode}}/></div>
//         //     {/*<audio ref={audioRef} onTimeUpdate={handleTimeUpdate}/>*/}
//         // </div>
//     );
// };
//
//
// export default Audio;
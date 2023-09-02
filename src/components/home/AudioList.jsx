import React from 'react';
import {MdLibraryMusic} from "react-icons/md";
import {PiMusicNotesFill} from "react-icons/pi";
import {truncate} from "../../common/commonData";
import {ClipLoader} from "react-spinners";

const AudioList = ({audioSet, currentTheme, fetchAudio}) => {
    return (

        <div className={`
                    p-3
                    mb-20
                    flex
                    justify-between
                    w-full
                    rounded
                    bg-opacity-70
                    h-homeItemBlock
                    hover:cursor-pointer
                    z-1
                    ${currentTheme.color}
                    ${currentTheme.primeBg}
                      hover:brightness-110 
                    transition duration-300 ease-in-out
                    
                    `}>
            <div className={`
                        h-full
                        flex
                        items-center
                        `}>
                <MdLibraryMusic size={40}/>
            </div>
            <div className={`
                        h-full
                        w-full 
                        flex 
                        justify-center
                        items-center
                        `}>
                {fetchAudio ? <ClipLoader size={50}
                                          color={currentTheme.color}/> : audioSet.length !== 0 ? audioSet.map((audio, index) =>
                        index <= 8 && <div className={`
                    flex
                    h-full
                    max-w-audioListItem
                    m-1
                    flex-col
                    justify-center
                    items-center
                    ${currentTheme.secBg}
                    bg-opacity-50
                    rounded
                    `}>
                            <PiMusicNotesFill size={25}/>
                            <div className={'text-center text-sm'}>
                                {truncate(audio.name, 10)}
                            </div>
                        </div>
                ) : <div>No audio...</div>}


            </div>
            <div className='
                      flex
                      flex-col
                      justify-center
                      items-center
                      '>
                <div>Total:</div>
                {audioSet.length}
            </div>
        </div>
    );
};

export default AudioList;
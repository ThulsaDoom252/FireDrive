import React from 'react';
import {FiPlay, FiSkipBack, FiSkipForward} from "react-icons/fi";
import SeekBar from "./SeekBar";

const AudioPlayerDisabled = () => {
    return (
        <div
            className={`w-full h-full flex flex-col justify-between`}>
            <div className={`w-full flex items-center justify-between`}>
                <button className="text-2xl  text-gray-500 " disabled={true}>
                    <FiSkipBack/>
                </button>
                <button disabled={true} className="text-4xl text-gray-500">
                    <FiPlay/>
                </button>
                <button className="text-2xl text-gray-500" disabled={true}>
                    <FiSkipForward/>
                </button>
            </div>
            <div className={'mx-auto'}>
                00/00
            </div>
            <div>
                <SeekBar disabled={true}/>
            </div>
        </div>
    );
};

export default AudioPlayerDisabled;
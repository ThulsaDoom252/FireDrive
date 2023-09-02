import React from 'react';
import {FiPlay, FiSkipBack, FiSkipForward} from "react-icons/fi";
import DurationSeekBar from "./DurationSeekBar";

const AudioPlayerDisabled = ({buttonsSize, smallScreenMode}) => {
    return (
        <div
            className={`${!smallScreenMode ? 'rounded' : void 0} w-full h-playerHeight flex justify-center items-center `}>
            <div className={'w-player-controls flex flex-col justify-between items-center'}>
                <div className={'w-full'} hidden={!smallScreenMode}>
                    <DurationSeekBar disabled={true}/>
                </div>
                <div className={`w-full  flex items-center justify-between`}>
                    <div className={'w-40 flex items-center justify-between'}>
                        <button
                            className={`
                            hover:bg-blue-400   
                            flex justify-center 
                            items-center 
                            w-20 rounded 
                            transition 
                            text-2xl 
                              disabled:text-gray-500
                              `}
                            disabled={true}
                        >
                            <FiSkipBack size={buttonsSize}/>
                        </button>
                        <button disabled={true}
                                className={`
                                 text-center 
                                w-20  
                                flex justify-center 
                                items-center 
                                hover:bg-blue-400  
                                rounded 
                                text-4xl    
                                disabled:text-gray-500                       
                               `}>
                            <FiPlay size={buttonsSize}/>
                        </button>
                        <button
                            className={`
                                 text-center 
                                w-20  
                                flex justify-center 
                                items-center 
                                hover:bg-blue-400  
                                rounded 
                                text-4xl    
                                disabled:text-gray-500                  
                               `}
                            disabled={true}>
                            <FiSkipForward size={buttonsSize}/>
                        </button>
                    </div>
                    <div
                        style={{fontFamily: 'cursive'}}
                        className={'font-sans'}>
                        No music...no life
                    </div>

                    <div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default AudioPlayerDisabled;
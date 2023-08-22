import React from 'react';
import {FiPlay, FiSkipBack, FiSkipForward} from "react-icons/fi";
import {LuRepeat} from "react-icons/lu";
import {ImVolumeHigh} from "react-icons/im";
import SeekBar from "./SeekBar";

const AudioPlayerDisabled = ({buttonsSize, smallScreenMode}) => {
    return (
        <div
            className={`${!smallScreenMode ? 'rounded' : void 0} w-full h-playerHeight flex justify-center items-center `}>
            <div className={'w-player-controls flex flex-col justify-between items-center'}>
                <div className={'w-full'} hidden={!smallScreenMode}>
                    <SeekBar disabled={true}/>
                </div>
                <div className={`w-full  flex items-center justify-between`}>
                    <div className={'flex items-center justify-between'}>
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
                    <div hidden={smallScreenMode}>
                        <SeekBar disabled={true}/>
                    </div>
                    <div>
                        <div className={'w-20 flex justify-between mr-10 relative'}>
                            <button className={`
                                hover:bg-blue-400 
                                rounded
                                disabled:text-gray-400
                            
                                 `}
                                    disabled={true}
                            >
                                <LuRepeat size={20}/>
                            </button>
                            <div>
                                <button className={`
                                disabled:text-gray-400`}
                                        disabled={true}
                                >
                                    <ImVolumeHigh size={20}/>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default AudioPlayerDisabled;
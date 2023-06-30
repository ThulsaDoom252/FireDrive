import React from 'react';
import {BsMusicPlayer} from "react-icons/bs";
import {SiApplemusic, SiMusicbrainz, SiYoutubemusic} from "react-icons/si";
import {AiFillPlayCircle} from "react-icons/ai";

const Audio = ({audioName, key = null}) => {
    return (
        <div className={'w-full bg-blue-500 h-10 text-white flex items-center mb-5 rounded'} key={key}>
            <div className={'w-10 text-xl h-full flex justify-center items-center '}><AiFillPlayCircle/></div>
            <p>{audioName}</p>
        </div>
    );
};

export default Audio;
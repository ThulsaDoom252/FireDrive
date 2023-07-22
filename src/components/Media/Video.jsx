import React from 'react';
import ReactPlayer from "react-player";
import {truncate} from "../../common/commonData";
import MediaOptions from "../common/mediaOptions";
import MediaName from "./MediaName";

const Video = ({url, name, oldName, searchMode, index}) => {
    return (
        <>
            <div className={'absolute top-0 right-0 z-50'}><MediaOptions {...{name, url, index, searchMode}}/></div>
            <div className="player-container  h-200 bg-black rounded-lg overflow-hidden">
                <ReactPlayer
                    url={url}
                    width="100%"
                    height="100%"
                />
            </div>
            <MediaName {...{name, oldName}}/>
        </>

    )
        ;
};

export default Video;
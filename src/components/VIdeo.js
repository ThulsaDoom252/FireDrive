import React from 'react';
import {testVideos} from "../data/sourceFiles";

function Video() {
    return (
        <section className='videos'>
            {testVideos.map(file => <video className='video' width="320" height="240" controls>
                <source src={file.video} type="video/mp4"/>
            </video>)}
        </section>
    );
}

export default Video;
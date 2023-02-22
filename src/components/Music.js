import React from 'react';
import {testMusic} from "../data/sourceFiles";

function Music() {
    return (
        <section className='music-container'>
            {testMusic.map(file => <audio className='music' controls>
                <source src={file.music} type="audio/ogg"/>
            </audio>)}
        </section>
    );
}

export default Music;
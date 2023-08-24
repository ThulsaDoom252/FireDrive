import React from 'react';
import {connect, useSelector} from "react-redux";
import ImagesList from "./ImagesList";
import AudioList from "./AudioList";
import VideosList from "./VideosList";
import {NavLink} from "react-router-dom";
import {audioRoute, imagesRoute, videosRoute} from "../../common/commonData";

const Home = ({fetchImages, fetchVideos, fetchAudio, currentTheme}) => {

    const imagesSet = useSelector(state => state.media.imagesSet)
    const videosSet = useSelector(state => state.media.videosSet)
    const audioSet = useSelector(state => state.media.audioSet)

    const navClassNames =
        `  no-underline
        w-90%
            z-1`


    return (
        <section>
            <div className={`
            max-w-homeItemBlock
            mx-auto 
            h-screen
             flex 
             flex-col
             justify-center 
             items-center`}>
                <div className={`
                w-100% 
                h-90% 
                flex 
                flex-col 
                justify-center 
                items-center
                `}>
                    <NavLink to={imagesRoute}
                             className={navClassNames}>
                        <ImagesList {...{imagesSet, currentTheme, fetchImages}}/>
                    </NavLink>
                    <NavLink to={videosRoute}
                             className={navClassNames}
                    >
                        <VideosList {...{videosSet, currentTheme, fetchVideos}}/>
                    </NavLink>
                    <NavLink
                        to={audioRoute}
                        className={navClassNames}
                    >
                        <AudioList {...{audioSet, currentTheme, fetchAudio}}/>
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        imagesSet: state.media.imagesSet,
        videoSet: state.media.videosSet,
        audioSet: state.media.audioSet,
        fetchImages: state.media.fetchImages,
        fetchVideos: state.media.fetchVideos,
        fetchAudio: state.media.fetchAudio,
    }
}

export default connect(mapStateToProps, null)(Home);
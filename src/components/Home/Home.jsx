import React from 'react';
import {connect, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {audioRoute, images, imagesRoute, videos, videosRoute, audio} from "../../common/commonData";
import HomeMediaListBlock from "./HomeMediaListBlock";

const Home = ({fetchImages, fetchVideos, fetchAudio, currentTheme, smallScreen}) => {

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
                        <HomeMediaListBlock
                            fetchItems={fetchImages}
                            currentTheme={currentTheme}
                            smallScreen={smallScreen}
                            itemType={images}
                            itemsList={imagesSet}/>
                    </NavLink>
                    <NavLink to={videosRoute}
                             className={navClassNames}
                    >
                        <HomeMediaListBlock
                            fetchItems={fetchVideos}
                            currentTheme={currentTheme}
                            smallScreen={smallScreen}
                            itemType={videos}
                            itemsList={videosSet}/>
                    </NavLink>
                    <NavLink
                        to={audioRoute}
                        className={navClassNames}
                    >
                        <HomeMediaListBlock
                            fetchItems={fetchAudio}
                            currentTheme={currentTheme}
                            smallScreen={smallScreen}
                            itemType={audio}
                            itemsList={audioSet}/>
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
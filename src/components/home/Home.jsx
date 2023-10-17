import React from 'react';
import {connect, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {audioRoute, images, imagesRoute, videos, videosRoute, audio} from "../../common/commonData";
import HomeMediaListBlock from "./HomeMediaListBlock";

const Home = ({fetchImages, fetchVideos, fetchAudio, currentTheme, smallScreen}) => {

    const imagesSet = useSelector(state => state.media.imagesSet)
    const videosSet = useSelector(state => state.media.videosSet)
    const audioSet = useSelector(state => state.media.audioSet)

    const navClassNames = `  no-underline w-90%z-1`

    const itemsBlocks = [
        {type: images, path: imagesRoute, fetch: fetchImages, itemsList: imagesSet},
        {type: videos, path: videosRoute, fetch: fetchVideos, itemsList: videosSet},
        {type: audio, path: audioRoute, fetch: fetchAudio, itemsList: audioSet},
    ]

    return (
        <section>
            <div className={`
            container
            mx-auto 
            h-screen
             flex 
             flex-col
             justify-center 
             items-center`}>
                {itemsBlocks.map((block, index) =>
                    <NavLink key={index} to={block.path} className={navClassNames}>
                        <HomeMediaListBlock
                            fetchItems={block.fetch}
                            smallScreen={smallScreen}
                            currentTheme={currentTheme}
                            itemType={block.type}
                            itemsList={block.itemsList}/>
                    </NavLink>
                )}
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
import React, {useContext} from 'react';
import {ClockLoader} from "react-spinners";
import {connect} from "react-redux";
import {PagesContext} from "../context/PagesContext";
import {Link} from "react-router-dom";
import {audioRoute, imagesRoute, videosRoute} from "../common/commonData";

const Home = ({imagesSet, videoSet, audioSet, fetchImages, fetchVideos, fetchAudio}) => {

    const pages = useContext(PagesContext)

    return (
        <section
            className={`h-full flex justify-center items-center flex-col`}>
            {/*<div>TOTAL: {Math.ceil(imagesSet.length + videoSet.length + audioSet.length)}</div>*/}
            <div className={'w-200 navbar-xs:w-300 header-xs:w-400 flex flex-col items-center'}>
                <Link
                    to={imagesRoute}
                    className={'w-full rounded mb-20 text-white bg-orange-600 h-30 flex justify-center items-center no-underline'}
                >
                    {fetchImages ? <ClockLoader color={'blue'} size={50}/> :
                        <p className={'text-xl'}>Images: {imagesSet.length}</p>}
                </Link>
                <Link to={videosRoute}
                      className={'w-full rounded mb-20 text-white bg-orange-600 h-30 flex justify-center items-center  no-underline'}>
                    {fetchVideos ? <ClockLoader color={'blue'} size={50}/> :
                        <p className={'text-xl'}>Videos: {videoSet.length}</p>}
                </Link>
                <Link to={audioRoute}
                      className={'w-full  rounded  mb-20 text-white bg-orange-600 h-30 flex justify-center items-center  no-underline'}>
                    {fetchAudio ? <ClockLoader color={'blue'} size={50}/> :
                        <p className={'text-xl'}>Audio: {audioSet.length}</p>}
                </Link>
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
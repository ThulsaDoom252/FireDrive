import React from 'react';
import {ClockLoader} from "react-spinners";
import {connect} from "react-redux";

const Home = ({imagesSet, videoSet, audioSet, fetchImages, fetchVideos, fetchAudio}) => {
    return (
        <section
            className={`bg-amber-300  h-full flex justify-center items-center flex-col`}>
            {/*<div>TOTAL: {Math.ceil(imagesSet.length + videoSet.length + audioSet.length)}</div>*/}
            <div className={'w-200 navbar-xs:w-300 header-xs:w-400 flex flex-col items-center'}>
                <div className={'w-full rounded mb-20 text-white bg-orange-600 h-30 flex justify-center items-center'}>
                    {fetchImages ? <ClockLoader color={'blue'} size={50}/> :
                        <p className={'text-xl'}>Images: {imagesSet.length}</p>}
                </div>
                <div className={'w-full rounded mb-20 text-white bg-orange-600 h-30 flex justify-center items-center'}>
                    {fetchVideos ? <ClockLoader color={'blue'} size={50}/> :
                        <p className={'text-xl'}>Videos: {videoSet.length}</p>}
                </div>
                <div
                    className={'w-full  rounded  mb-20 text-white bg-orange-600 h-30 flex justify-center items-center'}>
                    {fetchAudio ? <ClockLoader color={'blue'} size={50}/> :
                        <p className={'text-xl'}>Audio: {audioSet.length}</p>}
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
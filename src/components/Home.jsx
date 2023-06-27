import React from 'react';
import {ClockLoader} from "react-spinners";
import {connect} from "react-redux";

const Home = ({imagesSet, videoSet, audioSet, fetchImages, fetchVideos, fetchAudio}) => {
    return (
        <section
            className={`min-h-screen bg-amber-300  flex justify-center items-center flex-col`}>
            {/*<div>TOTAL: {Math.ceil(imagesSet.length + videoSet.length + audioSet.length)}</div>*/}
            <div className={'flex flex-col items-center'}>
                <div className={' rounded w-300  mb-20 text-white bg-orange-600 h-30 flex justify-center items-center'}>
                    {fetchImages ? <ClockLoader color={'blue'} size={50}/> :
                        <p className={'text-xl'}>Images: {imagesSet.length}</p>}
                </div>
                <div className={' rounded w-300  mb-20 text-white bg-orange-600 h-30 flex justify-center items-center'}>
                    {fetchVideos ? <ClockLoader color={'blue'} size={50}/> :
                        <p className={'text-xl'}>Videos: {videoSet.length}</p>}
                </div>
                <div className={' rounded w-300  mb-20 text-white bg-orange-600 h-30 flex justify-center items-center'}>
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
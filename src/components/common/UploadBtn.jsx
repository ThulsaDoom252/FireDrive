import React from 'react';
import {audioFiles, audioRoute, imageFiles, imagesRoute, videoFiles, videosRoute} from "../../common/commonData";
import {HiOutlinePlus} from "react-icons/hi";
import {connect} from "react-redux";
import {uploadMedia} from "../../redux/mediaSlice";

const UploadBtn = ({currentRoute, uploadMedia, smallScreen, mediaLoading}) => {
    const imagesPage = currentRoute === imagesRoute
    const videosPage = currentRoute === videosRoute
    const audioPage = currentRoute === audioRoute
    const inputBtnRef = React.useRef(null)
    const handleUploadBtnClick = () => inputBtnRef.current.click()
    return (
        <>
            <input
                ref={inputBtnRef}
                accept={imagesPage ? imageFiles : videosPage ? videoFiles :
                    audioPage ? audioFiles : ''}
                hidden={true}
                type={"file"}
                onChange={e => uploadMedia({event: e, currentRoute, userName: 'ThulsaDoom'})}
                multiple/>
            <button
                type="button"
                disabled={mediaLoading}
                onClick={handleUploadBtnClick}
                className={'bg-purple-500 mr-5 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'}
            >
                {smallScreen ? < HiOutlinePlus/> : 'Add media'}

            </button>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute,
        smallScreen: state.app.smallScreen,
        mediaLoading: state.media.mediaLoading,
    }

}

export default connect(mapStateToProps, {uploadMedia})(UploadBtn);
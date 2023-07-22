import React, {useContext} from 'react';
import {
    audioFiles,
    imageFiles,
    videoFiles,
} from "../../common/commonData";
import {HiOutlinePlus} from "react-icons/hi";
import {connect} from "react-redux";
import {uploadMedia} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";

const UploadBtn = ({uploadMedia, smallScreen, mediaLoading, isFullWidth = true, username}) => {
    const pages = useContext(PagesContext)
    const {
        rootPage,
        imagesPage,
        videosPage,
        audioPage,
    } = pages

    const inputBtnRef = React.useRef(null)
    const handleUploadBtnClick = () => inputBtnRef.current.click()

    const isDisabled = rootPage || mediaLoading

    return (
        <>
            <>
                <input
                    ref={inputBtnRef}
                    accept={imagesPage ? imageFiles : videosPage ? videoFiles :
                        audioPage ? audioFiles : ''}
                    hidden={true}
                    type={"file"}
                    onChange={e => uploadMedia({event: e})}
                    multiple/>
                <button
                    type="button"
                    disabled={isDisabled}
                    onClick={handleUploadBtnClick}
                    className={`${isFullWidth && 'w-full'} bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {smallScreen ? < HiOutlinePlus/> : 'Add media'}

                </button>
            </>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
        mediaLoading: state.media.mediaLoading,
        username: state.auth.username,
    }

}

export default connect(mapStateToProps, {uploadMedia})(UploadBtn);
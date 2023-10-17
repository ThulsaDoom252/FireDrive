import React, {useContext, useRef} from 'react';
import {connect} from "react-redux";
import {uploadMedia} from "../../redux/mediaSlice";
import {audioFiles, imageFiles, videoFiles} from "../../common/commonData";
import {PagesContext} from "../../context/PagesContext";
import {HiOutlinePlus} from "react-icons/hi";
import ThemeBtn from "../../common/ThemeBtn";

const UploadBtnContainer = ({smallScreen, mediaLoading, uploadMedia}) => {
    const inputBtnRef = useRef(null)
    const pages = useContext(PagesContext)
    const {
        rootPage,
        imagesPage,
        videosPage,
        audioPage,
    } = pages

    const handleClick = () => inputBtnRef.current.click()

    return (
        <>
            <input
                ref={inputBtnRef}
                accept={imagesPage ? imageFiles : videosPage ? videoFiles :
                    audioPage ? audioFiles : ''}
                hidden={true}
                type={"file"}
                onChange={e => uploadMedia({event: e})}
                multiple/>
            <ThemeBtn
                fullWidth
                disabled={rootPage || mediaLoading}
                onClick={handleClick}>
                {smallScreen ? < HiOutlinePlus/> : 'Add media'}</ThemeBtn>
        </>
    )


};


const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
        mediaLoading: state.media.mediaLoading,
    }

}

export default connect(mapStateToProps, {uploadMedia})(UploadBtnContainer);
import React, {useContext, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {uploadMedia} from "../../../redux/mediaSlice";
import {audioFiles, burgerMenuIconSize, imageFiles, videoFiles} from "../../../common/common";
import {PagesContext} from "../../../context/PagesContext";
import {HiOutlinePlus} from "react-icons/hi";
import ThemeBtn from "../../common/theme/ThemeBtn";

const UploadBtnContainer = ({iconSize = burgerMenuIconSize}) => {
    const inputBtnRef = useRef(null)
    const pages = useContext(PagesContext)
    const {
        rootPage,
        imagesPage,
        videosPage,
        audioPage,
    } = pages

    const dispatch = useDispatch()
    const smallScreen = useSelector(state => state.app.smallScreen)
    const mediaLoading = useSelector(state => state.media.mediaLoading,)

    const handleClick = () => inputBtnRef.current.click()

    return (
        <>
            <input
                ref={inputBtnRef}
                accept={imagesPage ? imageFiles : videosPage ? videoFiles :
                    audioPage ? audioFiles : ''}
                hidden={true}
                type={"file"}
                onChange={e => dispatch(uploadMedia({event: e}))}
                multiple/>
            <ThemeBtn
                fullWidth
                disabled={rootPage || mediaLoading}
                onClick={handleClick}>
                {smallScreen ? < HiOutlinePlus size={iconSize}/> : 'Add media'}</ThemeBtn>
        </>
    )
};

export default UploadBtnContainer;
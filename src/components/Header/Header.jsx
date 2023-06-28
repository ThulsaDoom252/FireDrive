import React from 'react';
import {NavLink} from "react-router-dom";
import {
    audioFiles,
    audioRoute, imageFiles,
    imagesRoute,
    rootRoute, videoFiles,
    videosRoute
} from "../../common/commonData";
import {GoTrash} from "react-icons/go";
import {HiOutlinePlus} from "react-icons/hi";

const Header = ({
                    handleUploadMedia,
                    handleUploadBtnClick,
                    hiddenFileInput,
                    pages,
                    smallScreen,
                    handleDeleteAllMedia,
                    noCurrentMedia,
                    mediaLoading,
                    mediaDeleting,
                }) => {
    const [imagesPage, videosPage, audioPage] = pages
    return (
        <header
            className={'flex justify-between h-16 pr-10 pl-10 bg-gradient-to-r from-sky-500 to-indigo-500 items-center'}>
            <div className='flex justify-between w-10 '>
                <NavLink to={rootRoute}
                         className={navData => navData.isActive ? 'text-white mr-5' : 'mr-5'}>Home</NavLink>
                <NavLink to={imagesRoute}
                         className={navData => navData.isActive ? 'text-white mr-5' : 'mr-5'}>Images</NavLink>
                <NavLink to={videosRoute}
                         className={navData => navData.isActive ? 'text-white mr-5' : 'mr-5'}>Videos</NavLink>
                <NavLink to={audioRoute}
                         className={navData => navData.isActive ? 'text-white mr-5' : 'mr-5'}>Audio</NavLink>
            </div>
            <div>
                <input
                    ref={hiddenFileInput}
                    accept={imagesPage ? imageFiles : videosPage ? videoFiles :
                        audioPage ? audioFiles : ''}
                    hidden={true}
                    type={"file"}
                    onChange={e => handleUploadMedia(e)}
                    multiple/>
                <button
                    type="button"
                    disabled={mediaLoading}
                    onClick={handleUploadBtnClick}
                    className={'bg-purple-500 mr-5 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'}
                >
                    {smallScreen ? < HiOutlinePlus/> : 'Add media'}

                </button>
                <button
                    type="button"
                    disabled={noCurrentMedia || mediaLoading || mediaDeleting}
                    onClick={handleDeleteAllMedia}
                    className={'bg-purple-500 mr-5 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'}
                >
                    {smallScreen ? < GoTrash/> : 'Remove all media'}
                </button>
            </div>
        </header>
    );
};

export default Header;
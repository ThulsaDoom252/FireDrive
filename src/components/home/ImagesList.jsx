import React from 'react';
import {FaImages} from "react-icons/fa";
import {ClipLoader} from "react-spinners";

const ImagesList = ({imagesSet, currentTheme, fetchImages}) => {
    return (

        <div className={`
                    p-3
                    mb-20
                    flex
                    justify-between
                    w-full
                    rounded
                    bg-opacity-70
                    h-homeItemBlock
                    hover:cursor-pointer
                    z-1
                    ${currentTheme.color}
                    ${currentTheme.primeBg}
                    hover:brightness-110 
                    hover:p-4
                    transition-all duration-300 ease-in-out 
                    `}>
            <div className={`
                        h-full
                        flex
                        items-center
                        `}>
                <FaImages size={40}/>
            </div>
            <div className={`
                        h-90%
                        w-full
                        flex 
                        justify-center
                        items-center
                        `}>
                {fetchImages ? <ClipLoader size={50}
                                           color={currentTheme.color}/>
                    : imagesSet.length !== 0 ? imagesSet.map((image, index) =>
                                index <= 8 && <div className={`
                        m-2
                        h-full
                        max-w-imageListItem
                        `}>
                                    <img
                                        className={`
                                     rounded
                                     object-cover
                                     max-w-full
                                     h-full               
                                `}
                                        src={image.url}
                                        alt={'broken'}/>
                                </div>
                        )
                        : 'No images...'}


            </div>
            <div className='
                      flex
                      flex-col
                      justify-center
                      items-center
                      '>
                <div>Total:</div>
                {imagesSet.length}

            </div>
        </div>
    );
};

export default ImagesList;
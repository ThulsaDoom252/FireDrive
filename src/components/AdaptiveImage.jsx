import React from 'react';

const AdaptiveImage = ({url, alt = 'image is broken', onClick = () => void 0}) => {
    return (
        <div onClick={onClick} className={'w-fit p-2 relative flex justify-center items-center'}>
            <img
                style={{height: '85px'}}
                className='
            rounded
            object-cover
            hover:cursor-pointer
             transition-all
             duration-300
             '
                 src={url}
                 alt={alt}/>
        </div>
    );
};

export default AdaptiveImage;
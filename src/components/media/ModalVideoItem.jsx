import React from 'react';
import ReactPlayer from "react-player";
import {ClipLoader} from "react-spinners";
import {Skeleton} from "@mui/material";

const ModalVideoItem = ({
                            item,
                            index,
                            onClick,
                            currentModalItemUrl,
                            info,
                            column = false,
                            listedVideoProps,
                        }) => {


    const [
        listedVideoInModalRef,
        listedVideoHoveredIndex,
        listedVideoTotalTime,
        isListedVideoReady,
        handleListedVideoMouseEnter,
        handleListedVideoMouseLeave,
        handleReadyListedVideo,
    ] = listedVideoProps

    const shouldPreviewPlay = index === listedVideoHoveredIndex

    window.s1 = index
    window.s2 = listedVideoHoveredIndex


    return (
        <div key={index} className={`
        w-80% 
        h-32 
        mt-3 
        mb-3  
        rounded 
        flex 
        justify-center 
        ${info === 'center' ? 'items-center' : 'items-start'}
        ${column && 'flex-col'}
        `}>
            <div
                onClick={() => onClick(index)}
                onMouseEnter={() => handleListedVideoMouseEnter(index)}
                onMouseLeave={handleListedVideoMouseLeave}
                className={` relative w-full h-full  bg-black rounded ${item.url === currentModalItemUrl && 'border-4 border-amber-300'} flex items-center justify-center cursor-pointer`}>
                {!isListedVideoReady && <div className={'absolute inset-0 flex items-center justify-center'}>
                    <ClipLoader size={50} color={'white'}/>
                </div>}
                <ReactPlayer onReady={handleReadyListedVideo}
                             volume={0}
                             playing={shouldPreviewPlay}
                             ref={listedVideoInModalRef} url={item?.url || ''} height={'98%'}
                             width={'98%'}/>
                <div
                    className='absolute bottom-0 left-2 text-white'>{isListedVideoReady && listedVideoTotalTime}</div>
            </div>
            <div className={`
            text-white
            w-full 
            text-center
            ${info !== 'center' && 'mt-3'}
            
            `}>{isListedVideoReady ? item.name :
                <Skeleton animation={'wave'} variant="rectangular" style={{width: '100%'}} height={10}/>}</div>
        </div>
    );
};

export default ModalVideoItem;
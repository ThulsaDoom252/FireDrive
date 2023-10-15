import React, {useRef} from 'react';
import ReactPlayer from "react-player";
import {ClipLoader} from "react-spinners";
import {Skeleton} from "@mui/material";

const ModalVideoItem = ({
                            item,
                            index,
                            onClick,
                            currentModalItemUrl,
                            column = false,
                            listedVideoProps,
                            currentModalItemIndex,
                            smallScreen,
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

    const hideCurrentItem = smallScreen && currentModalItemIndex === index

    return (
        <div
            hidden={hideCurrentItem}
            key={index}
            className={`
        mt-3 
        mb-3  
        rounded 
        flex
        ${column ? 'flex-col w-full justify-center' : 'w-80% justify-between'}
        ${smallScreen ? 'h-52' : 'h-32 bg-black pr-2'}
                         ${item.url === currentModalItemUrl && 'border-4 border-amber-300'} 

        `}>

            {/*//Player container*/}
            <div
                onClick={() => onClick(index)}
                onMouseEnter={() => handleListedVideoMouseEnter(index)}
                onMouseLeave={handleListedVideoMouseLeave}
                className={` 
                relative 
                w-full 
                h-full 
                 bg-black 
                 rounded 
                 flex 
                 items-center 
                 justify-center 
                 cursor-pointer
                
                 `
                }>
                {/*//Spinner*/}
                {!isListedVideoReady && <div className='
                absolute
                inset-0
                flex
                items-center
                justify-center'>
                    <ClipLoader size={50} color={'white'}/>
                </div>}
                {/*//Player*/}
                <ReactPlayer onReady={handleReadyListedVideo}
                             volume={0}
                             playing={shouldPreviewPlay}
                             ref={listedVideoInModalRef} url={item?.url || ''} height={'98%'}
                             width={'98%'}/>
                {/*//Duration*/}
                <div
                    className='
                    absolute
                    bottom-0
                    left-2
                    text-white
                    '>{isListedVideoReady && listedVideoTotalTime}</div>
            </div>
            {/*//Video item name*/}
            <div className={`
            text-white            
            h-full
            break-words
            relative
            ${smallScreen ? 'w-full' : 'w-1/3'}
            text-center
            `}>{isListedVideoReady ? item.name :
                <Skeleton animation={'wave'} variant="rectangular" style={{width: '100%'}} height={10}/>}</div>
        </div>
    );
};

export default ModalVideoItem;
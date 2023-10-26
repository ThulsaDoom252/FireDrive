import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {ClipLoader} from "react-spinners";
import {formatTime, truncate} from '../../common/common';

const ModalVideoItem = ({
                            item,
                            index,
                            onClick,
                            currentModalItemUrl,
                            column = false,
                            currentModalItemIndex,
                            smallScreen,
                        }) => {

    const hideCurrentItem = smallScreen && (currentModalItemIndex === index)
    const listedVideoModalRef = useRef(null)
    const [listedVideoHoveredIndex, setListedVideoHoveredIndex] = useState(null)
    const [listedVideoState, setListedVideoState] = useState({
        totalTime: null,
        isPlaying: false,
        isReady: false,
        initialPreviewTime: null,
    })

    const handleListedVideoMouseEnter = () => setListedVideoHoveredIndex(index)

    const handleListedVideoMouseLeave = () => setListedVideoHoveredIndex(null)


    const {totalTime, isPlaying, isReady, initialPreviewTime,} = listedVideoState

    const handleInitialPlayerState = useCallback(() => {
        const totalTimeValue = listedVideoModalRef.current.getDuration()
        const initialPreviewTimeValue = totalTimeValue / 10
        listedVideoModalRef.current.seekTo(initialPreviewTimeValue)
        setListedVideoState(prevState => ({
            ...prevState, totalTime: totalTimeValue,
            initialPreviewTime: initialPreviewTimeValue
        }))

    }, [listedVideoModalRef])

    useEffect(() => {
        if (isReady) {
            handleInitialPlayerState()
        }

    }, [isReady, handleInitialPlayerState]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (listedVideoHoveredIndex === index) {
                handleVideoPlay(true)
            }
        }, 800);

        (listedVideoHoveredIndex !== index) && isPlaying && handleVideoPlay(false)

        return () => {
            clearTimeout(timeoutId);
        };

        // eslint-disable-next-line
    }, [listedVideoHoveredIndex]);

    const handleReadyListedVideo = () => {
        setListedVideoState(prevState => ({
            ...prevState,
            isReady: true
        }))
    }

    const handleVideoPlay = (shouldPreviewPlay) => {
        shouldPreviewPlay ? listedVideoModalRef.current.seekTo(0) : listedVideoModalRef.current.seekTo(initialPreviewTime)
        setListedVideoState(prevState => ({
            ...prevState,
            isPlaying: shouldPreviewPlay,
        }))
    }

    return (
        <div
            key={index}
            className={`
            transition-all
            duration-200 
        mb-3  
        rounded 
        flex
        hover:border-4
        hover:border-amber-300
        ${hideCurrentItem && 'hidden'}
        ${column ? 'flex-col w-full justify-center' : 'w-80% justify-between'}
        ${smallScreen ? 'h-48 mt-6' : 'h-32 mt-3 bg-black pr-2'}s1
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
                {!isReady && <div className='
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
                             playing={isPlaying}
                             ref={listedVideoModalRef} url={item?.url || ''} height={'98%'}
                             width={'98%'}/>
                {/*//Duration*/}
                <div
                    className='
                    absolute
                    bottom-0
                    left-2
                    text-white
                    '>{isReady && formatTime(totalTime)}</div>
            </div>
            {/*//Video item name*/}
            <div className={`
            text-white
            p-1            
            h-full
            break-words
            relative
            ${smallScreen ? 'w-full' : 'w-1/3'}
            text-center
            `}>{isReady && truncate(item.name, 30)}</div>
        </div>
    );
};

export default ModalVideoItem;
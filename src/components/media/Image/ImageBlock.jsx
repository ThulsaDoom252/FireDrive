import React, {useEffect, useState} from 'react';
import MediaOptions from "../../options/ItemOptions";
import {Fade} from "@mui/material";
import Image from "./Image";
import {delay} from "../../../common/commonData";

const ImageBlock = ({
                        url,
                        index,
                        name,
                        oldName,
                        setHoveredMediaIndex,
                        searchMode,
                        hoveredMediaIndex,
                        setItemOptionsHovered,
                        confirm,
                        handleImageClick,
                        handleModal,
                    }) => {
    const imageIsHovered = hoveredMediaIndex === index
    const [showOptions, setIsShowOptions] = useState(false)
    const [animateOptions, setOptionsAnimation] = useState(false)

    const toggleOptionsAnimation = async (shouldAnimate) => {
        await delay(100)
        setOptionsAnimation(shouldAnimate)
    }

    useEffect(() => {
        if (imageIsHovered) {
            !animateOptions && toggleOptionsAnimation(true).then(() => void 0)
        } else {
            animateOptions && toggleOptionsAnimation(false).then(() => void 0)
        }

    }, [hoveredMediaIndex])

    return (
        <>
            {(imageIsHovered && showOptions) &&
                <Fade in={animateOptions} timeout={200}>
                    <div className={'absolute top-0 right-0 z-1'}>
                        <MediaOptions name={name}
                                      oldName={oldName}
                                      url={url}
                                      {...{
                                          index,
                                          searchMode,
                                          hoveredMediaIndex,
                                          setItemOptionsHovered,
                                          confirm,
                                          handleModal,
                                      }}/></div>
                </Fade>}
            <Image  {...{
                url,
                setIsShowOptions,
                index,
                imageIsHovered,
                handleImageClick,
            }}/>
        </>

    );
};

export default ImageBlock;


import React, {useState} from 'react';
import {ClipLoader} from "react-spinners";
import Audio from "./Audio";
import Paginator from "../paginator/Paginator";
import NoSearchResults from "../search/NoSearchResults";
import Video from "./Video";
import ImageBlock from "./Image/ImageBlock";
import {Button, Grid} from "@mui/material";
import {BsFillGridFill} from "react-icons/bs";
import first from "./layout/numbers/1.png"
import second from "./layout/numbers/2.png"
import third from "./layout/numbers/3.png"
import fourth from "./layout/numbers/4.png"
import fives from "./layout/numbers/5.png"
import sixth from "./layout/numbers/6.png"

const Media = ({
                   imagesPage,
                   videosPage,
                   audioPage,
                   currentMediaFetch,
                   mediaToShow,
                   noMedia,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   noSearchResults,
                   classes,
                   isPaginatorHidden,
                   paginatorProps,
                   searchMode,
                   smallScreen,
                   handleInitialModalIndex,
                   setItemOptionsHovered,
                   currentTheme,
                   noOpenModal,
                   confirm,
               }) => {


    // layout test
    const [layoutMenu, toggleLayoutMenu] = useState(false)
    const layoutNumbs = [
        {img: first, number: 12},
        {img: second, number: 6},
        {img: third, number: 4},
        {img: fourth, number: 3},
        {img: fives, number: 2.4},
        {img: sixth, number: 2},
        first, second, third, fourth, fives, sixth
    ]
    const [gridNumb, setGridNumb] = useState(2)

    const handleLayoutMenu = () => {
        toggleLayoutMenu(!layoutMenu)
    }

    const handleCollValue = (number) => {
        setGridNumb(number)
    }


    return (
        <section
            className={`
            mx-auto 
            h-full 
            relative 
            pt-20 
            pb-52 
            flex  
            flex-col 
            items-center 
             ${noMedia ? 'justify-center' : ''}
             ${audioPage && smallScreen ? 'w-full' : audioPage ? 'w-1/2' : !audioPage && smallScreen ? 'w-full' : 'w-full pl-10 pr-10'} 
             
             `}>
            {!audioPage && <div className={'absolute right-5 top-14 w-40 h-40'}>
                <Button size={'large'} onClick={handleLayoutMenu} className={classes.mediaNavBtn}>
                    <BsFillGridFill size={30}/>
                </Button>
                <div hidden={!layoutMenu} className={`
                        bg-white 
                        relative 
                        right-40 
                        rounded-md 
                        z-10 
                        w-80
                        h-10 
                        flex
                        justify-center`}>
                    {layoutNumbs.map((numb, index) => <img
                        onClick={() => handleCollValue(numb.number)}
                        key={index}
                        src={numb.img}
                        alt=""/>)}
                </div>
            </div>}
            {noSearchResults && <div className={'absolute top-custom-50% left-custom-50%'}><NoSearchResults/></div>}
            {noMedia ?
                <div>{imagesPage ? 'You have no images' : videosPage ? 'You have no videos' : 'You have no audio'}</div> :
                <Grid
                    container
                    spacing={1}
                    hidden={noSearchResults}
                    className={`
                      relative
                      top-10
                      ${isPaginatorHidden && 'mt-5'} 
                      ${currentMediaFetch && 'flex justify-center items-center'}`}>
                    {currentMediaFetch && <ClipLoader
                        color={'blue'}
                        size={150}
                    />}

                    {imagesPage ? mediaToShow.map((media, index) => {
                            return <Grid item xs={gridNumb}><ImageBlock url={media.url}
                                                                        name={media.name}
                                                                        oldName={media.oldName}

                                                                        {...{
                                                                            index,
                                                                            handleInitialModalIndex,
                                                                            setHoveredMediaIndex,
                                                                            searchMode,
                                                                            hoveredMediaIndex,
                                                                            setItemOptionsHovered,
                                                                            confirm,
                                                                        }}/></Grid>
                        })
                        : videosPage ? mediaToShow.map((video, index) =>
                                <Grid item xs={gridNumb}>
                                    <div key={index} className={`
                            w-full 
                            relative 
                            flex
                             flex-col 
                             justify-center 
                             text-center   
                             `}>
                                        <Video url={video.url}
                                               name={video.name}
                                               oldName={video.oldName}
                                               {...{
                                                   searchMode,
                                                   index,
                                                   noOpenModal,
                                                   handleInitialModalIndex,
                                                   hoveredMediaIndex,
                                                   setHoveredMediaIndex,
                                                   setItemOptionsHovered,
                                                   currentTheme,
                                                   smallScreen,

                                               }}/>
                                    </div>
                                </Grid>
                            ) :
                            mediaToShow.map(((audio, index) => {
                                    return (
                                        <Grid item xs={12}>
                                            <div key={audio.index}>
                                                <Audio name={audio.name}
                                                       audioIndex={audio.index}
                                                       url={audio.url}
                                                       {...{
                                                           hoveredMediaIndex,
                                                           setHoveredMediaIndex,
                                                           index,
                                                           searchMode,
                                                           smallScreen,
                                                           currentTheme,
                                                       }}/>
                                            </div>
                                        </Grid>
                                    )

                                }

                            ))
                    }
                </Grid>}
            <div hidden={isPaginatorHidden} className={'mt-20'}><Paginator {...{paginatorProps}}/></div>

        </section>
    );
};

export default Media;
import React from 'react';
import {BsFillGridFill} from "react-icons/bs";
import {Button} from "@mui/material";
import {Fade} from "@mui/material";

const ItemsLayoutMenu = ({
                             audioPage,
                             layoutMenu,
                             layoutNumbs,
                             gridIndex,
                             handleLayoutMenu,
                             handleCollValue,
                             classes
                         }) => {

    return (
        <>
            {!audioPage && <div className={'absolute right-0 flex flex-col items-end top-14 w-40 h-40 z-1'}>
                <Button size={'large'}
                        onClick={handleLayoutMenu}
                        className={`hover:text-white ${layoutMenu ? 'text-white' : 'text-blue-500'}`}>
                    <BsFillGridFill size={30}/>
                </Button>
                <Fade in={layoutMenu} timeout={200}>
                    <div className={`
                        bg-white 
                        relative
                        right-5
                        bg-opacity-50
                        grid
                        grid-cols-3
                        gap-2
                        w-60
                        p-2
                        rounded-md                                           
                        justify-center`}>
                        {layoutNumbs.map((numb, index) =>
                            <Button
                                className={`
                                ${classes.gridItemBtn}
                        ${gridIndex === index ? "border-black bg-white" : 'bg-gray-300'}                                         
                        `} onClick={() => handleCollValue(numb.number, index)}>
                                <img
                                    className={'h-full'}
                                    key={index}
                                    src={numb.img}
                                    alt=""/>
                            </Button>
                        )}
                    </div>

                </Fade>
            </div>}
        </>

    );
};

export default ItemsLayoutMenu;
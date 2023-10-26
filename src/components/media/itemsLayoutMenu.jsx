import React from 'react';
import {BsFillGridFill} from "react-icons/bs";
import {Button} from "@mui/material";
import {Fade} from "@mui/material";

const ItemsLayoutMenu = ({
                             gridLayoutMenu,
                             gridLayoutItemsArr,
                             gridLayoutIndex,
                             handleLayoutMenu,
                             handleCollValue,
                             classes
                         }) => {

    return (
        <>
            <div className={'absolute right-0 flex flex-col items-end top-14 w-40 h-40 z-1'}>
                <Button size={'large'}
                        onClick={handleLayoutMenu}
                        className={`hover:text-white ${gridLayoutMenu ? 'text-white' : 'text-blue-500'}`}>
                    <BsFillGridFill size={30}/>
                </Button>
                <Fade in={gridLayoutMenu} timeout={200}>
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
                        {gridLayoutItemsArr.map((gridItem, index) =>
                            <Button
                                className={`
                                ${classes.gridItemBtn}
                        ${gridLayoutIndex === index ? "border-black bg-white" : 'bg-gray-300'}                                         
                        `} onClick={() => handleCollValue(gridItem.divider, index)}>
                                <img
                                    className={'h-full'}
                                    key={index}
                                    src={gridItem.img}
                                    alt={`layout-${index}`}/>
                            </Button>
                        )}
                    </div>

                </Fade>
            </div>
        </>

    );
};

export default ItemsLayoutMenu;
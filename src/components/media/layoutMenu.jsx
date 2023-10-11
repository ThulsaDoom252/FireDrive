import React, {useState} from 'react';
import {BsFillGridFill} from "react-icons/bs";
import {Button, Collapse} from "@mui/material";
import {Transition} from "@headlessui/react";

const LayoutMenu = ({audioPage, layoutMenu, layoutNumbs, gridIndex, handleLayoutMenu, handleCollValue}) => {

    return (
        <>
            {!audioPage && <div className={'absolute right-0 flex flex-col items-end top-14 w-40 h-40 z-20'}>
                <Button size={'large'}
                        onClick={handleLayoutMenu}
                        className={`hover:text-white ${layoutMenu ? 'text-white' : 'text-blue-500'}`}>
                    <BsFillGridFill size={30}/>
                </Button>
                <Transition
                    show={layoutMenu}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
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
                        cursor-pointer                                          
                        justify-center`}>
                        {layoutNumbs.map((numb, index) =>
                            <div className={`
                        w-12 
                        flex
                        m-3 
                        justify-center 
                        h-10 
                        border-2
                        rounded-md
                        hover:border-black  
                        transition-all
                        duration-100                      
                        ${gridIndex === index ? "border-black bg-white" : 'bg-gray-300'}
                                          
                        `}>
                                <img
                                    className={'h-full'}
                                    onClick={() => handleCollValue(numb.number, index)}
                                    key={index}
                                    src={numb.img}
                                    alt=""/>
                            </div>
                        )}
                    </div>
                </Transition>
            </div>}
        </>

    );
};

export default LayoutMenu;
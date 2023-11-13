import React, {useState} from 'react';
import {BsFillGridFill} from "react-icons/bs";
import {Box, Button} from "@mui/material";
import {Fade} from "@mui/material";
import FittedThemeBtn from '../common/theme/FittedThemeBtn';

const ItemsLayoutMenu = ({
                             gridLayoutMenu,
                             gridLayoutItemsArr,
                             gridLayoutIndex,
                             handleLayoutMenu,
                             handleCollValue,
                         }) => {


    const [itemIndex, setItemIndex] = useState(gridLayoutIndex)

    const handleItemClick = (divider, index) => {
        setItemIndex(index)
        handleCollValue(divider, index)
    }

    return (
        <>
            <Box className={'absolute right-0 flex flex-col items-end top-14 w-40 h-40 z-1'}>
                <FittedThemeBtn size={'large'}
                                enableHover
                                onClick={handleLayoutMenu}>
                    <BsFillGridFill size={30}/>
                </FittedThemeBtn>
                <Fade in={gridLayoutMenu} timeout={200}>
                    <Box
                        padding={2}
                        paddingTop={5}
                        className={`
                        bg-white 
                        relative
                        right-5
                        bg-opacity-50
                        grid
                        grid-cols-3
                        gap-2
                        w-60
                        rounded-md                                           
                        justify-center`}>
                        <p className={'text-center absolute text-lg font-sans top-2 w-full'}>Select items layout</p>
                        {gridLayoutItemsArr.map((gridItem, index) =>
                            <Button
                                sx={{
                                    width: '50px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '5px',
                                    height: '50px',
                                    borderRadius: '10px',
                                    background: index === gridLayoutIndex ? 'white' : 'none',
                                    "&:hover": {
                                        backgroundColor: 'white',
                                    },
                                }}
                                onClick={() => handleItemClick(gridItem.divider, index)}>
                                <img
                                    className={'h-full'}
                                    key={index}
                                    src={gridItem.img}
                                    alt={`layout-${index}`}/>
                            </Button>
                        )}
                    </Box>

                </Fade>
            </Box>
        </>

    );
};

export default ItemsLayoutMenu;
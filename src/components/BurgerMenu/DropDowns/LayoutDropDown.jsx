import React, {useState} from 'react';
import DropDownMenu from './DropDownMenu';
import {BsFillGridFill} from 'react-icons/bs';
import {Box, Button} from '@mui/material';

const LayoutDropDown = ({currentTheme, gridLayoutItemsArr, gridLayoutIndex, handleCollValue, isDisabled}) => {
    const [isLayoutBlockOpened, toggleLayoutBlock] = useState(false)
    return (
        <DropDownMenu btnLabel={'Layout'} menuType={isLayoutBlockOpened} isDisabled={isDisabled} toggleMenu={toggleLayoutBlock}
                      smallScreenIcon={<BsFillGridFill/>}>
            <Box
                padding={2}
                className={`                       
                        grid
                        grid-cols-3
                        gap-2
                        w-full
                        rounded-md                                           
                        justify-center`}>
                {gridLayoutItemsArr.map((gridItem, index) =>
                    <React.Fragment key={index}>
                        <Button
                            sx={{
                                width: '50px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '5px',
                                height: '50px',
                                borderRadius: '10px',
                                background: index === gridLayoutIndex ? `${currentTheme.activeColor}` : 'none',
                                "&:hover": {
                                    backgroundColor: `${currentTheme.activeColor}`,
                                },
                            }}
                            onClick={() => handleCollValue(gridItem.divider, index)}>
                            <img
                                className={'h-full'}
                                src={gridItem.img}
                                alt={`layout-${index}`}/>
                        </Button>
                    </React.Fragment>
                )}
            </Box>
        </DropDownMenu>
    );
};

export default LayoutDropDown;
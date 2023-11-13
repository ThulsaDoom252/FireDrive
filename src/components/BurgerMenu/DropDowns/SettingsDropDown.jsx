import React, {useState} from 'react';
import DropDownMenu from './DropDownMenu';
import {CiSettings} from 'react-icons/ci';
import {useSelector} from 'react-redux';
import ThemedSlider from '../../common/theme/ThemedSlider';
import {Box} from '@mui/material';
import {burgerMenuIconSize} from '../../../common/common';

const SettingsDropDown = ({
                              handleListMode,
                              isPaginatorEnabled,
                              itemsPerPage,
                              setItemsPerPage,
                              iconSize = burgerMenuIconSize,

                          }) => {
    const [isSettingsBlockOpened, setIsSettingsBlockOpened] = useState(false)
    const smallScreen = useSelector(state => state.app.smallScreen)

    const handleItemsPerPage = (e) => {
        setItemsPerPage(e.target.value)
    }

    return (
        <DropDownMenu
            menuType={isSettingsBlockOpened} toggleMenu={setIsSettingsBlockOpened}
            btnLabel={'Settings'} smallScreenIcon={<CiSettings size={iconSize}/>}>
            <div className={'bg-gray-600 bg-opacity-50 w-full flex flex-col p-2'}>
                <div className={`
                                        w-full 
                                        flex 
                                        justify-between 
                                        items-center 
                                        mb-4 
                                        mt-4
                                        ${smallScreen ? 'flex-col' : ''}
                                        `}>
                    <div className={'text-gray-400'}>Pagination</div>
                    <div
                        className={'cursor-pointer'}
                        onClick={handleListMode}>{isPaginatorEnabled ? 'On' : 'Off'}</div>
                </div>
                <div className={`
                                        w-full 
                                        flex 
                                        justify-between 
                                        items-center 
                                        mb-4 
                                        mt-4
                                        ${smallScreen ? 'flex-col' : ''}
                                        `}>
                    <Box paddingX={2} width='100%'>
                        <ThemedSlider label='Items per Page'
                                      onChange={handleItemsPerPage}
                                      value={itemsPerPage}
                                      valueToDisplay={itemsPerPage}
                                      min={5} max={100} step={1}
                                      direction='row'
                        />
                    </Box>
                </div>
            </div>
        </DropDownMenu>
    );
};

export default SettingsDropDown;
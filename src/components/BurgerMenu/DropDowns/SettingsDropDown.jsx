import React, {useState} from 'react';
import DropDownMenu from './DropDownMenu';
import {CiSettings} from 'react-icons/ci';
import {useSelector} from 'react-redux';

const SettingsDropDown = ({
                              handleListMode,
                              isPaginatorEnabled,
                              itemsPerPage,
                              setItemsPerPage,

                          }) => {
    const [isSettingsBlockOpened, setIsSettingsBlockOpened] = useState(false)
    const smallScreen = useSelector(state => state.app.smallScreen)
    return (
        <DropDownMenu
            menuType={isSettingsBlockOpened} toggleMenu={setIsSettingsBlockOpened}
            btnLabel={'Settings'} smallScreenIcon={<CiSettings/>}>
            <div className={'bg-gray-600 bg-opacity-50 w-full flex flex-col'}>
                <div className={`
                                        w-full 
                                        flex 
                                        justify-between 
                                        items-center 
                                        mb-4 
                                        mt-4
                                        ${smallScreen ? 'flex-col' : ''}
                                        `}>
                    <div className={'text-gray-400'}>List mode</div>
                    <div
                        className={'cursor-pointer'}
                        onClick={handleListMode}>{isPaginatorEnabled ? 'Pagination' : 'Lazy'}</div>
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
                    <div className={'text-gray-400 text-center'}>Items per page</div>
                    <div className={`flex 
                                            flex-col 
                                            justify-center 
                                            items-center`}>
                        <div className={'text-white'}>{itemsPerPage}</div>
                        <input type={'range'} value={itemsPerPage} min={5} max={100}
                               onChange={(e) =>
                                   setItemsPerPage(e.currentTarget.value)}/>
                    </div>
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
                    <div className={'text-gray-400'}>Animations</div>
                    <div>On</div>
                </div>
            </div>
        </DropDownMenu>
    );
};

export default SettingsDropDown;
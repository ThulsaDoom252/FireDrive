import React from 'react';
import {BiDownArrow, BiUpArrow} from "react-icons/bi";
import {useSelector} from "react-redux";
import ThemeBtn from "../../common/theme/ThemeBtn";
import {Fade} from '@mui/material';

const DropDownMenu = ({
                          switchToSmallScreenIcon = true,
                          smallScreenIcon,
                          isFullWidth = true,
                          animated = true,
                          duration = 300,
                          btnLabel = '',
                          children,
                          isDisabled,
                          menuType,
                          toggleMenu,
                      }) => {
    const smallScreen = useSelector(state => state.app.smallScreen)

    const handleOpenDropDown = e => {
        e.stopPropagation()
        toggleMenu(!menuType)
    }

    return (
        <div className={`
        flex
        flex-col
        justify-center
        items-center      
        ${isFullWidth && 'w-full'}`}>
            <ThemeBtn
                onClick={handleOpenDropDown}
                disabled={isDisabled} fullWidth>
                {smallScreen ? smallScreenIcon : btnLabel}
                {!menuType ?
                    <BiDownArrow className='
                absolute
                right-2
'/>
                    :
                    <BiUpArrow className='
                    absolute
                    right-2
                    '/>}</ThemeBtn>
            <div className={'w-full'} hidden={!menuType}>
                <Fade in={menuType} timeout={duration}>
                    <div hidden={!animated ? !menuType : false}
                         className={`
                             w-full 
                             flex 
                             items-center 
                             ${smallScreen && 'flex-col'}
                             `}>
                        {children}
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default DropDownMenu;